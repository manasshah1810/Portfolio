"use client";

import React, { useState, useEffect } from "react";
import "./finder.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    Clock,
    Monitor,
    FileText,
    ChevronLeft,
    ChevronRight,
    Search,
    LayoutGrid,
    MoreHorizontal,
    Folder,
    Image as ImageIcon,
    Share2,
    Star
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
            files: [
                { name: "README.md", type: "file", url: "/projects/FinOps/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/FinOps/FinOps.png" }
            ]
        },
        {
            name: "Claim Orchestration",
            files: [
                { name: "README.md", type: "file", url: "/projects/Claim Orchestration/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Claim Orchestration/Claim Orchestration.png" }
            ]
        },
        {
            name: "Health Insights",
            files: [
                { name: "README.md", type: "file", url: "/projects/Health Insights/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Health Insights/Health Insights.png" }
            ]
        },
        {
            name: "Micro-Vibration Line Defender",
            files: [
                { name: "README.md", type: "file", url: "/projects/Micro-Vibration Line Defender/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Micro-Vibration Line Defender/Line Defender.png" }
            ]
        },
        {
            name: "Digital Twin",
            files: [
                { name: "README.md", type: "file", url: "/projects/Digital Twin/README.md" },
                { name: "architecture.png", type: "image", url: "/projects/Digital Twin/Digital-Twin.png" }
            ]
        }
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
    ],
    "Recents": [],
    "Featured": []
};

// Flatten some data for Recents/Featured
PROJECTS_DATA["Recents"] = [PROJECTS_DATA["AI & Machine Learning Systems"][0]];
PROJECTS_DATA["Featured"] = [PROJECTS_DATA["AI & Machine Learning Systems"][0], PROJECTS_DATA["Hackathon Prototypes"][0]];

export const FinderHeader: React.FC<{
    currentTitle: string;
    canGoBack: boolean;
    onBack: () => void;
    onForward: () => void;
    canGoForward: boolean;
}> = ({ currentTitle, canGoBack, onBack, onForward, canGoForward }) => {
    return (
        <div className="finder-header">
            <div className="finder-header-nav">
                <button className={`nav-btn ${!canGoBack ? 'disabled' : ''}`} onClick={onBack}>
                    <ChevronLeft size={20} />
                </button>
                <button className={`nav-btn ${!canGoForward ? 'disabled' : ''}`} onClick={onForward}>
                    <ChevronRight size={20} />
                </button>
                <span className="current-folder-title">{currentTitle}</span>
            </div>
            <div className="finder-header-toolbar">
                <div className="toolbar-group">
                    <button className="toolbar-btn"><LayoutGrid size={16} /></button>
                    <button className="toolbar-btn"><MoreHorizontal size={16} /></button>
                </div>
                <div className="toolbar-group">
                    <button className="toolbar-btn"><Share2 size={16} /></button>
                    <button className="toolbar-btn"><Star size={16} /></button>
                </div>
                <div className="finder-search">
                    <Search size={14} className="search-icon" />
                    <input type="text" placeholder="Search" />
                </div>
            </div>
        </div>
    );
};

