"use client";

import React, { useState, useMemo } from "react";
import "./calendar.css";
import {
    Plus,
    ChevronLeft,
    ChevronRight,
    Search
} from "lucide-react";
import { TrafficLights } from "./Window";

interface CalendarEvent {
    title: string;
    start: Date;
    end: Date;
    color: string;
    category: string;
}

const EVENTS: CalendarEvent[] = [
    {
        title: "My Birthday 🎂",
        start: new Date(2026, 9, 18),
        end: new Date(2026, 9, 18),
        color: "#FF2D55",
        category: "Personal"
    },
    {
        title: "Acemgrade Internship",
        start: new Date(2023, 5, 13),
        end: new Date(2023, 7, 13),
        color: "#5856D6",
        category: "Work"
    },
    {
        title: "HopHead Internship",
        start: new Date(2024, 4, 21),
        end: new Date(2024, 5, 22),
        color: "#FF9500",
        category: "Work"
    },
    {
        title: "Java & JS CodSoft Internship",
        start: new Date(2024, 0, 1),
        end: new Date(2024, 0, 31),
        color: "#34C759",
        category: "School"
    },
    {
        title: "Cogniify Internship",
        start: new Date(2026, 1, 23),
        end: new Date(2026, 3, 22),
        color: "#007AFF",
        category: "Work"
    }
];

