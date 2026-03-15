"use client";

import React, { useState, useEffect, useRef } from "react";
import "./maps.css";
import {
    Home as HomeIcon,
    School as SchoolIcon,
    GraduationCap,
    Laptop,
    Navigation,
    Map as MapIcon,
    Layers,
    Share,
    Search,
    ChevronLeft,
    Compass,
    Info,
    Plus,
    Columns,
} from "lucide-react";
import { TrafficLights } from "./Window";

// Declare L as any for Leaflet global
declare let L: any;

interface LocationData {
    name: string;
    description: string;
    lat: number;
    lng: number;
    icon: React.ReactNode;
    iconName: string;
    address: string;
    color: string;
}

const LOCATIONS: LocationData[] = [
    {
        name: "Home",
        description: "Nearby",
        lat: 19.2045,
        lng: 72.8522,
        icon: <HomeIcon size={18} />,
        iconName: "home",
        address: "Kandivali, Mumbai, India",
        color: "#007AFF"
    },
    {
        name: "School",
        description: "New Saibaba Nagar",
        lat: 19.2085,
        lng: 72.8444,
        icon: <SchoolIcon size={18} />,
        iconName: "school",
        address: "Near Andhra Bank, New Saibaba Nagar, Kandivali West, Maharashtra 400067",
        color: "#FF9500"
    },
    {
        name: "Diploma",
        description: "Vile Parle",
        lat: 19.1082,
        lng: 72.8354,
        icon: <GraduationCap size={18} />,
        iconName: "graduation-cap",
        address: "Irla, N. R, G Marg, opposite Cooper Hospital, Suvarna Nagar, Vile Parle, Mumbai 400056",
        color: "#8E8E93"
    },
    {
        name: "B.Tech",
        description: "JVPD Scheme",
        lat: 19.1068,
        lng: 72.8373,
        icon: <Laptop size={18} />,
        iconName: "laptop",
        address: "No. U, 15, Bhaktivedanta Swami Rd, JVPD Scheme, Vile Parle, Mumbai 400056",
        color: "#5E5CE6"
    }
];

export const MapsHeader: React.FC<any> = ({ id, onMinimize, onClose, toggleMaximize, handleMouseDown, activeLocName }) => {
    return (
        <div className="maps-window-header" onMouseDown={handleMouseDown}>
            <div className="maps-header-left">
                <TrafficLights
                    onClose={() => onClose(id)}
                    onMinimize={() => onMinimize(id)}
                    onMaximize={toggleMaximize}
                />
            </div>

            <div className="maps-header-right">
                <div className="maps-header-controls">
                    <button className="maps-nav-btn"><Navigation size={14} /></button>
                    <button className="maps-nav-btn"><MapIcon size={14} /></button>
                    <button className="maps-nav-btn" style={{ fontSize: '10px' }}>3D</button>
                    <button className="maps-nav-btn"><Search size={14} /></button>
                    <button className="maps-nav-btn"><Info size={14} /></button>
                    <button className="maps-nav-btn"><Plus size={14} /></button>
                    <button className="maps-nav-btn"><Share size={14} /></button>
                </div>

                <div className="maps-header-divider"></div>

                <button className="maps-sidebar-toggle"><Columns size={15} /></button>

                <div className="maps-current-location">
                    {activeLocName} — Mumbai, India
                </div>
            </div>
        </div>
    );
};

