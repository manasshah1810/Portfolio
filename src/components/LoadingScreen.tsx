"use client";

import React, { useState, useEffect, useCallback } from "react";
import "./loading.css";

interface LoadingScreenProps {
    onComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentLine, setCurrentLine] = useState("");
    const [isTyping, setIsTyping] = useState(true);
    const [progress, setProgress] = useState(0);
    const [showProgress, setShowProgress] = useState(false);
    const [isExiting, setIsExiting] = useState(false);

    const skip = useCallback(() => {
        setIsExiting(true);
        setTimeout(onComplete, 800);
    }, [onComplete]);

    useEffect(() => {
        const sequence = async () => {
            // 1. First command: cd portfolio
            await typeText("cd portfolio", 100);
            await pause(500);
            setLines((prev) => [...prev, "manasshah@Portfolio ~ % cd portfolio"]);
            setCurrentLine("");

            // 2. Second command: npm run dev
            await pause(300);
            await typeText("npm run dev", 80);
            await pause(600);
            setLines((prev) => [...prev, "manasshah@Portfolio ~ % npm run dev"]);
            setCurrentLine("");
            setIsTyping(false);

            // 3. Fake build output
            await pause(200);
            const outputLines = [
                "▸ Compiling modules...",
                "▸ Optimizing assets...",
                "✔ Build successful in 1.4s",
                "➜ Local: http://localhost:3000",
                "➜ Production: https://manasshah.netlify.app",
            ];

            for (const output of outputLines) {
                setLines((prev) => [...prev, output]);
                await pause(150);
            }

            // 4. Progress bar
            setShowProgress(true);
            for (let i = 0; i <= 100; i += 5) {
                setProgress(i);
                await pause(80);
            }

            // 5. Completion
            await pause(500);
            skip();
        };

        const typeText = (text: string, speed: number) => {
            return new Promise<void>((resolve) => {
                let i = 0;
                const interval = setInterval(() => {
                    setCurrentLine(text.slice(0, i + 1));
                    i++;
                    if (i === text.length) {
                        clearInterval(interval);
                        resolve();
                    }
                }, speed);
            });
        };

        const pause = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

        sequence();

        // Event listeners for skipping
        const handleEvents = () => skip();
        window.addEventListener("keydown", handleEvents);
        window.addEventListener("click", handleEvents);

        return () => {
            window.removeEventListener("keydown", handleEvents);
            window.removeEventListener("click", handleEvents);
        };
    }, [onComplete, skip]);

    return (
        <div className={`loading-screen ${isExiting ? "fade-out" : ""}`}>
            <div className="terminal-window">
                <div className="terminal-header">
                    <div className="terminal-buttons">
                        <span className="btn-close"></span>
                        <span className="btn-minimize"></span>
                        <span className="btn-maximize"></span>
                    </div>
                    <div className="terminal-title">
                        manasshah — -zsh — 106x24
                    </div>
                </div>
                <div className="terminal-body">
                    {lines.map((line, idx) => (
                        <div key={idx} className={`output ${line.includes("✔") || line.includes("➜") ? "success" : ""}`}>
                            {line}
                        </div>
                    ))}

                    {isTyping && (
                        <div className="output">
                            <span className="prompt">manasshah@Portfolio ~ %</span>
                            <span className="command">{currentLine}</span>
                            <span className="cursor"></span>
                        </div>
                    )}

                    {showProgress && (
                        <div className="progress-section">
                            <div className="progress-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${progress}%` }}
                                ></div>
                            </div>
                            <div className="progress-text">Initializing system... {progress}%</div>
                        </div>
                    )}

                    {!isTyping && !showProgress && (
                        <div className="output">
                            <span className="prompt">manasshah@Portfolio ~ %</span>
                            <span className="cursor"></span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
