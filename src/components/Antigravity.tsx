"use client";

import React, { useState, useEffect, useRef } from "react";
import "./antigravity.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    FileText,
    Image as ImageIcon,
    ChevronLeft,
    ChevronDown,
    ChevronRight,
    Search,
    MessageSquare,
    Zap,
    Settings,
    LayoutGrid,
    MoreHorizontal,
    Box,
    Terminal,
    Code2,
    Activity,
    Folder,
    Plus,
    X,
    Cpu,
    Sparkles,
    SendHorizonal,
    CheckCircle2,
    ArrowRight,
    Copy,
    Monitor,
    Download,
    File,
    Clock,
    Star
} from "lucide-react";

interface ProjectFile {
    name: string;
    type: "file" | "image";
    url: string;
}

interface ProjectData {
    name: string;
    files: ProjectFile[];
    github?: string;
    live?: string;
}

const PROJECTS_DATA: ProjectData[] = [
    {
        name: "AI Job Risk",
        github: "https://github.com/manasshah1810/ai-job-risk",
        live: "https://ai-job-risk.vercel.app/",
        files: [
            { name: "README.md", type: "file", url: "/projects/AI Job Risk/README.md" },
            { name: "architecture.png", type: "image", url: "/projects/AI Job Risk/AI-Job-risk.png" }
        ]
    },
    {
        name: "IPL Win Probability Engine",
        github: "https://github.com/manasshah1810/IPL-Win-Probability-Engine",
        live: "https://ipl-win-prob.streamlit.app/",
        files: [
            { name: "README.md", type: "file", url: "/projects/IPL Win Probability Engine/README.md" },
            { name: "architecture.png", type: "image", url: "/projects/IPL Win Probability Engine/IPL Win Probablity.png" }
        ]
    },
    {
        name: "Spam-Ham Classification",
        github: "https://github.com/manasshah1810/Spam-Ham-Classification",
        files: [
            { name: "README.md", type: "file", url: "/projects/Spam-Ham Classification/README.md" },
            { name: "architecture.png", type: "image", url: "/projects/Spam-Ham Classification/architecture.png" }
        ]
    },
    {
        name: "YouTube-to-Live-Translation",
        github: "https://github.com/manasshah1810/YouTube-to-Live-Translation",
        files: [
            { name: "README.md", type: "file", url: "/projects/YouTube-to-Live-Translation/README.md" },
            { name: "architecture.png", type: "image", url: "/projects/YouTube-to-Live-Translation/Youtube to Live Translation.png" }
        ]
    },
    /*
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
    },
    */
    {
        name: "FinCraft",
        github: "https://github.com/manasshah1810/FinCraft",
        files: [
            { name: "README.md", type: "file", url: "/projects/FinCraft/README.md" },
            { name: "architecture.png", type: "image", url: "/projects/FinCraft/FinCraft.png" }
        ]
    },
    {
        name: "Classmate Plus",
        github: "https://github.com/manasshah1810/Classmate-Plus",
        files: [
            { name: "README.md", type: "file", url: "/projects/Classmate Plus/README.md" },
            { name: "architecture.png", type: "image", url: "/projects/Classmate Plus/Classmate-Plus.png" }
        ]
    },
    {
        name: "Lumen: Mental Wellness App",
        github: "https://github.com/manasshah1810/Lumen",
        files: [
            { name: "README.md", type: "file", url: "/projects/Lumen Mental Wellness App/README.md" },
            { name: "architecture.png", type: "image", url: "/projects/Lumen Mental Wellness App/Lumen.png" }
        ]
    }
];

const OPENROUTER_API_KEY = "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";
const MODEL = "arcee-ai/trinity-mini:free";

