"use client";

import React, { useState, useEffect, useRef } from "react";
import "./macdesktop.css";
import Window from "./Window";
import Calculator from "./Calculator";
import Maps, { MapsHeader } from "./Maps";
import Calendar, { CalendarHeader } from "./Calendar";
import Gallery, { GalleryHeader } from "./Gallery";
import Finder, { FinderHeader } from "./Finder";
import Antigravity from "./Antigravity";
import VSCode from "./VSCode";

// ─── Dock App Data ───────────────────────────────────────────────
interface DockApp {
    name: string;
    icon: React.ReactNode;
    href?: string;
    color: string;
}

const DOCK_APPS: DockApp[] = [
    {
        name: "Finder",
        icon: <img src="/icons/finder.webp" alt="Finder" />,
        color: "#4A90D9",
    },
    {
        name: "Photos",
        icon: <img src="/icons/gallery.webp" alt="Photos" />,
        color: "#FF565F",
    },
    {
        name: "Calculator",
        icon: <img src="/icons/calculator.webp" alt="Calculator" />,
        color: "#FF9500",
    },
    {
        name: "Calendar",
        icon: <img src="/icons/Calender.webp" alt="Calendar" />,
        color: "#FF3B30",
    },
    {
        name: "Maps",
        icon: <img src="/icons/Maps.jpg" alt="Maps" />,
        color: "#007AFF",
    },
    {
        name: "VS Code",
        icon: <img src="/icons/vscode.webp" alt="VS Code" />,
        color: "#007ACC",
    },
    {
        name: "Antigravity",
        icon: <img src="/icons/Antigravity.jpg" alt="Antigravity" />,
        href: "#about",
        color: "#5E5CE6",
    },
    {
        name: "LinkedIn",
        icon: <img src="/icons/linkedin.jpg" alt="LinkedIn" />,
        href: "https://linkedin.com/in/manasshah1007",
        color: "#0A66C2",
    },
    {
        name: "GitHub",
        icon: <img src="/icons/github.webp" alt="GitHub" />,
        href: "https://github.com/manasshah1810",
        color: "#24292e",
    },
];

// ─── Typewriter Effect ──────────────────────────────────────────
const ROLES = [
    "AI-Driven Software Engineer",
    "Creative Technologist",
    "Design-Focused Developer",
    "Systems Thinking Engineer",
    "Frontend + AI Engineer",
    "Interactive Experience Builder",
    "Intelligent Systems Developer",
];


const Typewriter: React.FC = () => {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(50);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % ROLES.length;
            const fullText = ROLES[i];

            setText(
                isDeleting
                    ? fullText.substring(0, text.length - 1)
                    : fullText.substring(0, text.length + 1)
            );

            setTypingSpeed(isDeleting ? 30 : 70);

            if (!isDeleting && text === fullText) {
                setTimeout(() => setIsDeleting(true), 1200);
            } else if (isDeleting && text === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [text, isDeleting, loopNum, typingSpeed]);

    return (
        <span className="hero-role">
            {text}
            <span className="hero-cursor" />
        </span>
    );
};

