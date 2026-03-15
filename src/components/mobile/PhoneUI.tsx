import React, { useState, useEffect } from "react";
import "./phone-ui.css";
import PhoneCalculator from "./PhoneCalculator";
import PhoneGallery from "./PhoneGallery";
import PhoneFiles from "./PhoneFiles";
import PhoneNotes from "./PhoneNotes";
import PhoneGemini from "./PhoneGemini";

const GRID_APPS = [
    { name: "Photos", icon: "/icons/gallery.webp" },
    { name: "Calculator", icon: "/icons/calculator.webp" },
    { name: "Gemini", icon: "/icons/gemini-mobile.png" },
    { name: "Files", icon: "/icons/files-mobile-replica.png" },
    { name: "Notes", icon: "/icons/notes-mobile.png" },
    { name: "About Me", icon: "/icons/about-me-mobile.png" },
    { name: "Contact", icon: "/icons/contact-mobile.png" },
    { name: "GitHub", icon: "/icons/github.webp", href: "https://github.com/manasshah1810" },
    { name: "LinkedIn", icon: "/icons/linkedin.jpg", href: "https://linkedin.com/in/manasshah1007" },
    { name: "Resume", icon: "/icons/resume-mobile.png", href: "/Manas_Resume.pdf" },
];

const DOCK_APPS = [
    { name: "GitHub", icon: "/icons/github.webp", href: "https://github.com/manasshah1810" },
    { name: "LinkedIn", icon: "/icons/linkedin.jpg", href: "https://linkedin.com/in/manasshah1007" },
    { name: "Resume", icon: "/icons/resume-mobile.png", href: "/Manas_Resume.pdf" },
    { name: "Contact", icon: "/icons/contact-mobile.png" },
];

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
        <span className="phone-hero-role">
            {text}
            <span className="phone-hero-cursor" />
        </span>
    );
};

const PhoneUI = ({ onToggleProfessional }: { onToggleProfessional?: () => void }) => {
    const [time, setTime] = useState("");
    const [activeApp, setActiveApp] = useState<string | null>(null);
    const [initialNoteId, setInitialNoteId] = useState<string | null>(null);

    useEffect(() => {
        const tick = () => {
            const now = new Date();
            // Format time exactly like 09:41
            setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, []);

    const openLink = (url?: string) => {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
    };

    const handleAppClick = (app: any) => {
        if (app.href) {
            openLink(app.href);
        } else if (app.name === "About Me") {
            setInitialNoteId("1"); // ID for About me.md
            setActiveApp("Notes");
        } else if (app.name === "Contact") {
            setInitialNoteId("7"); // ID for contact.json
            setActiveApp("Notes");
        } else {
            setInitialNoteId(null);
            setActiveApp(app.name);
        }
    };

    return (
        <div className="phone-os-container">
            {/* ── Background Hero ────────────────────────── */}
            <div className="phone-hero-bg">
                <div className="phone-hero-image-container">
                    <img src="/icons/hero.png" alt="Hero" className="phone-hero-3d-image" />
                </div>
                <div className="phone-hero-text">
                    <h1 className="phone-hero-name">MANAS SHAH</h1>
                    <div className="phone-hero-role-wrapper">
                        I am a <Typewriter />
                    </div>
                </div>
            </div>


            <div className="phone-status-bar">
                <div className="phone-time">{time || "09:41"}</div>
                <button className="phone-professional-toggle" onClick={onToggleProfessional}>Switch to Professional View</button>
                <div className="phone-status-icons">
                    {/* Cellular */}
                    <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
                        <rect x="0" y="8" width="3" height="4" rx="1" />
                        <rect x="5" y="6" width="3" height="6" rx="1" />
                        <rect x="10" y="3" width="3" height="9" rx="1" />
                        <rect x="15" y="0" width="3" height="12" rx="1" />
                    </svg>
                    {/* WiFi */}
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="currentColor">
                        <path d="M8 10.5a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM4.93 8.32a4.36 4.36 0 016.14 0l-.88.88a3.1 3.1 0 00-4.38 0l-.88-.88zM2.5 5.89a7.62 7.62 0 0111 0l-.88.88a6.36 6.36 0 00-9.24 0l-.88-.88zM.06 3.47a10.88 10.88 0 0115.88 0l-.88.88A9.62 9.62 0 00.94 4.35l-.88-.88z" transform="translate(0 -2)" />
                    </svg>
                    {/* Battery */}
                    <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
                        <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" strokeWidth="1" />
                        <rect x="2" y="2" width="20" height="9" rx="2" fill="currentColor" />
                        <text x="12" y="9.5" fill="black" fontSize="7.5" fontWeight="bold" textAnchor="middle">100</text>
                        <path d="M25 4.5v4a1.5 1.5 0 000-4z" fill="currentColor" />
                    </svg>
                </div>
            </div>

            {/* ── App Screens ────────────────────────────── */}
            {activeApp === "Calculator" && (
                <PhoneCalculator onBack={() => setActiveApp(null)} />
            )}
            {activeApp === "Photos" && (
                <PhoneGallery onBack={() => setActiveApp(null)} />
            )}
            {activeApp === "Files" && (
                <PhoneFiles onBack={() => setActiveApp(null)} />
            )}
            {activeApp === "Notes" && (
                <PhoneNotes onBack={() => setActiveApp(null)} initialId={initialNoteId} />
            )}
            {activeApp === "Gemini" && (
                <PhoneGemini onBack={() => setActiveApp(null)} />
            )}

            <div className="phone-content-scroll">
                <div className="phone-grid">
                    {GRID_APPS.map(app => (
                        <div
                            className="phone-app"
                            key={app.name}
                            onClick={() => handleAppClick(app)}
                        >
                            <div className="phone-app-icon-container">
                                <img src={app.icon} alt={app.name} className="phone-app-icon" />
                            </div>
                            <span className="phone-app-name">{app.name}</span>
                        </div>
                    ))}
                </div>
            </div>


            <div className="phone-search-container">
                <button className="phone-search-button">
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="currentColor">
                        <path d="M10 6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zm-1 3.21l3.14 3.15a.5.5 0 00.71-.71L9.71 9.01A5.49 5.49 0 106.5 12a5.46 5.46 0 002.5-.61zm-2.5.79a4 4 0 110-8 4 4 0 010 8z" />
                    </svg>
                    Search
                </button>
            </div>


            <div className="phone-dock-container">
                <div className="phone-dock">
                    {DOCK_APPS.map(app => (
                        <div className="phone-dock-app" key={app.name} onClick={() => handleAppClick(app)}>
                            <div className="phone-app-icon-container">
                                <img src={app.icon} alt={app.name} className="phone-app-icon" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default PhoneUI;