const Maps: React.FC<{ onLocationChange: (name: string) => void; isMaximized?: boolean }> = ({ onLocationChange, isMaximized }) => {
    const [activeLoc, setActiveLoc] = useState<LocationData>(LOCATIONS[0]);
    const mapRef = useRef<any>(null);
    const [leafletLoaded, setLeafletLoaded] = useState(false);
    const markersRef = useRef<any[]>([]);

    useEffect(() => {
        if (mapRef.current) {
            // Re-calculate size after animation/resize to prevent gray areas
            setTimeout(() => {
                mapRef.current.invalidateSize();
            }, 300);
        }
    }, [isMaximized]);

    useEffect(() => {
        if (!document.getElementById("leaflet-css")) {
            const link = document.createElement("link");
            link.id = "leaflet-css";
            link.rel = "stylesheet";
            link.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
            document.head.appendChild(link);
        }

        if (!document.getElementById("leaflet-js")) {
            const script = document.createElement("script");
            script.id = "leaflet-js";
            script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
            script.onload = () => setLeafletLoaded(true);
            document.head.appendChild(script);
        } else if (window.hasOwnProperty("L")) {
            setLeafletLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (!leafletLoaded || mapRef.current) return;

        const map = L.map("map-element", {
            zoomControl: false,
            attributionControl: false
        }).setView([activeLoc.lat, activeLoc.lng], 15);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 20,
            keepBuffer: 6, // Load a MUCH bigger chunk around viewport for beauty
            updateWhenIdle: false, // Load tiles during pan for smoothness
            updateWhenZooming: true
        }).addTo(map);

        L.control.zoom({ position: 'bottomright' }).addTo(map);

        mapRef.current = map;

        LOCATIONS.forEach(loc => {
            const appleIcon = L.divIcon({
                className: 'apple-marker',
                html: `<div class="apple-marker-inner" style="background: ${loc.color}">${getMarkerIconSVG(loc.iconName)}</div>`,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });

            const marker = L.marker([loc.lat, loc.lng], { icon: appleIcon })
                .addTo(map)
                .bindPopup(`<strong>${loc.name}</strong><br/>${loc.address}`);

            markersRef.current.push(marker);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [leafletLoaded]);

    const handleSelectLocation = (loc: LocationData) => {
        setActiveLoc(loc);
        onLocationChange(loc.name);
        if (mapRef.current) {
            mapRef.current.flyTo([loc.lat, loc.lng], 16, {
                duration: 1.5
            });
            // Force a tile refresh immediately after the flight ends
            setTimeout(() => {
                if (mapRef.current) mapRef.current.invalidateSize();
            }, 1600);
        }
    };

    function getMarkerIconSVG(name: string) {
        switch (name) {
            case 'home': return '<svg viewBox="0 0 24 24" width="16" height="16" stroke="white" stroke-width="2" fill="none"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>';
            case 'school': return '<svg viewBox="0 0 24 24" width="16" height="16" stroke="white" stroke-width="2" fill="none"><path d="m4 6 8-4 8 4"/><path d="m18 10 2 1v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8l2-1"/><path d="M14 22v-4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v4"/></svg>';
            case 'graduation-cap': return '<svg viewBox="0 0 24 24" width="16" height="16" stroke="white" stroke-width="2" fill="none"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>';
            case 'laptop': return '<svg viewBox="0 0 24 24" width="16" height="16" stroke="white" stroke-width="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="2" y1="20" x2="22" y2="20"/></svg>';
            default: return '';
        }
    }

    return (
        <div className="maps-container">
            <aside className="maps-sidebar">
                <div className="maps-search-container">
                    <div className="maps-search-wrapper">
                        <Search size={14} className="search-icon" />
                        <input type="text" className="maps-search-bar" placeholder="Search Maps" />
                    </div>
                </div>

                <div className="maps-sidebar-content">
                    <div className="maps-section-title">Favorites</div>
                    {LOCATIONS.map(loc => (
                        <div
                            key={loc.name}
                            className={`marker-item ${activeLoc.name === loc.name ? "active" : ""}`}
                            onClick={() => handleSelectLocation(loc)}
                        >
                            <div className="marker-icon-box" style={{ background: loc.color }}>
                                {loc.icon}
                            </div>
                            <div className="marker-info">
                                <span className="marker-name">{loc.name}</span>
                                <span className="marker-subtitle">{loc.description}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="maps-main">
                <div id="map-element"></div>

                <div className="map-controls-overlay">
                    <div className="map-control-btn"><Compass size={20} /></div>
                    <div className="map-control-btn">3D</div>
                </div>
            </main>
        </div>
    );
};

export default Maps;