const Antigravity: React.FC = () => {
    const [view, setView] = useState<'landing' | 'picker' | 'session'>('landing');
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [activeFile, setActiveFile] = useState<ProjectFile | null>(null);
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [mdContent, setMdContent] = useState("");
    const [currentProjectReadme, setCurrentProjectReadme] = useState("");
    const [isThinking, setIsThinking] = useState(false);

    // Sidebar Expand States
    const [isExplorerExpanded, setIsExplorerExpanded] = useState(true);
    const [isProjectRootExpanded, setIsProjectRootExpanded] = useState(true);
    const [isOutlineExpanded, setIsOutlineExpanded] = useState(false);
    const [isTimelineExpanded, setIsTimelineExpanded] = useState(false);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    // Fetch README for the editor view
    useEffect(() => {
        if (activeFile && activeFile.type === "file") {
            setMdContent("Loading...");
            fetch(activeFile.url)
                .then(res => res.text())
                .then(text => setMdContent(text))
                .catch(() => setMdContent("Failed to load README."));
        }
    }, [activeFile]);

    // Fetch primary README for context
    useEffect(() => {
        if (selectedProject) {
            const readmeFile = selectedProject.files.find(f => f.name.toLowerCase().includes("readme"));
            if (readmeFile) {
                fetch(readmeFile.url)
                    .then(res => res.text())
                    .then(text => setCurrentProjectReadme(text))
                    .catch(() => setCurrentProjectReadme(""));
            }
        }
    }, [selectedProject]);

    const handleProjectSelect = (project: ProjectData) => {
        setSelectedProject(project);
        setActiveFile(project.files[0]);
        setView('session');
        setMessages([
            {
                role: "assistant",
                text: `Welcome! I've indexed **${project.name}**. I have access to the README, Architecture, GitHub repo, and live links. What would you like to know?`,
            }
        ]);
    };

    const handleSendMessage = async () => {
        if (!chatInput.trim() || isThinking) return;

        const userText = chatInput;
        setMessages(prev => [...prev, { role: "user", text: userText }]);
        setChatInput("");
        setIsThinking(true);

        try {
            const context = `
            You are Antigravity, an intelligent project assistant.
            The user is asking about the project: "${selectedProject?.name}".
            
            PROJECT CONTEXT:
            - GitHub: ${selectedProject?.github || "N/A"}
            - Live Link: ${selectedProject?.live || "N/A"}
            - README Content:
            ${currentProjectReadme.substring(0, 4000)} // Limit context size
            
            INSTRUCTIONS:
            - Answer the user's question clearly and professionally.
            - Use clean Markdown formatting.
            - DO NOT use triple asterisks (***) for formatting.
            - Keep the answer concise but informative.
            - If details are missing, admit you don't know rather than hallucinating.
            `;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
                    "HTTP-Referer": window.location.origin,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "model": MODEL,
                    "messages": [
                        { "role": "system", "content": context },
                        { "role": "user", "content": userText }
                    ]
                })
            });

            const data = await response.json();
            const aiText = data.choices?.[0]?.message?.content || "I'm sorry, I encountered an error processing your request.";

            setMessages(prev => [...prev, { role: "assistant", text: aiText }]);
        } catch (error) {
            console.error("OpenRouter Error:", error);
            setMessages(prev => [...prev, { role: "assistant", text: "Error connecting to Antigravity AI engine. Please check your connection." }]);
        } finally {
            setIsThinking(false);
        }
    };

    // ── LANDING VIEW ──
    if (view === 'landing') {
        return (
            <div className="ag-landing">
                <header className="ag-header-minimal">
                    <div className="header-left">
                        <Activity size={16} />
                        <span className="window-title">Antigravity</span>
                    </div>
                    <div className="header-right">
                        <div className="ag-tools">
                            <LayoutGrid size={16} />
                            <Box size={16} />
                            <Search size={16} />
                            <Settings size={16} />
                            <div className="avatar">S</div>
                        </div>
                    </div>
                </header>
                <div className="landing-content">
                    <div className="center-orb">
                        <div className="ag-logo-wrapper">
                            <svg viewBox="0 0 100 100" className="ag-logo-svg">
                                <path d="M50 15 L85 85 L50 70 L15 85 Z" fill="currentColor" />
                            </svg>
                        </div>
                        <h1 className="landing-title">Antigravity</h1>
                        <div className="landing-actions">
                            <button className="btn-action primary" onClick={() => setView('picker')}>
                                <Folder size={18} /> Open Folder
                            </button>
                            <div className="secondary-actions">
                                <button className="btn-action secondary">Open Agent Manager</button>
                                <button className="btn-action secondary"><Copy size={16} /> Clone Repository</button>
                            </div>
                        </div>
                        <div className="workspaces-section">
                            <h2 className="section-label">Workspaces</h2>
                            <div className="workspace-item">
                                <span className="item-title">project</span>
                                <span className="item-path">~/Desktop</span>
                            </div>
                        </div>
                    </div>
                </div>
                <footer className="landing-footer">
                    <div className="footer-left">
                        <Terminal size={14} />
                        <span>0</span>
                        <Zap size={14} />
                        <span>0</span>
                    </div>
                    <div className="footer-right">
                        <span>Antigravity - Settings</span>
                    </div>
                </footer>
            </div>
        );
    }

    // ── PICKER VIEW (FINDER UI) ──
    if (view === 'picker') {
        return (
            <div className="ag-picker">
                <header className="picker-header">
                    <div className="header-nav">
                        <ChevronLeft className="nav-icon" onClick={() => setView('landing')} />
                        <ChevronRight className="nav-icon disabled" />
                        <span className="folder-name">Desktop</span>
                    </div>
                    <div className="picker-toolbar">
                        <LayoutGrid size={16} />
                        <MoreHorizontal size={16} />
                        <Search size={16} />
                    </div>
                </header>
                <div className="picker-main">
                    <aside className="picker-sidebar">
                        <div className="sidebar-group">
                            <span className="group-label">Favorites</span>
                            <div className="sidebar-item"><Monitor size={16} /> Desktop</div>
                            <div className="sidebar-item"><Download size={16} /> Downloads</div>
                            <div className="sidebar-item"><File size={16} /> Documents</div>
                            <div className="sidebar-item"><Clock size={16} /> Recents</div>
                        </div>
                        <div className="sidebar-group">
                            <span className="group-label">Tags</span>
                            <div className="sidebar-item tag"><div className="dot red" /> Red</div>
                            <div className="sidebar-item tag"><div className="dot orange" /> Orange</div>
                        </div>
                    </aside>
                    <main className="picker-grid">
                        {PROJECTS_DATA.map((p, idx) => (
                            <div key={idx} className="grid-item" onDoubleClick={() => handleProjectSelect(p)}>
                                <div className="folder-icon-wrapper">
                                    <Folder size={48} fill="#7cbdf1" color="#7cbdf1" />
                                </div>
                                <span className="folder-label">{p.name}</span>
                            </div>
                        ))}
                    </main>
                </div>
            </div>
        );
    }

    // ── SESSION VIEW (IDE UI) ──
    return (
        <div className="antigravity-container">
            <header className="ag-header">
                <div className="header-left">
                    <X className="close-btn" onClick={() => setView('landing')} />
                    <span className="breadcrumb">
                        {selectedProject?.name} <ChevronRight size={14} /> {activeFile?.name}
                    </span>
                </div>
                <div className="header-center">
                </div>
                <div className="header-right">
                    <div className="ag-tools">
                        <Search size={16} />
                        <Terminal size={16} />
                        <Settings size={16} />
                        <div className="avatar">S</div>
                    </div>
                </div>
            </header>

            <div className="ag-main-layout">
                <aside className="ag-sidebar">
                    <div className="sidebar-group">
                        <div className="group-header" onClick={() => setIsExplorerExpanded(!isExplorerExpanded)}>
                            {isExplorerExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />} EXPLORER
                        </div>
                        {isExplorerExpanded && (
                            <>
                                <div className="sidebar-item active project-root" onClick={() => setIsProjectRootExpanded(!isProjectRootExpanded)}>
                                    {isProjectRootExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />} {selectedProject?.name}
                                </div>
                                {isProjectRootExpanded && (
                                    <div className="sidebar-inner-list">
                                        {selectedProject?.files.map((file, idx) => (
                                            <div
                                                key={idx}
                                                className={`sidebar-file ${activeFile?.name === file.name ? "active" : ""}`}
                                                onClick={() => setActiveFile(file)}
                                            >
                                                {file.type === "file" ? <FileText size={14} /> : <ImageIcon size={14} />}
                                                <span>{file.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                    <div className="sidebar-group">
                        <div className="group-header" onClick={() => setIsOutlineExpanded(!isOutlineExpanded)}>
                            {isOutlineExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />} OUTLINE
                        </div>
                    </div>
                    <div className="sidebar-group">
                        <div className="group-header" onClick={() => setIsTimelineExpanded(!isTimelineExpanded)}>
                            {isTimelineExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />} TIMELINE
                        </div>
                    </div>
                </aside>

                <main className="ag-editor">
                    <div className="editor-tabs">
                        {activeFile && (
                            <div className="tab active">
                                {activeFile.type === "file" ? <FileText size={14} className="tab-icon" /> : <ImageIcon size={14} className="tab-icon" />}
                                {activeFile.name}
                                <X size={12} className="tab-close" />
                            </div>
                        )}
                        <div className="add-tab"><Plus size={14} /></div>
                    </div>
                    <div className="editor-content">
                        {activeFile?.type === "file" ? (
                            <div className="markdown-view">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>{mdContent}</ReactMarkdown>
                            </div>
                        ) : (
                            <div className="image-view">
                                <img src={activeFile?.url} alt="Architecture" />
                            </div>
                        )}
                    </div>
                    <div className="editor-status">
                        <div className="status-left">
                            <span>main*</span>
                            <Activity size={12} />
                            <span>0</span>
                            <Zap size={12} />
                            <span>0</span>
                            <span>clangd: idle</span>
                        </div>
                        <div className="status-right">
                            <span>Ln 15, Col 1</span>
                            <span>Spaces: 2</span>
                            <span>UTF-8</span>
                            <span>LF</span>
                            <span>Antigravity - Settings</span>
                        </div>
                    </div>
                </main>

                <aside className="ag-ai-panel">
                    <div className="ai-header">
                        <span>Checking {activeFile?.name}</span>
                        <div className="ai-header-actions">
                            <Plus size={14} />
                            <Activity size={14} />
                            <MoreHorizontal size={14} />
                        </div>
                    </div>

                    <div className="ai-chat-history">
                        {messages.map((m, idx) => (
                            <div key={idx} className={`chat-bubble ${m.role}`}>
                                {m.role === "assistant" && (
                                    <div className="assistant-content">
                                        <div className="ai-text">
                                            <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                                        </div>
                                    </div>
                                )}
                                {m.role === "user" && <div className="user-text">{m.text}</div>}
                            </div>
                        ))}
                        {isThinking && (
                            <div className="chat-bubble assistant">
                                <div className="thinking-indicator">
                                    <Sparkles size={14} className="spin" /> Thinking...
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="ai-actions-bottom">
                        <div className="chat-input-wrapper">
                            <textarea
                                placeholder="Ask anything about this project..."
                                value={chatInput}
                                onChange={(e) => setChatInput(e.target.value)}
                                disabled={isThinking}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter" && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <div className="chat-input-controls">
                                <Plus size={16} />
                                <div className="active-model">
                                    <Sparkles size={12} /> Trinity Mini
                                </div>
                                <SendHorizonal
                                    size={16}
                                    className={`send-icon ${isThinking ? 'disabled' : ''}`}
                                    onClick={handleSendMessage}
                                />
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Antigravity;