export const CalendarHeader: React.FC<any> = ({
    id, onClose, onMinimize, toggleMaximize, handleMouseDown,
    onPrev, onNext, onToday, viewMode, setViewMode
}) => {
    return (
        <div className="calendar-window-header" onMouseDown={handleMouseDown}>
            <div className="calendar-header-left">
                <TrafficLights
                    onClose={() => onClose(id)}
                    onMinimize={() => onMinimize(id)}
                    onMaximize={toggleMaximize}
                />
            </div>

            <div className="calendar-header-toolbar">
                <div className="toolbar-left">
                    {/* Plus button removed as requested */}
                </div>

                <div className="toolbar-center">
                    <div className="view-toggle">
                        {['Day', 'Week', 'Month', 'Year'].map(mode => (
                            <button
                                key={mode}
                                className={`toggle-btn ${viewMode === mode.toLowerCase() ? 'active' : ''}`}
                                onClick={() => setViewMode(mode.toLowerCase())}
                            >
                                {mode}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="toolbar-right">
                    {/* Search removed as requested */}
                    <div className="nav-controls">
                        <button className="nav-arrow" onClick={onPrev}><ChevronLeft size={16} /></button>
                        <button className="today-btn" onClick={onToday}>Today</button>
                        <button className="nav-arrow" onClick={onNext}><ChevronRight size={16} /></button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const Calendar: React.FC<{
    viewDate: Date;
    setViewDate: (d: Date) => void;
    viewMode: string;
}> = ({ viewDate, setViewDate, viewMode }) => {
    const today = new Date();

    const calendarGrid = useMemo(() => {
        const year = viewDate.getFullYear();
        const month = viewDate.getMonth();

        const firstDayOfMonth = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        const grid = [];

        // Prev Month padding
        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            grid.push({
                day: prevMonthLastDay - i,
                month: month - 1,
                year: month === 0 ? year - 1 : year,
                currentMonth: false,
                date: new Date(month === 0 ? year - 1 : year, month === 0 ? 11 : month - 1, prevMonthLastDay - i)
            });
        }

        // Current Month
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({
                day: i,
                month: month,
                year: year,
                currentMonth: true,
                date: new Date(year, month, i)
            });
        }

        // Next Month padding
        const remaining = 42 - grid.length;
        for (let i = 1; i <= remaining; i++) {
            grid.push({
                day: i,
                month: month + 1,
                year: month === 11 ? year + 1 : year,
                currentMonth: false,
                date: new Date(month === 11 ? year + 1 : year, month === 11 ? 0 : month + 1, i)
            });
        }

        return grid;
    }, [viewDate]);

    const isToday = (date: Date) => {
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    // Helper to check if an event covers a specific date
    const getEventsAtDate = (date: Date) => {
        return EVENTS.filter(e => {
            const start = new Date(e.start.getFullYear(), e.start.getMonth(), e.start.getDate());
            const end = new Date(e.end.getFullYear(), e.end.getMonth(), e.end.getDate());
            const target = new Date(date.getFullYear(), date.getMonth(), date.getDate());
            return target >= start && target <= end;
        });
    };

    // Split grid into weeks for spanning events
    const weeks = useMemo(() => {
        const rows = [];
        for (let i = 0; i < calendarGrid.length; i += 7) {
            rows.push(calendarGrid.slice(i, i + 7));
        }
        return rows;
    }, [calendarGrid]);

    return (
        <div className="calendar-container">
            <aside className="calendar-sidebar">
                <div className="sidebar-section">
                    <div className="sidebar-title">iCloud</div>
                    <div className="calendar-list-item">
                        <input type="checkbox" defaultChecked />
                        <span className="dot" style={{ background: '#007AFF' }}></span>
                        <span className="name">Calendar</span>
                    </div>
                    <div className="calendar-list-item">
                        <input type="checkbox" defaultChecked />
                        <span className="dot" style={{ background: '#FF2D55' }}></span>
                        <span className="name">Personal</span>
                    </div>
                    <div className="calendar-list-item">
                        <input type="checkbox" defaultChecked />
                        <span className="dot" style={{ background: '#FF9500' }}></span>
                        <span className="name">Work</span>
                    </div>
                </div>

                <div className="mini-calendar">
                    <div className="mini-header">
                        {viewDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
                    </div>
                    <div className="mini-grid">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => <div key={i} className="mini-day-name">{d}</div>)}
                        {calendarGrid.slice(0, 35).map((dayObj, i) => (
                            <div key={i} className={`mini-day ${!dayObj.currentMonth ? 'other' : ''} ${isToday(dayObj.date) ? 'today' : ''}`}>
                                {dayObj.day}
                            </div>
                        ))}
                    </div>
                </div>
            </aside>

            <main className="calendar-main">
                <div className="main-view-header">
                    <h1>{viewDate.toLocaleString('default', { month: 'long' })} <span>{viewDate.getFullYear()}</span></h1>
                </div>

                {viewMode === 'month' && (
                    <div className="month-view">
                        <div className="calendar-grid-header">
                            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                                <div key={i} className="grid-day-header">{d}</div>
                            ))}
                        </div>
                        <div className="calendar-weeks-container">
                            {weeks.map((week, wIdx) => (
                                <div key={wIdx} className="calendar-week-row">
                                    {/* Event Overlay for the week */}
                                    <div className="week-events-overlay">
                                        {EVENTS.filter(e => {
                                            const weekStart = week[0].date;
                                            const weekEnd = week[6].date;
                                            return e.start <= weekEnd && e.end >= weekStart;
                                        }).map((event, eIdx) => {
                                            const eventStartInWeek = event.start > week[0].date ? week.findIndex(d => d.date.toDateString() === event.start.toDateString()) : 0;
                                            const eventEndInWeek = event.end < week[6].date ? week.findIndex(d => d.date.toDateString() === event.end.toDateString()) : 6;
                                            const span = eventEndInWeek - eventStartInWeek + 1;

                                            return (
                                                <div
                                                    key={eIdx}
                                                    className="seamless-event-bar"
                                                    style={{
                                                        gridColumn: `${eventStartInWeek + 1} / span ${span}`,
                                                        backgroundColor: event.color === "#007AFF" ? "rgba(0, 122, 255, 0.1)" :
                                                            event.color === "#FF2D55" ? "rgba(255, 45, 85, 0.1)" :
                                                                event.color === "#FF9500" ? "rgba(255, 149, 0, 0.1)" :
                                                                    event.color === "#34C759" ? "rgba(52, 199, 89, 0.1)" : "rgba(88, 86, 214, 0.1)",
                                                        color: event.color,
                                                        borderLeft: `3px solid ${event.color}`,
                                                        top: `${(eIdx * 32)}px`
                                                    }}
                                                >
                                                    {event.title}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    {/* Day Cells */}
                                    {week.map((dayObj, dIdx) => (
                                        <div key={dIdx} className={`grid-cell ${!dayObj.currentMonth ? 'non-current' : ''}`}>
                                            <div className={`cell-day-num ${isToday(dayObj.date) ? 'today-circle' : ''}`}>
                                                {dayObj.day}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {viewMode !== 'month' && (
                    <div className="placeholder-view">
                        <h2>{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} View</h2>
                        <p>This view is coming soon in the next update!</p>
                    </div>
                )}
            </main>
        </div>
    );
};

export default Calendar;
