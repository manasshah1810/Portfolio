"use client";

import React, { useState, useEffect, useRef } from "react";
import "./phone-files.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    ChevronLeft,
    Search,
    MoreHorizontal,
    LayoutGrid,
    Clock,
    Folder as FolderIcon,
    ChevronDown,
    List,
    FileText,
    Image as ImageIcon
} from "lucide-react";

interface ProjectFile {
    name: string;
    type: "file" | "image";
    url: string;
}

interface ProjectFolder {
    name: string;
    files: ProjectFile[];
}

const PROJECTS_DATA: Record<string, ProjectFolder[]> = {
    "AI & Machine Learning Systems": [
        {
            name: "AI Job Risk",
            files: [
                { name: "README.md", type: "file", url: "/projects/AI Job Risk/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/AI Job Risk/AI-Job-risk.png" }
            ]
        },
        {
            name: "IPL Win Probability Engine",
            files: [
                { name: "README.md", type: "file", url: "/projects/IPL Win Probability Engine/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/IPL Win Probability Engine/IPL Win Probablity.png" }
            ]
        },
        {
            name: "Spam-Ham Classification",
            files: [
                { name: "README.md", type: "file", url: "/projects/Spam-Ham Classification/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Spam-Ham Classification/architecture.png" }
            ]
        },
        {
            name: "YouTube-to-Live-Translation",
            files: [
                { name: "README.md", type: "file", url: "/projects/YouTube-to-Live-Translation/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/YouTube-to-Live-Translation/Youtube to Live Translation.png" }
            ]
        }
    ],
    /*
    "Intelligent Platforms": [
        {
            name: "FinOps Command Centre",
// ...
// ...
    ],
    */
    "Hackathon Prototypes": [
        {
            name: "FinCraft",
            files: [
                { name: "README.md", type: "file", url: "/projects/FinCraft/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/FinCraft/FinCraft.png" }
            ]
        },
        {
            name: "Classmate Plus",
            files: [
                { name: "README.md", type: "file", url: "/projects/Classmate Plus/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Classmate Plus/Classmate-Plus.png" }
            ]
        },
        {
            name: "Lumen: Mental Wellness App",
            files: [
                { name: "README.md", type: "file", url: "/projects/Lumen Mental Wellness App/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Lumen Mental Wellness App/Lumen.png" }
            ]
        }
    ],
    "Creative Builds": [
        {
            name: "Clash of Clans Portfolio",
            files: [
                { name: "README.md", type: "file", url: "/projects/Clash of Clans Portfolio/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Clash of Clans Portfolio/COC Portfolio.png" }
            ]
        },
        {
            name: "To-Do List (Flutter)",
            files: [
                { name: "README.md", type: "file", url: "/projects/To-Do List (Flutter)/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/To-Do List (Flutter)/To-Do List.png" }
            ]
        },
        {
            name: "Music Player (Python)",
            files: [
                { name: "README.md", type: "file", url: "/projects/Music Player (Python)/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Music Player (Python)/Music Player.png" }
            ]
        }
    ]
};

