"use client";

import React, { useState, useRef } from "react";
import "./phone-gallery.css";

interface MediaItem {
    id: string;
    url: string;
    date: string;
    location: string;
    title: string;
    description: string;
    size: string;
}

const ALL_ITEMS: MediaItem[] = [
    { id: "i1", url: "/internships/Acmegrade Internship Completion.jpg", date: "Aug 2023", location: "Remote", title: "Acmegrade Internship Completion", description: "Successfully completed a 2-month intensive internship focusing on full-stack development.", size: "127 KB" },
    { id: "i2", url: "/internships/Hophead Completion Certificate_page-0001 (1).jpg", date: "June 2024", location: "Remote", title: "HopHead Completion Certificate", description: "Recognition for outstanding contribution to mobile app development.", size: "419 KB" },
    { id: "i2b", url: "/internships/Hophead Completion Letter_page-0001 (1).jpg", date: "June 2024", location: "Remote", title: "HopHead Completion Letter", description: "Official letter of completion from HopHead confirming successful delivery of mobile feature modules.", size: "418 KB" },
    { id: "i3", url: "/internships/Java CodSoft Completion_page-0001.jpg", date: "Jan 2024", location: "Remote", title: "Java CodSoft Completion", description: "Mastery of Java core concepts, multithreading, and complex data structures.", size: "350 KB" },
    { id: "i4", url: "/internships/Javascipt CodSoft Completion_page-0001.jpg", date: "Jan 2024", location: "Remote", title: "Javascript CodSoft Completion", description: "Advanced JavaScript techniques including ES6+ and async programming.", size: "351 KB" },
    { id: "i5", url: "/internships/Manas Shah Flutter_page-0001.jpg", date: "Mar 2024", location: "Remote", title: "Flutter Certificate", description: "In-depth training in Flutter widget architecture and state management.", size: "377 KB" },
    { id: "i6", url: "/internships/Screenshot 2026-03-13 185356.png", date: "Feb 2026", location: "Mumbai, India", title: "Cogniify Letter of Appointment", description: "Appointed as Lead Business Development Officer at Cogniify AI India. 2-month internship from Feb 23 to Apr 22, 2026.", size: "320 KB" },
    { id: "c1", url: "/courses/AWS Builders Python and AI Bootcamp_page-0001.jpg", date: "2023", location: "Online", title: "AWS Builders Python & AI", description: "Cloud-native AI implementation and Python automation.", size: "3.5 MB" },
    { id: "c2", url: "/courses/Acmegrade Training Completion.jpg", date: "2023", location: "Online", title: "Acmegrade Training", description: "Foundational training in modern web technologies.", size: "127 KB" },
    { id: "c3", url: "/courses/Devtown Python and AI Bootcamp_page-0001.jpg", date: "2023", location: "Online", title: "Devtown Python & AI", description: "Machine learning algorithms and data processing.", size: "650 KB" },
    { id: "c4", url: "/courses/UIUX _page-0001.jpg", date: "2023", location: "Online", title: "UI/UX Design Certificate", description: "User-centric design principles with Figma and Adobe XD.", size: "770 KB" },
    { id: "c5", url: "/courses/Google Developer Student Club Python and AI Bootcamp_page-0001.jpg", date: "2023", location: "Online", title: "Google DSC Python & AI Bootcamp", description: "7-day Python and AI bootcamp in partnership with Google Developer Student Clubs and DevTown.", size: "850 KB" },
    { id: "c6", url: "/courses/Nakshatra.jpg", date: "Mar 2024", location: "Mumbai", title: "Nakshatra – Cultural Certificate", description: "Certificate of Appreciation for participation in 'Nakshatra – Where Stars Unite'.", size: "400 KB" },
    { id: "c7", url: "/hackerrank/1719979617421-certificate (1) (1).png", date: "Jul 2024", location: "Online", title: "Youth Leadership for Climate Action", description: "Certificate by CEE, LiFE, UNICEF Maharashtra for completing the online course on Climate Action.", size: "600 KB" },
    { id: "h1", url: "/hackathons/Hack2skill-Certificate.png", date: "2024", location: "Mumbai", title: "Hack2skill Certificate", description: "Developed a sustainable tech solution for urban waste management.", size: "1.1 MB" },
    { id: "h2", url: "/hackathons/Polyhacks Hackathon.jpg", date: "2023", location: "Mumbai", title: "PolyHacks Participation", description: "Technical lead for a team of four at PolyHacks.", size: "212 KB" },
    { id: "h3", url: "/hackathons/Manas_Shah_Certificate_page-0001.jpg", date: "2024", location: "Mumbai", title: "Mumbai Tech Hackathon", description: "Awarded for exceptional innovation in the FinTech category.", size: "423 KB" },
    { id: "h4", url: "/hackathons/Manas Shah (3)_page-0001.jpg", date: "Feb 2025", location: "Mumbai", title: "VES Technothon 2025", description: "24-hour state-level hackathon for Diploma Engineers by VES Polytechnic.", size: "950 KB" },
    { id: "h5", url: "/hackathons/Screenshot 2026-03-13 190138.png", date: "Feb 2024", location: "Mumbai", title: "Code Carnival 5.0 – Ignite IT", description: "Certificate of Participation for Code Carnival 5.0 at SVKM's Shri Bhagubhai Mafatlal Polytechnic.", size: "1.2 MB" },
    { id: "r1", url: "/hackerrank/Hackerank Javascipt_page-0001.jpg", date: "2024", location: "HackerRank", title: "HackerRank JavaScript (Gold)", description: "Expert-level proficiency in JavaScript algorithms.", size: "2.8 MB" },
    { id: "r2", url: "/hackerrank/Hackerrank Java_page-0001.jpg", date: "2024", location: "HackerRank", title: "HackerRank Java (Gold)", description: "Advanced Java programming skills.", size: "2.8 MB" },
    { id: "r3", url: "/hackerrank/Hackerrank Python_page-0001.jpg", date: "2024", location: "HackerRank", title: "HackerRank Python (Gold)", description: "High-tier Python certification.", size: "2.8 MB" },
    { id: "r4", url: "/hackerrank/Hackerrank SQL_page-0001.jpg", date: "2024", location: "HackerRank", title: "HackerRank SQL (Gold)", description: "Advanced database querying on large datasets.", size: "2.8 MB" },
];

