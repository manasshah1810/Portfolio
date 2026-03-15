"use client";

import React, { useState, useEffect, useRef } from "react";
import "./phone-notes.css";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    ChevronLeft,
    Search,
    MoreHorizontal,
    Share,
    SquarePen,
    List,
    CheckCircle2,
    Image as ImageIcon,
    Camera,
    Mic,
    PenTool
} from "lucide-react";

interface Note {
    id: string;
    title: string;
    content: string;
    date: string;
    time: string;
    snippet: string;
}

const NOTES_DATA: Note[] = [
    {
        id: "1",
        title: "About me.md",
        time: "10:45 AM",
        date: "Today",
        snippet: "AI/ML engineering student focused on building intelligent systems...",
        content: `# Manas Shah

AI/ML engineering student focused on building intelligent systems, scalable software, and interactive technology experiences.

I enjoy exploring the intersection of **machine learning, system design, and user interaction**, where intelligent models are combined with well-engineered software systems to solve real problems.

Rather than focusing only on algorithms or only on applications, I aim to understand **how complete systems are designed, built, and scaled**.

---

## Background

I am currently pursuing a degree in **Artificial Intelligence and Machine Learning**, where my academic work focuses on machine learning models, data structures, and algorithmic thinking.

Alongside coursework, I spend most of my time building projects that explore:

* intelligent automation
* classification systems
* developer tools
* interactive software interfaces

My approach to learning is **project-driven** — building systems, analyzing their limitations, and iterating on better designs.

---

## Engineering Interests

My technical interests revolve around three primary areas:

### AI & Machine Learning

Designing models that can analyze, classify, and automate complex tasks.

Areas I explore include:

* supervised learning
* model pipelines
* data preprocessing
* ML system integration

---

### Software & System Design

Understanding how complex systems are structured and scaled.

Topics I regularly explore:

* modular architecture
* backend services
* system reliability
* performance optimization

---

### Interactive Technology

Building software that makes complex systems easier to visualize and use.

This includes:

* frontend interfaces
* data visualization
* interactive tools
* experimental interfaces such as AR/VR and 3D environments

---

## Current Focus

Right now I am particularly interested in:

* ML-powered classification systems
* AI-assisted developer tools
* scalable software architecture
* interactive developer experiences

Most of my projects are experiments in combining **machine learning models with real software systems**.

---

## How I Like to Build

When working on projects, I usually follow a structured process:

1. **Identify a problem** worth solving
2. **Design a system architecture** around the solution
3. **Build and iterate quickly** to test ideas
4. **Analyze performance and limitations**
5. **Refactor and improve the system design**

This process helps me move beyond small scripts and towards **building complete systems**.

---

## Long-Term Direction

My long-term goal is to work on **intelligent software systems** where machine learning, scalable architecture, and user interaction come together.

---

## Links

[**GitHub**](https://github.com/manasshah1810)
[**LinkedIn**](https://www.linkedin.com/in/manasshah1007)
[**Portfolio**](https://manasshah.netlify.app)`
    },
    {
        id: "2",
        title: "projects.md",
        time: "9:30 AM",
        date: "Today",
        snippet: "This file contains selected projects I have built while exploring machine learning...",
        content: `# Featured Projects

This file contains selected projects I have built while exploring machine learning systems, software engineering, and intelligent applications.

---

## IPL Win Predictor

Machine learning model designed to predict the probability of a team winning an IPL cricket match based on real-time match data.

### Solution

Developed a machine learning model that estimates the probability of each team winning as the match progresses.

The system analyzes match parameters such as:

* current score
* wickets remaining
* overs left
* target score
* run rate trends

### Technologies

* Python
* Machine Learning models
* data preprocessing
* sports analytics datasets

---

## AI Job Risk Analyzer

AI-powered tool that analyzes different professions and estimates the potential risk of automation due to artificial intelligence.

### Solution

Built a system that evaluates job roles and predicts their relative risk of automation based on task characteristics and technological trends.

Based on these parameters, the model generates a risk score that helps users understand how vulnerable a job role might be to automation.

---

## Lumen – Mental Wellness Application

Lumen is a mental wellness platform designed to help users monitor emotional well-being and access supportive resources.

### Solution

Developed a digital platform that allows users to track mood patterns and access mental wellness resources in an accessible format.

### Key Features

* mood tracking interface
* mental wellness insights
* structured journaling features

---

## Interactive Data Structure Visualizer

A web-based visualization tool designed to help learners understand how data structures operate internally.

### Solution

Built an interactive visualization platform where users can observe data structure operations in real time.

### Technologies

* JavaScript
* React
* browser-based rendering
* visualization techniques`
    },
    {
        id: "3",
        title: "system-design.md",
        time: "Yesterday",
        date: "Yesterday",
        snippet: "This file documents how I approach designing software systems...",
        content: `# System Design Notes

This file documents how I approach designing software systems.
While building projects, I focus not only on the implementation but also on how the system is structured, how components interact, and how the design can scale.

---

## My Approach to System Design

When building a system, I generally break the problem into the following stages.

### 1. Problem Definition

Before writing any code, the first step is understanding the problem clearly. A clear problem definition prevents unnecessary complexity later in the system.

### 2. System Decomposition

Once the problem is defined, the system is divided into smaller components. Typical components include:
* data ingestion
* processing layer
* storage layer
* API / service layer
* user interface

### 3. Data Flow Design

Understanding how data moves through the system is critical. Designing the data flow early prevents inefficient or overly complex architectures.

---

## Design Principles I Try to Follow

### Modularity

Systems should be composed of independent components that can be developed and tested separately.

### Simplicity

Complex architectures should be avoided unless necessary. A simple system that works reliably is usually better than an overly complicated design.

### Scalability Awareness

Even small projects benefit from thinking about how the system could scale in the future.`
    },
    {
        id: "4",
        title: "tech-stack.yaml",
        time: "Yesterday",
        date: "Yesterday",
        snippet: "profile: name: Manas Shah, role: AI/ML Engineering Student...",
        content: `\`\`\`yaml
profile:
  name: Manas Shah
  role: AI/ML Engineering Student
  focus:
    - machine learning systems
    - intelligent software
    - system design
    - interactive applications

languages:
  primary:
    - Python
    - C++
  secondary:
    - JavaScript
    - TypeScript

machine_learning:
  libraries:
    - scikit-learn
    - pandas
    - numpy
  concepts:
    - supervised learning
    - classification models
    - feature engineering

frontend:
  frameworks:
    - React
    - Next.js

backend:
  runtime:
    - Node.js
  frameworks:
    - Express

databases:
  relational:
    - MySQL
  non_relational:
    - MongoDB
\`\`\``
    },
    {
        id: "5",
        title: "currently-learning.md",
        time: "Monday",
        date: "3/11/26",
        snippet: "This file contains technologies and concepts I am actively exploring...",
        content: `# Currently Learning

This file contains technologies and concepts I am actively exploring as I continue developing my understanding of intelligent software systems and scalable architectures.

---

## AI Agents

Exploring how autonomous systems can perform complex tasks by combining reasoning, planning, and tool usage.

* agent workflows
* task planning
* tool-augmented AI systems

---

## Vector Databases

Studying how vector embeddings are used to represent unstructured data such as text, images, and code.

* embedding generation
* similarity search
* semantic retrieval

---

## Distributed Systems

Exploring how large-scale systems handle reliability, scalability, and high availability.

* distributed architecture patterns
* fault tolerance
* load distribution

---

## Immersive Interfaces

Experimenting with interactive technologies that combine software engineering with spatial or visual computing.`
    },
    {
        id: "6",
        title: "ideas.md",
        time: "Last Week",
        date: "3/08/26",
        snippet: "This file contains product ideas and experiments that I find interesting...",
        content: `# Project Ideas & Experiments

This file contains product ideas and experiments that I find interesting.

---

## AI Teaching Assistant

An AI-powered learning platform that helps students study based on their syllabus and exam schedule.

* students upload syllabus and exam timeline
* AI generates a structured study plan
* provides notes and learning resources

---

## AI Prompt Optimizer

An AI tool designed to improve prompts using the **ROSES framework**.

(R)ole, (O)bjective, (S)cenario, (E)xpected Solution, (S)teps.

---

## AI Fitness Coach

An intelligent fitness assistant that generates personalized training plans based on goals and preferences.

---

## Developer Social Network

A platform similar to LinkedIn but designed specifically for developers to share projects and discuss tech.`
    },
    {
        id: "7",
        title: "contact.json",
        time: "Last Month",
        date: "2/15/26",
        snippet: "{ \"name\": \"Manas Shah\", \"location\": \"Mumbai, India\" ... }",
        content: `\`\`\`json
{
  "name": "Manas Shah",
  "location": "Mumbai, India",
  "contact": {
    "email": "manasshah1210@gmail.com"
  },
  "profiles": {
    "github": "https://github.com/manasshah1810",
    "linkedin": "https://www.linkedin.com/in/manasshah1007"
  },
  "open_to": [
    "AI/ML internships",
    "software engineering internships",
    "collaborative technical projects"
  ]
}
\`\`\``
    }
];

