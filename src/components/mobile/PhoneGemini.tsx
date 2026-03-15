"use client";

import React, { useState, useEffect, useRef } from "react";
import "./phone-gemini.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    ChevronLeft,
    Search,
    Mic,
    Image as ImageIcon,
    Camera,
    Plus,
    SendHorizonal,
    Sparkles,
    Youtube,
    Folder,
    History,
    User,
    Volume2
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

const PhoneGemini: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [view, setView] = useState<'landing' | 'chat'>('landing');
    const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState<any[]>([]);
    const [isThinking, setIsThinking] = useState(false);
    const [projectReadme, setProjectReadme] = useState("");

    // Gesture control
    const [dragY, setDragY] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const touchStartY = useRef(0);
    const lastTouchY = useRef(0);
    const lastTouchTime = useRef(0);
    const velocity = useRef(0);

    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (chatEndRef.current) {
            chatEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [messages]);

    const handleProjectSelect = (project: ProjectData) => {
        setSelectedProject(project);
        setView('chat');

        // Fetch README for context
        const readmeFile = project.files.find(f => f.name.toLowerCase().includes("readme"));
        if (readmeFile) {
            fetch(readmeFile.url)
                .then(res => res.text())
                .then(text => setProjectReadme(text))
                .catch(() => setProjectReadme(""));
        }

        setMessages([
            {
                role: "assistant",
                text: `Hello! I'm now focused on **${project.name}**. I've indexed its README and Architecture. How can I help you today?`,
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
            You are Gemini, a specialized AI assistant for Manas Shah's portfolio.
            STRICT GUARDRAIL: You are ONLY allowed to answer questions about the selected project: "${selectedProject?.name}".

            PROJECT CONTEXT PROVIDED:
            - GitHub: ${selectedProject?.github || "N/A"}
            - Live Link: ${selectedProject?.live || "N/A"}
            - README Content:
            ${projectReadme.substring(0, 4000)}

            RULES OF ENGAGEMENT:
            1. ONLY discuss topics directly related to this project (features, tech stack, code, architecture, or its purpose).
            2. If a user asks about ANYTHING else (e.g., recipes, general knowledge, other people, or non-project tasks), you MUST politely but firmly decline and state: "I'm sorry, I am specifically designed to answer questions about the ${selectedProject?.name} project. Please ask me anything regarding its development or features."
            3. Do NOT hallucinate. Use only the provided context.
            4. Keep answers concise and mobile-friendly.
            `;

            const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                method: "POST",
                headers: {
                    "Authorization": `Bearer ${OPENROUTER_API_KEY.trim()}`,
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

            if (!response.ok) {
                console.error("OpenRouter Error:", data);
                const errorMsg = data.error?.message || "Unauthorized (401). Please check your API key.";
                throw new Error(errorMsg);
            }

            const aiText = data.choices?.[0]?.message?.content || "I'm sorry, I encountered an error.";
            setMessages(prev => [...prev, { role: "assistant", text: aiText }]);
        } catch (error: any) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, {
                role: "assistant",
                text: `**Error:** ${error.message || "Error connecting to AI engine."}`
            }]);
        } finally {
            setIsThinking(false);
        }
    };

    // Gestures
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        lastTouchY.current = e.touches[0].clientY;
        lastTouchTime.current = Date.now();
        setIsActive(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const dy = currentY - touchStartY.current;
        const currentTime = Date.now();
        const dt = currentTime - lastTouchTime.current;

        if (dt > 0) {
            velocity.current = (currentY - lastTouchY.current) / dt;
        }

        if (dy < 0 && (touchStartY.current > window.innerHeight - 100 || dragY < 0)) {
            setDragY(dy);
            if (e.cancelable) e.preventDefault();
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

    const shrinkScale = Math.max(0.85, 1 + (dragY / window.innerHeight) * 0.4);
    const shrinkRadius = Math.min(40, (dragY / -200) * 40);

    return (
        <div
            className="pg-overlay"
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
            <header className="pg-header">
                <div className="pg-header-left">
                    {view === 'chat' && (
                        <button className="pg-back-btn" onClick={() => setView('landing')}>
                            <ChevronLeft size={24} />
                        </button>
                    )}
                    <div className="pg-gemini-pill">
                        <img src="/icons/gemini-mobile.png" className="pg-gemini-logo" alt="Gemini" />
                        <span className="pg-gemini-text">Gemini</span>
                    </div>
                </div>
                <div className="pg-user-avatar">M</div>
            </header>

            {/* Landing View */}
            {view === 'landing' ? (
                <div className="pg-landing">
                    <h1 className="pg-greeting">Good morning</h1>

                    <div className="pg-cards-row">
                        <div className="pg-suggest-card">
                            <span className="pg-suggest-text">Ask about my latest AI projects</span>
                            <Sparkles className="pg-suggest-icon" size={20} />
                        </div>
                        <div className="pg-suggest-card">
                            <span className="pg-suggest-text">How does the IPL engine work?</span>
                            <Folder className="pg-suggest-icon" size={20} />
                        </div>
                        <div className="pg-suggest-card">
                            <span className="pg-suggest-text">Summarize my experience</span>
                            <User className="pg-suggest-icon" size={20} />
                        </div>
                    </div>

                    <h2 className="pg-section-title">Select a Project to chat about</h2>
                    <div className="pg-project-list">
                        {PROJECTS_DATA.map(p => (
                            <div key={p.name} className="pg-project-option" onClick={() => handleProjectSelect(p)}>
                                <History className="pg-project-icon" size={20} />
                                <span className="pg-project-name">{p.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                /* Chat View */
                <div className="pg-chat-container">
                    {messages.map((m, idx) => (
                        <div key={idx} className={`pg-message ${m.role}`}>
                            {m.role === 'assistant' ? (
                                <>
                                    <div className="pg-ai-header-row">
                                        <div className="pg-ai-icon-box">
                                            <Sparkles size={18} color="#4285F4" />
                                        </div>
                                        <Volume2 size={18} color="#8E918F" />
                                    </div>
                                    <div className={`pg-bubble assistant pg-md`}>
                                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{m.text}</ReactMarkdown>
                                    </div>
                                </>
                            ) : (
                                <div className={`pg-bubble user`}>
                                    {m.text}
                                </div>
                            )}
                        </div>
                    ))}
                    {isThinking && (
                        <div className="pg-message assistant">
                            <div className="pg-ai-header-row">
                                <div className="pg-ai-icon-box">
                                    <Sparkles size={18} color="#4285F4" className="spin" />
                                </div>
                            </div>
                            <div className="pg-thinking" style={{ padding: '0 16px' }}>
                                <span>Gemini is thinking...</span>
                            </div>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            )}

            {/* Input Area */}
            <div className="pg-input-wrapper">
                <div className="pg-input-container">
                    <Plus size={20} color="#444746" />
                    <textarea
                        className="pg-input"
                        placeholder="Ask Gemini"
                        rows={1}
                        value={chatInput}
                        onChange={(e) => setChatInput(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault();
                                handleSendMessage();
                            }
                        }}
                    />
                    <div className="pg-input-actions">
                        <Mic size={20} />
                        <Camera size={20} />
                        {chatInput.trim() && (
                            <button className="pg-send-btn" onClick={handleSendMessage}>
                                <SendHorizonal size={20} />
                            </button>
                        )}
                    </div>
                </div>
                <div className="pg-disclaimer">Gemini may display inaccurate info, including about people.</div>
            </div>

            {/* Home Indicator */}
            <div className="pg-home-indicator-wrap">
                <div className="pg-home-indicator" />
            </div>
        </div>
    );
};

export default PhoneGemini;