const ALBUMS = [
    { id: "internships", name: "Internships", items: ALL_ITEMS.filter(i => i.id.startsWith("i")) },
    { id: "courses", name: "Courses", items: ALL_ITEMS.filter(i => i.id.startsWith("c")) },
    { id: "hackathons", name: "Hackathons", items: ALL_ITEMS.filter(i => i.id.startsWith("h")) },
    { id: "hackerrank", name: "HackerRank", items: ALL_ITEMS.filter(i => i.id.startsWith("r")) },
];

// Group by year
const BY_YEAR: Record<string, MediaItem[]> = {};
ALL_ITEMS.forEach(item => {
    const year = item.date.replace(/[^0-9]/g, "").slice(-4) || "2024";
    if (!BY_YEAR[year]) BY_YEAR[year] = [];
    BY_YEAR[year].push(item);
});

// ── iOS-style SF Symbol SVGs ──────────────────────────────────────

const IconPhotos = ({ active }: { active: boolean }) => (
    /* Colorful pinwheel – the real iOS Photos icon shape */
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#FF3B30" : "#C7C7CC"} transform="rotate(0   13 13)" />
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#FF9500" : "#C7C7CC"} transform="rotate(45  13 13)" />
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#FFCC00" : "#C7C7CC"} transform="rotate(90  13 13)" />
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#34C759" : "#C7C7CC"} transform="rotate(135 13 13)" />
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#007AFF" : "#C7C7CC"} transform="rotate(180 13 13)" />
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#5856D6" : "#C7C7CC"} transform="rotate(225 13 13)" />
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#FF2D55" : "#C7C7CC"} transform="rotate(270 13 13)" />
        <ellipse cx="13" cy="6" rx="3.5" ry="5.5" fill={active ? "#BF5AF2" : "#C7C7CC"} transform="rotate(315 13 13)" />
        <circle cx="13" cy="13" r="4" fill="white" />
    </svg>
);