const PhoneNotes: React.FC<{ onBack: () => void; initialId?: string | null }> = ({ onBack, initialId }) => {
    const [activeNote, setActiveNote] = useState<Note | null>(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        if (initialId) {
            const note = NOTES_DATA.find(n => n.id === initialId);
            if (note) {
                setActiveNote(note);
            }
        }
    }, [initialId]);

    // Gesture control
    const [dragY, setDragY] = useState(0);
    const [dragX, setDragX] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [isSwipingBack, setIsSwipingBack] = useState(false);

    const touchStartY = useRef(0);
    const touchStartX = useRef(0);
    const lastTouchY = useRef(0);
    const lastTouchX = useRef(0);
    const lastTouchTime = useRef(0);
    const velocityY = useRef(0);
    const velocityX = useRef(0);

    const filteredNotes = NOTES_DATA.filter(n =>
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.snippet.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Global Gestures
    const onTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        touchStartX.current = e.touches[0].clientX;
        lastTouchY.current = e.touches[0].clientY;
        lastTouchX.current = e.touches[0].clientX;
        lastTouchTime.current = Date.now();
        setIsActive(true);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const currentX = e.touches[0].clientX;
        const dy = currentY - touchStartY.current;
        const dx = currentX - touchStartX.current;
        const currentTime = Date.now();
        const dt = currentTime - lastTouchTime.current;

        if (dt > 0) {
            velocityY.current = (currentY - lastTouchY.current) / dt;
            velocityX.current = (currentX - lastTouchX.current) / dt;
        }

        // Swipe Up to Home (Vertical)
        if (Math.abs(dy) > Math.abs(dx) || isClosing) {
            if (dy < 0 && (touchStartY.current > window.innerHeight - 100 || dragY < 0)) {
                setDragY(dy);
                if (e.cancelable) e.preventDefault();
            }
        }
        // Swipe Back (Horizontal - only in detail view)
        else if (activeNote && dx > 0 && touchStartX.current < 50) {
            setDragX(dx);
            setIsSwipingBack(true);
            if (e.cancelable) e.preventDefault();
        }

        lastTouchY.current = currentY;
        lastTouchX.current = currentX;
        lastTouchTime.current = currentTime;
    };

    const onTouchEnd = () => {
        setIsActive(false);

        // Handle Vertical Dismissal
        const vThreshold = -window.innerHeight * 0.2;
        const vFast = velocityY.current < -0.5;
        if (dragY < vThreshold || vFast) {
            setIsClosing(true);
            setTimeout(() => onBack(), 300);
        } else {
            setDragY(0);
        }

        // Handle Horizontal Back
        const hThreshold = window.innerWidth * 0.3;
        const hFast = velocityX.current > 0.5;
        if (isSwipingBack) {
            if (dragX > hThreshold || hFast) {
                setActiveNote(null);
            }
            setDragX(0);
            setIsSwipingBack(false);
        }
    };

    const shrinkScale = Math.max(0.85, 1 + (dragY / window.innerHeight) * 0.4);
    const shrinkRadius = Math.min(40, (dragY / -200) * 40);

    return (
        <div
            className="pn-overlay"
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
            {!activeNote ? (
                <header className="pn-header">
                    <button className="pn-back-btn">
                        <ChevronLeft size={24} />
                        <span>Folders</span>
                    </button>
                    <div className="pn-header-right">
                        <Share size={20} className="pn-action-btn" />
                        <MoreHorizontal size={22} className="pn-action-btn" />
                    </div>
                </header>
            ) : (
                <header className="pn-header" style={{ transform: `translateX(${dragX}px)`, transition: isActive ? 'none' : 'transform 0.3s cubic-bezier(0.32, 1, 0.24, 1)' }}>
                    <button className="pn-back-btn" onClick={() => setActiveNote(null)}>
                        <ChevronLeft size={24} />
                        <span>Notes</span>
                    </button>
                    <div className="pn-header-right">
                        <Share size={20} className="pn-action-btn" />
                        <button className="pn-action-btn" style={{ fontWeight: 600 }} onClick={() => setActiveNote(null)}>Done</button>
                    </div>
                </header>
            )}

            {/* Content */}
            {!activeNote ? (
                <div className="pn-list-container">
                    <h1 className="pn-main-title">Notes</h1>
                    <div className="pn-search-row">
                        <div className="pn-search-box">
                            <Search size={18} />
                            <input
                                type="text"
                                className="pn-search-input"
                                placeholder="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="pn-notes-group">
                        {filteredNotes.map(note => (
                            <div key={note.id} className="pn-note-item" onClick={() => setActiveNote(note)}>
                                <span className="pn-note-title">{note.title}</span>
                                <div className="pn-note-meta">
                                    <span>{note.time}</span>
                                    <span className="pn-note-snippet">{note.snippet}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div
                    className="pn-detail-view"
                    style={{
                        transform: `translateX(${dragX}px)`,
                        transition: isActive ? 'none' : 'transform 0.3s cubic-bezier(0.32, 1, 0.24, 1)',
                        boxShadow: dragX > 0 ? '-5px 0 15px rgba(0,0,0,0.1)' : 'none'
                    }}
                >
                    <div className="pn-detail-content pn-md-view">
                        <div style={{ color: '#8E8E93', fontSize: '15px', marginBottom: '10px', textAlign: 'center' }}>
                            {activeNote.date} at {activeNote.time}
                        </div>
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>
                            {activeNote.content}
                        </ReactMarkdown>
                    </div>
                </div>
            )}

            {/* Toolbar */}
            {!activeNote && (
                <div className="pn-toolbar">
                    <CheckCircle2 size={22} className="pn-toolbar-btn" />
                    <span className="pn-notes-count">{filteredNotes.length} Notes</span>
                    <SquarePen size={22} className="pn-toolbar-btn" />
                </div>
            )}

            {/* Note Bottom Toolbar */}
            {activeNote && (
                <div className="pn-toolbar" style={{ justifyContent: 'space-between', padding: '0 15px' }}>
                    <CheckCircle2 size={22} className="pn-toolbar-btn" />
                    <PenTool size={22} className="pn-toolbar-btn" />
                    <Camera size={22} className="pn-toolbar-btn" />
                    <Mic size={22} className="pn-toolbar-btn" />
                    <SquarePen size={22} className="pn-toolbar-btn" />
                </div>
            )}

            {/* Home Indicator */}
            <div className="pn-home-indicator-wrap">
                <div className="pn-home-indicator" />
            </div>
        </div>
    );
};

export default PhoneNotes;