// ─── Main Component ──────────────────────────────────────────────
const MacDesktop: React.FC = () => {
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");
    const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
    const [tooltipApp, setTooltipApp] = useState<string | null>(null);
    const dockRef = useRef<HTMLDivElement>(null);

    // Window Management
    const [openWindows, setOpenWindows] = useState<string[]>([]);
    const [minimizedWindows, setMinimizedWindows] = useState<string[]>([]);
    const [activeWindow, setActiveWindow] = useState<string | null>(null);
    const [activeMapLoc, setActiveMapLoc] = useState("Home");
    const [calendarDate, setCalendarDate] = useState(new Date());
    const [calendarViewMode, setCalendarViewMode] = useState("month");
    const [galleryInfoOpen, setGalleryInfoOpen] = useState(false);
    const [galleryViewMode, setGalleryViewMode] = useState("days");

    // Menu States
    const [activeMenu, setActiveMenu] = useState<string | null>(null);
    const [contextMenu, setContextMenu] = useState<{ x: number, y: number, visible: boolean }>({ x: 0, y: 0, visible: false });
    const [showAboutModal, setShowAboutModal] = useState(false);

    // Handle Right Click
    const handleContextMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        setContextMenu({ x: e.clientX, y: e.clientY, visible: true });
        setActiveMenu(null);
    };

    // Global Click Handler for menus
    useEffect(() => {
        const handleClick = () => {
            setContextMenu(prev => ({ ...prev, visible: false }));
            setActiveMenu(null);
        };
        window.addEventListener("click", handleClick);
        return () => window.removeEventListener("click", handleClick);
    }, []);

    const handleCalPrev = () => {
        if (calendarViewMode === 'month') {
            setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() - 1, 1));
        } else if (calendarViewMode === 'year') {
            setCalendarDate(new Date(calendarDate.getFullYear() - 1, calendarDate.getMonth(), 1));
        }
    };
    const handleCalNext = () => {
        if (calendarViewMode === 'month') {
            setCalendarDate(new Date(calendarDate.getFullYear(), calendarDate.getMonth() + 1, 1));
        } else if (calendarViewMode === 'year') {
            setCalendarDate(new Date(calendarDate.getFullYear() + 1, calendarDate.getMonth(), 1));
        }
    };
    const handleCalToday = () => setCalendarDate(new Date());

    const toggleApp = (name: string) => {
        const appId = name.toLowerCase().replace(/\s+/g, "");
        const appMap: Record<string, boolean> = {
            finder: true,
            calculator: true,
            maps: true,
            calendar: true,
            photos: true,
            antigravity: true,
            vscode: true,
        };

        if (appMap[appId]) {
            if (!openWindows.includes(appId)) {
                setOpenWindows([...openWindows, appId]);
                setActiveWindow(appId);
            } else if (minimizedWindows.includes(appId)) {
                setMinimizedWindows(minimizedWindows.filter((id) => id !== appId));
                setActiveWindow(appId);
            } else {
                setActiveWindow(appId);
            }
        }
    };

    const closeWindow = (id: string) => {
        setOpenWindows(openWindows.filter((win) => win !== id));
        setMinimizedWindows(minimizedWindows.filter((win) => win !== id));
        if (activeWindow === id) {
            setActiveWindow(null);
        }
    };

    const minimizeWindow = (id: string) => {
        setMinimizedWindows([...minimizedWindows, id]);
        setActiveWindow(null);
    };

    // Live clock
    useEffect(() => {
        const tick = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "2-digit",
                    hour12: true,
                })
            );
            setDate(
                now.toLocaleDateString("en-US", {
                    weekday: "short",
                    month: "short",
                    day: "numeric",
                })
            );
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    // Dock magnification effect
    const handleDockMouseMove = (e: React.MouseEvent) => {
        if (!dockRef.current) return;
        const icons = dockRef.current.querySelectorAll<HTMLElement>(".dock-icon-wrapper");
        const mouseX = e.clientX;

        icons.forEach((icon) => {
            const rect = icon.getBoundingClientRect();
            const iconCenterX = rect.left + rect.width / 2;
            const distance = Math.abs(mouseX - iconCenterX);

            // Proper magnification curve
            const maxDistance = 150; // Range of effect
            const maxScale = 1.8; // Max size of hovered icon

            let scale = 1;
            if (distance < maxDistance) {
                // Cosine falloff for smooth wave effect
                scale = 1 + (maxScale - 1) * Math.cos((distance / maxDistance) * (Math.PI / 2));
            }

            // Apply scale and lift
            const translateY = -(scale - 1) * 35; // How much it lifts
            icon.style.transform = `scale(${scale}) translateY(${translateY}px)`;

            // Adjust margins of neighbors to make space (emulating layout shift)
            const marginValue = (scale - 1) * 15;
            icon.style.marginRight = `${marginValue}px`;
            icon.style.marginLeft = `${marginValue}px`;
        });
    };

    const handleDockMouseLeave = () => {
        if (!dockRef.current) return;
        const icons = dockRef.current.querySelectorAll<HTMLElement>(".dock-icon-wrapper");
        icons.forEach((icon) => {
            icon.style.transform = "scale(1) translateY(0)";
            icon.style.marginLeft = "0";
            icon.style.marginRight = "0";
        });
        setHoveredIdx(null);
        setTooltipApp(null);
    };

    return (
        <div
            className="mac-desktop"
            id="mac-desktop"
            onContextMenu={handleContextMenu}
        >
            {/* ── Wallpaper + Hero ─────────────────────────────────────── */}
            <div className="mac-wallpaper">
                <div className="hero-container">
                    <div className="hero-text-left">
                        <h1 className="hero-name">MANAS SHAH</h1>
                        <div className="hero-role-wrapper">
                            I am a <Typewriter />
                        </div>
                        <div className="hero-buttons">
                            <button className="hero-btn primary" onClick={() => window.open('/Manas_Resume.pdf', '_blank')}>
                                Open Resume
                            </button>
                            <button className="hero-btn secondary" onClick={() => toggleApp('vscode')}>
                                About Me
                            </button>
                        </div>
                    </div>
                    <div className="hero-image-right">
                        <img src="/icons/hero.png" alt="Hero Illustration" className="hero-3d-image" />
                    </div>
                </div>
            </div>

            {/* ── Windows ────────────────────────────────────────── */}
            {openWindows.includes("finder") && !minimizedWindows.includes("finder") && (
                <Window
                    id="finder"
                    title="Finder"
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    active={activeWindow === "finder"}
                    onFocus={setActiveWindow}
                    initialPos={{ x: 100, y: 100 }}
                    initialSize={{ width: 1000, height: 650 }}
                    minSize={{ width: 800, height: 500 }}
                >
                    <Finder />
                </Window>
            )}

            {openWindows.includes("calculator") && !minimizedWindows.includes("calculator") && (
                <Window
                    id="calculator"
                    title="Calculator"
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    active={activeWindow === "calculator"}
                    onFocus={setActiveWindow}
                    initialPos={{ x: 300, y: 150 }}
                    initialSize={{ width: 320, height: 480 }}
                    minSize={{ width: 200, height: 300 }}
                >
                    <Calculator />
                </Window>
            )}

            {openWindows.includes("maps") && !minimizedWindows.includes("maps") && (
                <Window
                    id="maps"
                    title="Maps"
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    active={activeWindow === "maps"}
                    onFocus={setActiveWindow}
                    initialPos={{ x: 150, y: 80 }}
                    initialSize={{ width: 900, height: 600 }}
                    minSize={{ width: 600, height: 400 }}
                    customHeader={(props) => (
                        <MapsHeader {...props} activeLocName={activeMapLoc} />
                    )}
                >
                    <Maps onLocationChange={setActiveMapLoc} />
                </Window>
            )}

            {openWindows.includes("calendar") && !minimizedWindows.includes("calendar") && (
                <Window
                    id="calendar"
                    title="Calendar"
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    active={activeWindow === "calendar"}
                    onFocus={setActiveWindow}
                    initialPos={{ x: 200, y: 150 }}
                    initialSize={{ width: 1000, height: 700 }}
                    minSize={{ width: 800, height: 500 }}
                    customHeader={(props) => (
                        <CalendarHeader
                            {...props}
                            onPrev={handleCalPrev}
                            onNext={handleCalNext}
                            onToday={handleCalToday}
                            viewMode={calendarViewMode}
                            setViewMode={setCalendarViewMode}
                        />
                    )}
                >
                    <Calendar
                        viewDate={calendarDate}
                        setViewDate={setCalendarDate}
                        viewMode={calendarViewMode}
                    />
                </Window>
            )}

            {openWindows.includes("photos") && !minimizedWindows.includes("photos") && (
                <Window
                    id="photos"
                    title="Photos"
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    active={activeWindow === "photos"}
                    onFocus={setActiveWindow}
                    initialPos={{ x: 50, y: 50 }}
                    initialSize={{ width: 1100, height: 750 }}
                    minSize={{ width: 900, height: 600 }}
                    customHeader={(props) => (
                        <GalleryHeader
                            {...props}
                            isInfoOpen={galleryInfoOpen}
                            onToggleInfo={() => setGalleryInfoOpen(!galleryInfoOpen)}
                            viewMode={galleryViewMode}
                            setViewMode={setGalleryViewMode}
                        />
                    )}
                >
                    <Gallery
                        isInfoOpen={galleryInfoOpen}
                        onToggleInfo={() => setGalleryInfoOpen(true)}
                        viewMode={galleryViewMode}
                        setViewMode={setGalleryViewMode}
                    />
                </Window>
            )}

            {openWindows.includes("antigravity") && !minimizedWindows.includes("antigravity") && (
                <Window
                    id="antigravity"
                    title="Antigravity"
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    active={activeWindow === "antigravity"}
                    onFocus={setActiveWindow}
                    initialPos={{ x: 80, y: 40 }}
                    initialSize={{ width: 1200, height: 800 }}
                    minSize={{ width: 900, height: 600 }}
                >
                    <Antigravity />
                </Window>
            )}

            {openWindows.includes("vscode") && !minimizedWindows.includes("vscode") && (
                <Window
                    id="vscode"
                    title="Visual Studio Code"
                    onClose={closeWindow}
                    onMinimize={minimizeWindow}
                    active={activeWindow === "vscode"}
                    onFocus={setActiveWindow}
                    initialPos={{ x: 120, y: 60 }}
                    initialSize={{ width: 1100, height: 750 }}
                    minSize={{ width: 900, height: 600 }}
                >
                    <VSCode />
                </Window>
            )}

            {/* ── Menu Bar ────────────────────────────────────────── */}
            <header className="mac-menubar">
                <div className="menubar-left">
                    <button
                        className={`menubar-item apple-logo ${activeMenu === 'apple' ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'apple' ? null : 'apple'); }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47c-1.34.03-1.77-.79-3.29-.79c-1.53 0-2 .77-3.27.82c-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51c1.28-.02 2.5.87 3.29.87c.78 0 2.26-1.07 3.81-.91c.65.03 2.47.26 3.64 1.98c-.09.06-2.17 1.28-2.15 3.81c.03 3.02 2.65 4.03 2.68 4.04c-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5c.13 1.17-.34 2.35-1.04 3.19c-.69.85-1.83 1.51-2.95 1.42c-.15-1.15.41-2.35 1.05-3.11" />
                        </svg>

                        {activeMenu === 'apple' && (
                            <div className="menubar-dropdown">
                                <div className="dropdown-item" onClick={() => setShowAboutModal(true)}>About This Portfolio</div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-item" onClick={() => toggleApp('settings')}>System Settings...</div>
                                <div className="dropdown-item">App Store...</div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-item">Recent Items</div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-item">Force Quit...</div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-item">Sleep</div>
                                <div className="dropdown-item">Restart...</div>
                                <div className="dropdown-item">Shut Down...</div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-item">Lock Screen</div>
                                <div className="dropdown-item">Log Out Manas Shah...</div>
                            </div>
                        )}
                    </button>

                    <button
                        className={`menubar-item finder-text ${activeMenu === 'finder' ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'finder' ? null : 'finder'); }}
                    >
                        <strong>Finder</strong>
                        {activeMenu === 'finder' && (
                            <div className="menubar-dropdown">
                                <div className="dropdown-item">About Finder</div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-item">Settings...</div>
                                <div className="dropdown-item">Empty Trash...</div>
                            </div>
                        )}
                    </button>

                    <button
                        className={`menubar-item ${activeMenu === 'file' ? 'active' : ''}`}
                        onClick={(e) => { e.stopPropagation(); setActiveMenu(activeMenu === 'file' ? null : 'file'); }}
                    >
                        File
                        {activeMenu === 'file' && (
                            <div className="menubar-dropdown">
                                <div className="dropdown-item" onClick={() => toggleApp('finder')}>New Finder Window</div>
                                <div className="dropdown-item" onClick={() => toggleApp('vscode')}>New VS Code Window</div>
                                <div className="dropdown-divider" />
                                <div className="dropdown-item greyed">Open...</div>
                                <div className="dropdown-item greyed">Close Window</div>
                            </div>
                        )}
                    </button>
                    <button className="menubar-item">Edit</button>
                    <button className="menubar-item">View</button>
                    <button className="menubar-item">Go</button>
                    <button className="menubar-item">Window</button>
                    <button className="menubar-item">Help</button>
                </div>
                <div className="menubar-right">
                    <button className="menubar-item" style={{ cursor: 'pointer', fontWeight: 500 }}>Switch to Professional View</button>
                    {/* Battery */}
                    <span className="menubar-icon" title="98% Charged">
                        <svg width="22" height="12" viewBox="0 0 25 12" fill="none">
                            <rect x="0.5" y="0.5" width="21" height="11" rx="2.5" stroke="currentColor" strokeWidth="1" />
                            <rect x="2" y="2" width="16" height="8" rx="1" fill="currentColor" opacity="0.8" />
                            <path d="M23 4v4a2 2 0 000-4z" fill="currentColor" opacity="0.5" />
                        </svg>
                    </span>
                    {/* WiFi */}
                    <span className="menubar-icon" title="Connected: Manas_Fiber_5G">
                        <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                            <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM4.93 8.32a4.36 4.36 0 016.14 0l-.88.88a3.1 3.1 0 00-4.38 0l-.88-.88zM2.5 5.89a7.62 7.62 0 0111 0l-.88.88a6.36 6.36 0 00-9.24 0l-.88-.88zM.06 3.47a10.88 10.88 0 0115.88 0l-.88.88A9.62 9.62 0 00.94 4.35l-.88-.88z" transform="translate(0 -2)" />
                        </svg>
                    </span>
                    {/* Spotlight */}
                    <span className="menubar-icon pointer" onClick={() => alert("Spotlight Search: Launching... (Command + Space)")}>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="currentColor">
                            <path d="M10 6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-1 3.21l3.14 3.15a.5.5 0 00.71-.71L9.71 9.01A5.49 5.49 0 106.5 12a5.46 5.46 0 002.5-.61zm-2.5.79a4 4 0 110-8 4 4 0 010 8z" />
                        </svg>
                    </span>
                    <span className="menubar-icon">
                        <svg width="14" height="12" viewBox="0 0 16 14" fill="currentColor">
                            <rect x="0" y="1" width="16" height="2.5" rx="1.25" />
                            <rect x="0" y="5.75" width="16" height="2.5" rx="1.25" />
                            <rect x="0" y="10.5" width="16" height="2.5" rx="1.25" />
                            <circle cx="5" cy="2.25" r="2" fill="currentColor" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                            <circle cx="11" cy="7" r="2" fill="currentColor" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                            <circle cx="7" cy="11.75" r="2" fill="currentColor" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                        </svg>
                    </span>
                    <span className="menubar-date">{date}</span>
                    <span className="menubar-time">{time}</span>
                </div>
            </header>

            {/* ── Dock ────────────────────────────────────────────── */}
            <nav
                className="mac-dock"
                ref={dockRef}
                onMouseMove={handleDockMouseMove}
                onMouseLeave={handleDockMouseLeave}
                aria-label="macOS Dock"
            >
                <div className="dock-container">
                    {DOCK_APPS.map((app, idx) => {
                        const isSeparator =
                            idx === 5 || idx === 7;

                        return (
                            <React.Fragment key={app.name}>
                                {isSeparator && <div className="dock-separator" />}
                                <div
                                    className="dock-icon-wrapper"
                                    onMouseEnter={() => {
                                        setHoveredIdx(idx);
                                        setTooltipApp(app.name);
                                    }}
                                    onMouseLeave={() => {
                                        setHoveredIdx(null);
                                        setTooltipApp(null);
                                    }}
                                    onClick={() => toggleApp(app.name)}
                                >
                                    {tooltipApp === app.name && (
                                        <span className="dock-tooltip">{app.name}</span>
                                    )}
                                    {app.href ? (
                                        <a
                                            href={app.href}
                                            className="dock-icon"
                                            target={app.href.startsWith("http") ? "_blank" : undefined}
                                            rel={app.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                            aria-label={app.name}
                                        >
                                            {app.icon}
                                        </a>
                                    ) : (
                                        <button className="dock-icon" aria-label={app.name}>
                                            {app.icon}
                                        </button>
                                    )}
                                    {openWindows.includes(app.name.toLowerCase().replace(/\s+/g, "")) && (
                                        <div className="active-indicator" />
                                    )}
                                </div>
                            </React.Fragment>
                        );
                    })}
                </div>
            </nav>

            {/* ── Context Menu ───────────────────────────────────── */}
            {contextMenu.visible && (
                <div
                    className="desktop-context-menu"
                    style={{ top: contextMenu.y, left: contextMenu.x }}
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="menu-item" onClick={() => window.open("https://github.com/manasshah1810", "_blank")}>
                        View GitHub Profile
                    </div>
                    <div className="menu-item" onClick={() => window.open("https://linkedin.com/in/manasshah1007", "_blank")}>
                        Connect on LinkedIn
                    </div>
                    <div className="menu-divider" />
                    <div className="menu-item" onClick={() => toggleApp("vscode")}>
                        Open 'About Me' in VS Code
                    </div>
                    <div className="menu-item" onClick={() => toggleApp("antigravity")}>
                        Launch Antigravity Portfolio
                    </div>
                    <div className="menu-divider" />
                    <div className="menu-item" onClick={() => window.open("mailto:manasshah1210@gmail.com")}>
                        Email Manas
                    </div>
                    <div className="menu-item" onClick={() => toggleApp("photos")}>
                        Change Desktop Background
                    </div>
                    <div className="menu-divider" />
                    <div className="menu-item greyed">
                        Get Info
                    </div>
                </div>
            )}

            {/* ── About Modal ────────────────────────────────────── */}
            {showAboutModal && (
                <div className="about-modal-overlay" onClick={() => setShowAboutModal(false)}>
                    <div className="about-modal" onClick={e => e.stopPropagation()}>
                        <div className="about-modal-close" onClick={() => setShowAboutModal(false)} />
                        <div className="about-content">
                            <img src="/icons/hero.png" alt="Manas Shah" className="about-avatar" />
                            <h2 style={{ marginTop: '15px' }}>Manas Shah</h2>
                            <p style={{ opacity: 0.6, fontSize: '13px' }}>Intelligence Systems Architect</p>
                            <div className="about-stats">
                                <p><strong>University:</strong> AI/ML Student</p>
                                <p><strong>Location:</strong> India</p>
                            </div>
                            <p style={{ fontSize: '12px', marginTop: '10px' }}>Built with React, Next.js, and a passion for Intelligent Design.</p>
                            <div className="about-copyright">™ and © 1984-2024 Manas Shah. All Rights Reserved.</div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MacDesktop;