const IconForYou = ({ active }: { active: boolean }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
            fill={active ? "#FF2D55" : "#C7C7CC"} />
    </svg>
);

const IconAlbums = ({ active }: { active: boolean }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="8" height="8" rx="2" fill={active ? "#007AFF" : "#C7C7CC"} />
        <rect x="13" y="3" width="8" height="8" rx="2" fill={active ? "#007AFF" : "#C7C7CC"} />
        <rect x="3" y="13" width="8" height="8" rx="2" fill={active ? "#007AFF" : "#C7C7CC"} />
        <rect x="13" y="13" width="8" height="8" rx="2" fill={active ? "#007AFF" : "#C7C7CC"} />
    </svg>
);

const IconSearch = ({ active }: { active: boolean }) => (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke={active ? "#007AFF" : "#C7C7CC"} strokeWidth="2.2" strokeLinecap="round">
        <circle cx="11" cy="11" r="7" />
        <line x1="16.5" y1="16.5" x2="22" y2="22" />
    </svg>
);


// ── Component ─────────────────────────────────────────────────────
const PhoneGallery: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [viewMode, setViewMode] = useState<"years" | "months" | "days" | "all">("months");
    const [activeTab, setActiveTab] = useState<"photos" | "foryou" | "albums" | "search">("photos");
    const [viewerIndex, setViewerIndex] = useState<number | null>(null); // index into ALL_ITEMS
    const [showInfo, setShowInfo] = useState(false);
    const [infoDragY, setInfoDragY] = useState(0);
    const [isDraggingInfo, setIsDraggingInfo] = useState(false);
    const [slideDir, setSlideDir] = useState<"left" | "right" | null>(null);

    const viewing = viewerIndex !== null ? ALL_ITEMS[viewerIndex] : null;

    const openViewer = (item: MediaItem) => {
        const idx = ALL_ITEMS.findIndex(i => i.id === item.id);
        setViewerIndex(idx);
        setShowInfo(false);
    };
    const closeViewer = () => { setViewerIndex(null); setShowInfo(false); };

    // Navigate prev / next with slide animation
    const goNext = () => {
        if (viewerIndex === null || viewerIndex >= ALL_ITEMS.length - 1) return;
        setSlideDir("left");
        setTimeout(() => { setViewerIndex(v => (v ?? 0) + 1); setSlideDir(null); }, 180);
    };
    const goPrev = () => {
        if (viewerIndex === null || viewerIndex <= 0) return;
        setSlideDir("right");
        setTimeout(() => { setViewerIndex(v => (v ?? 0) - 1); setSlideDir(null); }, 180);
    };

    // Swipe-up-to-close (High-fidelity implementation)
    const [dragY, setDragY] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const touchStartY = useRef(0);
    const lastTouchY = useRef(0);
    const lastTouchTime = useRef(0);
    const velocity = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        touchStartY.current = touch.clientY;
        lastTouchY.current = touch.clientY;
        lastTouchTime.current = Date.now();
        setIsActive(true);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        const touch = e.touches[0];
        const currentY = touch.clientY;
        const currentTime = Date.now();
        const dy = currentY - touchStartY.current;

        const dt = currentTime - lastTouchTime.current;
        if (dt > 0) {
            velocity.current = (currentY - lastTouchY.current) / dt;
        }

        // Only allow upward swipe from bottom area or if already dragging
        if (dy < 0 && (touchStartY.current > window.innerHeight - 100 || dragY < 0)) {
            setDragY(dy);
            if (e.cancelable) e.preventDefault();
        }

        lastTouchY.current = currentY;
        lastTouchTime.current = currentTime;
    };
    const handleTouchEnd = () => {
        setIsActive(false);
        const threshold = -window.innerHeight * 0.2;
        const fastSwipe = velocity.current < -0.5;

        if (dragY < threshold || fastSwipe) {
            setIsClosing(true);
            setTimeout(() => onBack(), 300);
        } else {
            setDragY(0);
        }
    };

    const shrinkScale = Math.max(0.85, 1 + (dragY / window.innerHeight) * 0.4);
    const shrinkRadius = Math.min(40, (dragY / -200) * 40);

    const now = new Date();
    const timeStr = now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

    // ── Render views ──────────────────────────────────────────────

    const renderMonths = () => (
        <div className="pg-scroll">
            {Object.entries(BY_YEAR).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, items]) => (
                <section key={year} className="pg-month-section">
                    <div className="pg-month-heading">
                        <span className="pg-month-title">{year}</span>
                        <span className="pg-month-chevron">›</span>
                    </div>
                    <div className="pg-memory-card" onClick={() => openViewer(items[0])}>
                        <img src={items[0].url} alt={items[0].title} className="pg-memory-img" />
                        <div className="pg-memory-gradient">
                            <p className="pg-memory-name">{items[0].title}</p>
                            <p className="pg-memory-date">{items[0].date}</p>
                        </div>
                        <button className="pg-ellipsis-btn">···</button>
                    </div>
                </section>
            ))}
        </div>
    );

    const renderDays = () => (
        <div className="pg-scroll">
            {Object.entries(BY_YEAR).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, items]) => (
                <section key={year} className="pg-day-section">
                    <div className="pg-day-header">
                        <div>
                            <p className="pg-day-title">{year}</p>
                            <p className="pg-day-sub">{items[0].location}</p>
                        </div>
                        <button className="pg-ellipsis-btn pg-ellipsis-dark">···</button>
                    </div>
                    <div className="pg-day-hero" onClick={() => openViewer(items[0])}>
                        <img src={items[0].url} alt="" />
                        <span className="pg-count-pill">+{items.length - 1}</span>
                    </div>
                    {items.length > 1 && (
                        <div className="pg-day-thumbs">
                            {items.slice(1, 4).map(item => (
                                <div key={item.id} className="pg-day-thumb" onClick={() => openViewer(item)}>
                                    <img src={item.url} alt="" />
                                </div>
                            ))}
                        </div>
                    )}
                </section>
            ))}
        </div>
    );

    const renderAll = () => (
        <div className="pg-scroll">
            <div className="pg-grid-all">
                {ALL_ITEMS.map(item => (
                    <div key={item.id} className="pg-grid-thumb" onClick={() => openViewer(item)}>
                        <img src={item.url} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderYears = () => (
        <div className="pg-scroll">
            <div className="pg-grid-years">
                {Object.entries(BY_YEAR).sort((a, b) => Number(b[0]) - Number(a[0])).map(([year, items]) => (
                    <div key={year} className="pg-year-card" onClick={() => setViewMode("months")}>
                        <img src={items[0].url} alt={year} />
                        <span className="pg-year-label">{year}</span>
                        <span className="pg-year-count">{items.length} photos</span>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderAlbums = () => (
        <div className="pg-scroll pg-albums-scroll">
            <p className="pg-albums-section-label">My Albums</p>
            <div className="pg-albums-grid">
                {ALBUMS.map(album => (
                    <div key={album.id} className="pg-album-card" onClick={() => album.items[0] && openViewer(album.items[0])}>
                        <div className="pg-album-thumb">
                            {album.items[0] && <img src={album.items[0].url} alt={album.name} />}
                        </div>
                        <p className="pg-album-name">{album.name}</p>
                        <p className="pg-album-count">{album.items.length}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    const renderSearch = () => (
        <div className="pg-scroll pg-search-view">
            <div className="pg-search-bar-wrap">
                <div className="pg-search-bar">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="2.2" strokeLinecap="round"><circle cx="11" cy="11" r="7" /><line x1="16.5" y1="16.5" x2="22" y2="22" /></svg>
                    <span className="pg-search-placeholder">Search</span>
                </div>
            </div>
            <p className="pg-search-hint">Recent</p>
            <div className="pg-grid-all">
                {ALL_ITEMS.slice(0, 9).map(item => (
                    <div key={item.id} className="pg-grid-thumb" onClick={() => openViewer(item)}>
                        <img src={item.url} alt="" />
                    </div>
                ))}
            </div>
        </div>
    );

    const renderContent = () => {
        if (activeTab === "albums") return renderAlbums();
        if (activeTab === "search") return renderSearch();
        if (activeTab === "foryou") return renderMonths(); // reuse months for For You
        switch (viewMode) {
            case "years": return renderYears();
            case "months": return renderMonths();
            case "days": return renderDays();
            case "all": return renderAll();
        }
    };

    const pageTitle = activeTab === "albums" ? "Albums" : activeTab === "search" ? "Search" : activeTab === "foryou" ? "For You" : "Library";

    // ── Viewer swipe ──────────────────────────────────────────
    const viewerTouchStartX = useRef<number>(0);
    const viewerTouchStartY = useRef<number>(0);
    const viewerSwipeAxis = useRef<"h" | "v" | null>(null);

    const onViewerTouchStart = (e: React.TouchEvent) => {
        viewerTouchStartX.current = e.touches[0].clientX;
        viewerTouchStartY.current = e.touches[0].clientY;
        viewerSwipeAxis.current = null;
    };
    const onViewerTouchEnd = (e: React.TouchEvent) => {
        const dx = e.changedTouches[0].clientX - viewerTouchStartX.current;
        const dy = e.changedTouches[0].clientY - viewerTouchStartY.current;
        if (viewerSwipeAxis.current === null) {
            viewerSwipeAxis.current = Math.abs(dx) > Math.abs(dy) ? "h" : "v";
        }
        if (viewerSwipeAxis.current === "h") {
            if (dx < -50) goNext();
            else if (dx > 50) goPrev();
        }
    };

    // ── Info Sheet Swipe ──
    const infoTouchStartTime = useRef<number>(0);
    const handleInfoTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        setIsDraggingInfo(true);
        infoTouchStartTime.current = Date.now();
    };
    const handleInfoTouchMove = (e: React.TouchEvent) => {
        const delta = e.touches[0].clientY - touchStartY.current;
        if (delta > 0) setInfoDragY(delta);
    };
    const handleInfoTouchEnd = () => {
        setIsDraggingInfo(false);
        const duration = Date.now() - infoTouchStartTime.current;
        if (infoDragY > 100 || (infoDragY > 30 && duration < 250)) {
            setShowInfo(false);
        }
        setInfoDragY(0);
    };

    return (
        <div
            className={`pg-overlay ${isClosing ? "pg-closing" : ""}`}
            style={{
                transform: isClosing
                    ? `translateY(-20%) scale(0.3) opacity(0)`
                    : `translateY(${dragY}px) scale(${shrinkScale})`,
                borderRadius: isClosing ? '50px' : `${shrinkRadius}px`,
                transition: isClosing
                    ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    : isActive ? 'none' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Status bar */}
            <div className="pg-status">
                <span className="pg-status-time">{timeStr}</span>
                <div className="pg-status-right">
                    <svg width="17" height="12" viewBox="0 0 18 12" fill="#1C1C1E"><rect x="0" y="7" width="3" height="5" rx="0.8" /><rect x="5" y="5" width="3" height="7" rx="0.8" /><rect x="10" y="2" width="3" height="10" rx="0.8" /><rect x="15" y="0" width="3" height="12" rx="0.8" /></svg>
                    <svg width="16" height="12" viewBox="0 0 24 18" fill="#1C1C1E"><path d="M12 4.5C8.5 4.5 5.35 5.8 3 8L1 6C3.9 3.25 7.75 1.5 12 1.5s8.1 1.75 11 4.5L21 8c-2.35-2.2-5.5-3.5-9-3.5z" /><path d="M12 9c-2.5 0-4.75.9-6.5 2.4L4 10c2.2-1.9 5-3 8-3s5.8 1.1 8 3l-1.5 1.4C16.75 9.9 14.5 9 12 9z" /><path d="M12 13.5c-1.4 0-2.65.5-3.6 1.3L12 18l3.6-3.2c-.95-.8-2.2-1.3-3.6-1.3z" /></svg>
                    <svg width="26" height="12" viewBox="0 0 26 13" fill="none"><rect x="0.5" y="0.5" width="21" height="12" rx="3.5" stroke="#1C1C1E" strokeWidth="1" /><rect x="2" y="2" width="17" height="9" rx="2" fill="#1C1C1E" /><path d="M23.5 4.5v4a2 2 0 000-4z" fill="#1C1C1E" opacity="0.4" /></svg>
                </div>
            </div>

            {/* Large iOS-style title */}
            <div className="pg-topbar">
                <h1 className="pg-title">{pageTitle}</h1>
                {activeTab === "photos" && <button className="pg-select-btn">Select</button>}
            </div>

            {/* Content area */}
            <div className="pg-content">
                {renderContent()}
            </div>

            {/* Segmented Control — only for photos tab — above the tab bar */}
            {activeTab === "photos" && (
                <div className="pg-segment-bar">
                    <div className="pg-segment-pill">
                        {(["years", "months", "days", "all"] as const).map(m => (
                            <button
                                key={m}
                                className={`pg-seg-btn ${viewMode === m ? "pg-seg-active" : ""}`}
                                onClick={() => setViewMode(m)}
                            >
                                {m === "all" ? "All Photos" : m.charAt(0).toUpperCase() + m.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Bottom Tab Bar */}
            <div className="pg-tabbar">
                {([
                    { id: "photos", label: "Photos", Icon: IconPhotos },
                    { id: "foryou", label: "For You", Icon: IconForYou },
                    { id: "albums", label: "Albums", Icon: IconAlbums },
                    { id: "search", label: "Search", Icon: IconSearch },
                ] as const).map(({ id, label, Icon }) => (
                    <button
                        key={id}
                        className={`pg-tab ${activeTab === id ? "pg-tab-active" : ""}`}
                        onClick={() => setActiveTab(id)}
                    >
                        <Icon active={activeTab === id} />
                        <span>{label}</span>
                    </button>
                ))}
            </div>

            {/* Full-screen photo viewer */}
            {viewing && viewerIndex !== null && (
                <div
                    className="pg-viewer"
                    onTouchStart={onViewerTouchStart}
                    onTouchEnd={onViewerTouchEnd}
                >
                    {/* Top bar */}
                    <div className="pg-viewer-topbar">
                        <button className="pg-viewer-back" onClick={closeViewer}>
                            <svg width="10" height="17" viewBox="0 0 10 17" fill="none" stroke="#007AFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 1 1 8.5 9 16" /></svg>
                        </button>
                        <div className="pg-viewer-center">
                            <p className="pg-viewer-date">{viewing.date}</p>
                        </div>
                        <button className="pg-viewer-edit">Edit</button>
                    </div>

                    {/* Image with slide animation */}
                    <div className="pg-viewer-image-wrap">
                        <img
                            key={viewerIndex}
                            src={viewing.url}
                            alt={viewing.title}
                            className={`pg-viewer-img ${slideDir === "left" ? "pg-slide-out-left" :
                                slideDir === "right" ? "pg-slide-out-right" : "pg-slide-in"
                                }`}
                        />
                        {/* Prev / Next tap zones */}
                        {viewerIndex > 0 && (
                            <button className="pg-viewer-prev-zone" onClick={goPrev} aria-label="Previous" />
                        )}
                        {viewerIndex < ALL_ITEMS.length - 1 && (
                            <button className="pg-viewer-next-zone" onClick={goNext} aria-label="Next" />
                        )}
                    </div>

                    {/* Filmstrip */}
                    <div className="pg-viewer-strip">
                        {ALL_ITEMS.map((item, idx) => (
                            <div
                                key={item.id}
                                className={`pg-strip-thumb ${idx === viewerIndex ? "pg-strip-active" : ""}`}
                                onClick={() => { setViewerIndex(idx); setShowInfo(false); }}
                            >
                                <img src={item.url} alt="" />
                            </div>
                        ))}
                    </div>

                    {/* Action bar */}
                    <div className="pg-viewer-actions">
                        {/* Share */}
                        <button className="pg-viewer-action">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8M16 6l-4-4-4 4M12 2v13" /></svg>
                        </button>
                        {/* Favourite */}
                        <button className="pg-viewer-action">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#007AFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></svg>
                        </button>
                        {/* Info ℹ */}
                        <button className="pg-viewer-action" onClick={() => setShowInfo(v => !v)}>
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"
                                stroke={showInfo ? "#FF9500" : "#007AFF"}
                                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="8.5" strokeWidth="2.5" />
                                <line x1="12" y1="11" x2="12" y2="16" />
                            </svg>
                        </button>
                        {/* Delete */}
                        <button className="pg-viewer-action">
                            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FF3B30" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6" /><path d="M19 6l-1 14H6L5 6" /><path d="M10 11v6M14 11v6" /></svg>
                        </button>
                    </div>

                    {/* ── Info Sheet (slides up from bottom) ── */}
                    {showInfo && (
                        <div
                            className="pg-info-backdrop"
                            onClick={() => setShowInfo(false)}
                            style={{ opacity: Math.max(0, 1 - infoDragY / 300) }}
                        />
                    )}
                    <div
                        className={`pg-info-sheet ${showInfo ? "pg-info-sheet-open" : ""}`}
                        style={{
                            transform: showInfo
                                ? `translateY(${infoDragY}px)`
                                : `translateY(100%)`,
                            transition: isDraggingInfo ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
                        }}
                        onTouchStart={handleInfoTouchStart}
                        onTouchMove={handleInfoTouchMove}
                        onTouchEnd={handleInfoTouchEnd}
                    >
                        <div className="pg-info-handle" />
                        <div className="pg-info-thumb-row">
                            <img src={viewing.url} alt="" className="pg-info-thumb" />
                            <div className="pg-info-thumb-meta">
                                <p className="pg-info-thumb-title">{viewing.title}</p>
                                <p className="pg-info-thumb-sub">{viewing.date}</p>
                            </div>
                        </div>
                        <div className="pg-info-divider" />
                        <div className="pg-info-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>
                            <div>
                                <p className="pg-info-label">Date</p>
                                <p className="pg-info-value">{viewing.date}</p>
                            </div>
                        </div>
                        <div className="pg-info-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z" /><circle cx="12" cy="10" r="3" /></svg>
                            <div>
                                <p className="pg-info-label">Location</p>
                                <p className="pg-info-value">{viewing.location}</p>
                            </div>
                        </div>
                        <div className="pg-info-row">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8E8E93" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" /><polyline points="14 2 14 8 20 8" /></svg>
                            <div>
                                <p className="pg-info-label">File size</p>
                                <p className="pg-info-value">{viewing.size}</p>
                            </div>
                        </div>
                        <div className="pg-info-divider" />
                        <p className="pg-info-desc">{viewing.description}</p>
                    </div>
                </div>
            )}

            {/* iOS home indicator */}
            <div className="pg-home-indicator-wrap">
                <div className="pg-home-indicator" />
            </div>
        </div>
    );
};

export default PhoneGallery;