const PhoneFiles: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [viewingCategory, setViewingCategory] = useState<string | null>(null);
    const [activeFolder, setActiveFolder] = useState<ProjectFolder | null>(null);
    const [viewingFile, setViewingFile] = useState<ProjectFile | null>(null);
    const [mdContent, setMdContent] = useState<string>("");
    const [activeTab, setActiveTab] = useState<"recents" | "browse">("browse");

    // Gesture control
    const [dragY, setDragY] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [isActive, setIsActive] = useState(false); // For transition control
    const touchStartY = useRef(0);
    const lastTouchY = useRef(0);
    const lastTouchTime = useRef(0);
    const velocity = useRef(0);

    useEffect(() => {
        if (viewingFile && viewingFile.name.endsWith(".md")) {
            setMdContent("Loading...");
            fetch(viewingFile.url)
                .then(res => res.text())
                .then(text => setMdContent(text))
                .catch(() => setMdContent("Error loading documentation."));
        }
    }, [viewingFile]);

    const handleBack = () => {
        if (viewingFile) setViewingFile(null);
        else if (activeFolder) setActiveFolder(null);
        else if (viewingCategory) setViewingCategory(null);
    };

    // Global Swipe up to home (True iOS mechanism)
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        lastTouchY.current = e.touches[0].clientY;
        lastTouchTime.current = Date.now();
        setIsActive(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const currentTime = Date.now();
        const dy = currentY - touchStartY.current;

        // Calculate velocity
        const dt = currentTime - lastTouchTime.current;
        if (dt > 0) {
            velocity.current = (currentY - lastTouchY.current) / dt;
        }

        // Only allow upward swipe from bottom area or if already dragging
        if (dy < 0 && (touchStartY.current > window.innerHeight - 100 || dragY < 0)) {
            setDragY(dy);
        }

        lastTouchY.current = currentY;
        lastTouchTime.current = currentTime;
    };

    const onTouchEnd = () => {
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

    // Calculate dynamic styles for the "shrink" effect
    const shrinkScale = Math.max(0.85, 1 + (dragY / window.innerHeight) * 0.4);
    const shrinkRadius = Math.min(40, (dragY / -200) * 40);

    // Folder SVG Helper (mimicking the blue iOS folder)
    const FolderBlue = () => (
        <svg className="pf-folder-svg" viewBox="0 0 80 64" fill="none">
            <path d="M0 8C0 3.58172 3.58172 0 8 0H28.4444C30.4578 0 32.3986 0.758913 33.8821 2.1265L39.4506 7.26047C40.934 8.62804 42.8748 9.38696 44.8882 9.38696H72C76.4183 9.38696 80 12.8052 80 17.2236V56C80 60.4183 76.4183 64 72 64H8C3.58172 64 0 60.4183 0 56V8Z" fill="#007AFF" fillOpacity="0.8" />
            <path d="M0 17.2236C0 12.8052 3.58172 9.38696 8 9.38696H72C76.4183 9.38696 80 12.8052 80 17.2236V56C80 60.4183 76.4183 64 72 64H8C3.58172 64 0 60.4183 0 56V17.2236Z" fill="#7CBDF1" />
        </svg>
    );

    return (
        <div
            className={`pf-overlay ${isClosing ? 'pf-closing' : ''}`}
            style={{
                transform: isClosing
                    ? `translateY(-20%) scale(0.3) opacity(0)`
                    : `translateY(${dragY}px) scale(${shrinkScale})`,
                borderRadius: isClosing ? '50px' : `${shrinkRadius}px`,
                transition: isClosing
                    ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    : isActive ? 'none' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
        >
            {/* Header */}
            <header className="pf-header">
                <div className="pf-header-left">
                    <button className="pf-back-btn" onClick={handleBack}>
                        {(viewingCategory || activeFolder || viewingFile) ? <ChevronLeft size={24} /> : null}
                        <span>{(viewingCategory || activeFolder || viewingFile) ? "Back" : "Locations"}</span>
                    </button>
                </div>
                <div className="pf-header-center">
                    <span className="pf-title">
                        {viewingFile ? "Preview" : activeFolder ? activeFolder.name : viewingCategory ? viewingCategory : "iCloud Drive"}
                    </span>
                </div>
                <div className="pf-header-right">
                    <button className="pf-select-btn">Select</button>
                </div>
            </header>

            {/* Search */}
            <div className="pf-search-row">
                <div className="pf-search-box">
                    <Search size={18} />
                    <input type="text" className="pf-search-input" placeholder="Search" />
                </div>
            </div>

            {/* Subheader */}
            <div className="pf-subheader">
                <button className="pf-sort-btn">
                    Sorted by Name <ChevronDown size={14} />
                </button>
                <div className="pf-view-opts">
                    <LayoutGrid size={20} />
                    <List size={22} />
                </div>
            </div>

            {/* Main Content */}
            <main className="pf-content">
                {!viewingCategory ? (
                    <div className="pf-grid">
                        {Object.keys(PROJECTS_DATA).map(cat => (
                            <div key={cat} className="pf-item" onClick={() => setViewingCategory(cat)}>
                                <div className="pf-folder-icon-wrap">
                                    <FolderBlue />
                                </div>
                                <span className="pf-item-name">{cat}</span>
                                <span className="pf-item-sub">{PROJECTS_DATA[cat].length} folders</span>
                            </div>
                        ))}
                    </div>
                ) : !activeFolder ? (
                    <div className="pf-grid">
                        {PROJECTS_DATA[viewingCategory].map(folder => (
                            <div key={folder.name} className="pf-item" onClick={() => setActiveFolder(folder)}>
                                <div className="pf-folder-icon-wrap">
                                    <FolderBlue />
                                </div>
                                <span className="pf-item-name">{folder.name}</span>
                                <span className="pf-item-sub">{folder.files.length} items</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="pf-grid">
                        {activeFolder.files.map(file => (
                            <div key={file.name} className="pf-item" onClick={() => setViewingFile(file)}>
                                <div className="pf-folder-icon-wrap">
                                    {file.type === "file" ? <FileText size={48} color="#007AFF" /> : <ImageIcon size={48} color="#FF9500" />}
                                </div>
                                <span className="pf-item-name">{file.name}</span>
                                <span className="pf-item-sub">{file.type === "file" ? "Markdown" : "Image"}</span>
                            </div>
                        ))}
                    </div>
                )}
            </main>

            {/* File Preview */}
            {viewingFile && (
                <div className={`pf-preview-overlay ${viewingFile.type === 'image' ? 'pf-preview-dark' : ''}`}>
                    <header className="pf-preview-header">
                        <button className="pf-preview-done" onClick={() => setViewingFile(null)}>Done</button>
                        <span className="pf-preview-title">{viewingFile.name}</span>
                        <div style={{ width: 48 }} />
                    </header>
                    <div className="pf-preview-body">
                        {viewingFile.type === "file" ? (
                            <div className="pf-md-view">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {mdContent}
                                </ReactMarkdown>
                            </div>
                        ) : (
                            <div className="pf-img-view">
                                <img src={viewingFile.url} alt={viewingFile.name} />
                            </div>
                        )}
                    </div>
                    {/* Preview Bottom Bar */}
                    <div className="pf-preview-footer">
                        <button className="pf-footer-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7M16 6l-4-4-4 4M12 2v13" /></svg></button>
                        <button className="pf-footer-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M12 19l7-7 3 3-7 7-3-3zM18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" /></svg></button>
                        <button className="pf-footer-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg></button>
                        <button className="pf-footer-btn"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg></button>
                    </div>
                </div>
            )}

            {/* Tab Bar */}
            <nav className="pf-tabbar">
                <button className={`pf-tab ${activeTab === 'recents' ? 'pf-tab-active' : ''}`} onClick={() => setActiveTab('recents')}>
                    <Clock size={24} />
                    <span>Recents</span>
                </button>
                <button className={`pf-tab ${activeTab === 'browse' ? 'pf-tab-active' : ''}`} onClick={() => setActiveTab('browse')}>
                    <FolderIcon size={24} fill={activeTab === 'browse' ? "currentColor" : "none"} />
                    <span>Browse</span>
                </button>
            </nav>

            {/* Home Indicator */}
            <div className="pf-home-indicator-wrap">
                <div className="pf-home-indicator" />
            </div>
        </div>
    );
};

export default PhoneFiles;