const Finder: React.FC = () => {
    const [selectedSidebar, setSelectedSidebar] = useState("AI & Machine Learning Systems");
    const [currentFolder, setCurrentFolder] = useState<ProjectFolder | null>(null);
    const [viewingFile, setViewingFile] = useState<ProjectFile | null>(null);
    const [mdContent, setMdContent] = useState<string>("");

    useEffect(() => {
        if (viewingFile && viewingFile.name.endsWith(".md")) {
            setMdContent("Loading project documentation...");
            fetch(viewingFile.url)
                .then(res => {
                    if (!res.ok) throw new Error("File not found");
                    return res.text();
                })
                .then(text => setMdContent(text))
                .catch(err => setMdContent(`### Error\nCould not load the project README. Please ensure the file exists at: \`${viewingFile.url}\``));
        } else {
            setMdContent("");
        }
    }, [viewingFile]);

    const handleSidebarClick = (category: string) => {
        setSelectedSidebar(category);
        setCurrentFolder(null);
        setViewingFile(null);
    };

    const handleFolderClick = (folder: ProjectFolder) => {
        setCurrentFolder(folder);
    };

    const handleFileClick = (file: ProjectFile) => {
        setViewingFile(file);
    };

    const handleBack = () => {
        if (viewingFile) {
            setViewingFile(null);
        } else if (currentFolder) {
            setCurrentFolder(null);
        }
    };

    return (
        <div className="finder-container">
            <aside className="finder-sidebar">
                <div className="sidebar-section">
                    <div className="sidebar-item-row" onClick={() => handleSidebarClick("Recents")}>
                        <Clock size={18} className={selectedSidebar === "Recents" ? "active" : ""} />
                        <span className={selectedSidebar === "Recents" ? "active" : ""}>Recents</span>
                    </div>
                    <div className="sidebar-item-row" onClick={() => handleSidebarClick("Featured")}>
                        <Share2 size={18} className={selectedSidebar === "Featured" ? "active" : ""} />
                        <span className={selectedSidebar === "Featured" ? "active" : ""}>Featured</span>
                    </div>
                </div>

                <div className="sidebar-section">
                    <div className="section-header">Favorites</div>
                    {Object.keys(PROJECTS_DATA).filter(k => !["Recents", "Featured"].includes(k)).map(category => (
                        <div
                            key={category}
                            className={`sidebar-item-row ${selectedSidebar === category ? "active-row" : ""}`}
                            onClick={() => handleSidebarClick(category)}
                        >
                            <Monitor size={18} color={
                                category === "AI & Machine Learning Systems" ? "#007AFF" :
                                    category === "Intelligent Platforms" ? "#FF9500" :
                                        category === "Hackathon Prototypes" ? "#34C759" : "#AF52DE"
                            } />
                            <span>{category}</span>
                        </div>
                    ))}
                </div>
            </aside>

            <main className="finder-main">
                <FinderHeader
                    currentTitle={viewingFile ? viewingFile.name : (currentFolder ? currentFolder.name : selectedSidebar)}
                    canGoBack={!!currentFolder || !!viewingFile}
                    onBack={handleBack}
                    onForward={() => { }}
                    canGoForward={false}
                />
                <div className="finder-content">
                    {currentFolder ? (
                        <div className="finder-grid">
                            {currentFolder.files.map((file, idx) => (
                                <div key={idx} className="finder-item" onDoubleClick={() => handleFileClick(file)}>
                                    <div className="item-icon-wrapper">
                                        {file.name.endsWith(".md") ? (
                                            <FileText size={48} className="icon-file" />
                                        ) : (
                                            <ImageIcon size={48} className="icon-image" />
                                        )}
                                    </div>
                                    <span className="item-name">{file.name}</span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="finder-grid">
                            {(PROJECTS_DATA[selectedSidebar] || []).map((folder, idx) => (
                                <div key={idx} className="finder-item" onDoubleClick={() => handleFolderClick(folder)}>
                                    <div className="item-icon-wrapper folder">
                                        <Folder size={64} fill="#7cbdf1" color="#7cbdf1" />
                                    </div>
                                    <span className="item-name">{folder.name}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* ── Quick Look Overlay ────────────────────────────────── */}
                {viewingFile && (
                    <div className="quick-look-overlay" onClick={() => setViewingFile(null)}>
                        <div className="quick-look-window" onClick={(e) => e.stopPropagation()}>
                            <div className="quick-look-header">
                                <button className="close-preview" onClick={() => setViewingFile(null)}>
                                    <ChevronLeft size={16} /> Done
                                </button>
                                <span>{viewingFile.name}</span>
                                <div style={{ width: 60 }} />
                            </div>
                            <div className="quick-look-body">
                                {viewingFile.name.endsWith(".md") ? (
                                    <div className="markdown-preview">
                                        <div className="md-content">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                                {mdContent}
                                            </ReactMarkdown>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="image-preview">
                                        {viewingFile.url ? (
                                            <img src={viewingFile.url} alt={viewingFile.name} />
                                        ) : (
                                            <div className="no-image">Architecture diagram not available.</div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Finder;
