"use client";

import React, { useState, useEffect, useRef } from "react";
import "./window.css";

interface WindowProps {
    title: string;
    id: string;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    children: React.ReactNode;
    initialPos?: { x: number; y: number };
    initialSize?: { width: number; height: number };
    minSize?: { width: number; height: number };
    active: boolean;
    onFocus: (id: string) => void;
    customHeader?: (props: {
        id: string;
        title: string;
        onClose: (id: string) => void;
        onMinimize: (id: string) => void;
        toggleMaximize: () => void;
        handleMouseDown: (e: React.MouseEvent) => void;
    }) => React.ReactNode;
}

export const TrafficLights: React.FC<{
    onClose: () => void;
    onMinimize: () => void;
    onMaximize: () => void;
}> = ({ onClose, onMinimize, onMaximize }) => (
    <div className="window-controls">
        <button className="control close" onClick={onClose}>
            <svg viewBox="0 0 12 12"><path d="M8.53 3.47a.75.75 0 00-1.06 0L6 4.94 4.53 3.47a.75.75 0 00-1.06 1.06L4.94 6l-1.47 1.47a.75.75 0 101.06 1.06L6 7.06l1.47 1.47a.75.75 0 101.06-1.06L7.06 6l1.47-1.47a.75.75 0 000-1.06z" /></svg>
        </button>
        <button className="control minimize" onClick={onMinimize}>
            <svg viewBox="0 0 12 12"><path d="M9 6a.5.5 0 01-.5.5h-5a.5.5 0 010-1h5A.5.5 0 019 6z" /></svg>
        </button>
        <button className="control maximize" onClick={onMaximize}>
            <svg viewBox="0 0 12 12"><path d="M3.5 2a1.5 1.5 0 00-1.5 1.5v5A1.5 1.5 0 003.5 10h5a1.5 1.5 0 001.5-1.5v-5A1.5 1.5 0 008.5 2h-5zM4 3h4a1 1 0 011 1v4a1 1 0 01-1 1H4a1 1 0 01-1-1V4a1 1 0 011-1z" /></svg>
        </button>
    </div>
);

const Window: React.FC<WindowProps> = ({
    title,
    id,
    onClose,
    onMinimize,
    children,
    initialPos = { x: 100, y: 100 },
    initialSize = { width: 320, height: 480 },
    minSize = { width: 200, height: 300 },
    active,
    onFocus,
    customHeader,
}) => {
    const [pos, setPos] = useState(initialPos);
    const [size, setSize] = useState(initialSize);
    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxState, setPreMaxState] = useState({ pos, size });

    const windowRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    const handleMouseDown = (e: React.MouseEvent) => {
        onFocus(id);
        const target = e.target as HTMLElement;

        // Prevent dragging when clicking buttons, inputs, or other interactive elements
        if (target.closest('button') || target.closest('input') || target.closest('a')) {
            return;
        }

        const isHeader = target.closest(".window-header") || target.closest(".calendar-window-header") || target.closest(".maps-window-header");
        const isCalendarBody = id === "calendar" && target.closest(".calendar-container");

        if ((isHeader || isCalendarBody) && !isMaximized) {
            setIsDragging(true);
            dragOffset.current = {
                x: e.clientX - pos.x,
                y: e.clientY - pos.y,
            };
        }
    };

    const toggleMaximize = () => {
        if (!isMaximized) {
            setPreMaxState({ pos, size });
            setPos({ x: 0, y: 30 }); // Menubar adjustment
            setSize({ width: window.innerWidth, height: window.innerHeight - 30 });
        } else {
            setPos(preMaxState.pos);
            setSize(preMaxState.size);
        }
        setIsMaximized(!isMaximized);
    };

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isMaximized) setIsResizing(true);
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (isDragging && !isMaximized) {
                setPos({
                    x: e.clientX - dragOffset.current.x,
                    y: e.clientY - dragOffset.current.y,
                });
            }
            if (isResizing && !isMaximized) {
                const newWidth = Math.max(minSize.width, e.clientX - pos.x);
                const newHeight = Math.max(minSize.height, e.clientY - pos.y);
                setSize({ width: newWidth, height: newHeight });
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            setIsResizing(false);
        };

        if (isDragging || isResizing) {
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("mouseup", handleMouseUp);
        }

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [isDragging, isResizing, pos, minSize, isMaximized]);

    return (
        <div
            ref={windowRef}
            className={`mac-window ${active ? "active" : ""} ${isMaximized ? "maximized" : ""}`}
            style={{
                left: pos.x,
                top: pos.y,
                width: size.width,
                height: isMaximized ? "calc(100vh - 30px)" : size.height,
                zIndex: active ? 100 : 90,
            }}
            onMouseDown={() => onFocus(id)}
        >
            {customHeader ? (
                customHeader({ id, title, onClose, onMinimize, toggleMaximize, handleMouseDown })
            ) : (
                <div className="window-header" onMouseDown={handleMouseDown}>
                    <TrafficLights
                        onClose={() => onClose(id)}
                        onMinimize={() => onMinimize(id)}
                        onMaximize={toggleMaximize}
                    />
                    <div className="window-title">{title}</div>
                </div>
            )}
            <div className="window-content">
                {React.Children.map(children, (child) => {
                    if (React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement<any>, { isMaximized });
                    }
                    return child;
                })}
            </div>
            {!isMaximized && (
                <div className="window-resizer" onMouseDown={handleResizeMouseDown} />
            )}
        </div>
    );
};

export default Window;
