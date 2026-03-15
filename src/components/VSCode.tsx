"use client";

import React, { useState } from "react";
import "./vscode.css";
import {
    Files,
    Search,
    Code2,
    Play,
    Bug,
    Blocks,
    Settings,
    UserCircle,
    Bell,
    ChevronDown,
    ChevronRight,
    FileText,
    X,
    Split,
    Check,
    Layout,
    Terminal as TerminalIcon,
    GitBranch,
    RefreshCw,
    XCircle,
    AlertTriangle,
    Info,
    MoreHorizontal
} from "lucide-react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ABOUT_ME_MARKDOWN = `# Manas Shah

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

I am particularly interested in roles involving:

* AI engineering
* system architecture
* intelligent product development

---

## Outside of Coding

Outside of building projects, I enjoy exploring:

* emerging technologies
* new software architectures
* developer tools and workflows
* experimental interfaces and design

I am always curious about how technology can be used to build **smarter, more intuitive systems**.

---

## Links

[**GitHub**](https://github.com/manasshah1810)

[**LinkedIn**](https://www.linkedin.com/in/manasshah1007)

[**Portfolio**](https://manasshah.netlify.app)`;

const PROJECTS_MARKDOWN = `# Featured Projects

This file contains selected projects I have built while exploring machine learning systems, software engineering, and intelligent applications.

Each project focuses on solving a practical problem while experimenting with different technologies and system architectures.

---

## IPL Win Predictor

Machine learning model designed to predict the probability of a team winning an IPL cricket match based on real-time match data.

### Problem

Cricket matches involve complex variables such as run rate, remaining overs, wickets, and match conditions.
Predicting match outcomes dynamically during a live game is difficult without analyzing multiple factors simultaneously.

### Solution

Developed a machine learning model that estimates the probability of each team winning as the match progresses.

The system analyzes match parameters such as:

* current score
* wickets remaining
* overs left
* target score
* run rate trends

The model continuously evaluates these inputs to produce real-time win probability predictions.

### System Pipeline

1. match dataset preparation
2. feature engineering
3. model training
4. probability prediction interface

### Technologies

* Python
* Machine Learning models
* data preprocessing
* sports analytics datasets

---

## AI Job Risk Analyzer

AI-powered tool that analyzes different professions and estimates the potential risk of automation due to artificial intelligence.

### Problem

With rapid advancements in AI and automation, many people are uncertain about how emerging technologies may impact their careers.

There is limited accessible information that helps individuals understand which roles are more susceptible to automation.

### Solution

Built a system that evaluates job roles and predicts their relative risk of automation based on task characteristics and technological trends.

The system analyzes factors such as:

* level of repetitive tasks
* cognitive complexity
* reliance on human interaction
* dependency on creativity or strategic thinking

Based on these parameters, the model generates a risk score that helps users understand how vulnerable a job role might be to automation.

### System Overview

1. occupational dataset collection
2. feature extraction
3. machine learning analysis
4. risk score generation

### Technologies

* Python
* data analysis tools
* machine learning models
* occupational datasets

---

## Lumen – Mental Wellness Application

Lumen is a mental wellness platform designed to help users monitor emotional well-being and access supportive resources.

### Problem

Mental health support is often difficult to access quickly, and many people struggle to track emotional patterns or find immediate guidance when experiencing stress or anxiety.

### Solution

Developed a digital platform that allows users to track mood patterns and access mental wellness resources in an accessible format.

The application focuses on helping users:

* monitor emotional states over time
* identify behavioral or emotional patterns
* access guided wellness resources
* receive supportive recommendations

### Key Features

* mood tracking interface
* mental wellness insights
* structured journaling features
* supportive resources for stress management

### Technologies

* modern frontend framework
* backend service integration
* application state management
* UI/UX focused design

---

## Interactive Data Structure Visualizer

A web-based visualization tool designed to help learners understand how data structures operate internally.

### Problem

Many learners struggle to understand the internal behavior of data structures when learning them through static diagrams or textbook explanations.

### Solution

Built an interactive visualization platform where users can observe data structure operations in real time.

The tool demonstrates operations such as:

* insertion
* deletion
* traversal
* searching

Users can interact with the structures and observe how each operation changes the internal state.

### Technologies

* JavaScript
* React
* browser-based rendering
* visualization techniques

---

Additional experiments and development work can be explored on my GitHub repository.

GitHub
https://github.com/manasshah1810
`;

const SYSTEM_DESIGN_MARKDOWN = `# System Design Notes

This file documents how I approach designing software systems.
While building projects, I focus not only on the implementation but also on how the system is structured, how components interact, and how the design can scale.

---

## My Approach to System Design

When building a system, I generally break the problem into the following stages.

### 1. Problem Definition

Before writing any code, the first step is understanding the problem clearly.

Questions I usually ask:

* What is the core problem being solved?
* Who will use the system?
* What are the expected inputs and outputs?
* What constraints exist (performance, scalability, data size)?

A clear problem definition prevents unnecessary complexity later in the system.

---

### 2. System Decomposition

Once the problem is defined, the system is divided into smaller components.

Typical components include:

* data ingestion
* processing or computation layer
* storage layer
* API or service layer
* user interface

Breaking the system into modules helps maintain **separation of concerns** and makes the system easier to maintain.

---

### 3. Data Flow Design

Understanding how data moves through the system is critical.

Typical questions:

* Where does the data originate?
* How is it processed?
* Where is it stored?
* How is it retrieved?

Designing the data flow early prevents inefficient or overly complex architectures.

---

### 4. Technology Selection

After defining the system structure, the next step is selecting appropriate tools and technologies.

Key considerations include:

* performance requirements
* ease of development
* scalability
* community support

The goal is not to use the most advanced tools, but to choose technologies that fit the system requirements.

---

## Example Architecture: ML Prediction System

Many of my projects involve machine learning models that need to be integrated into a working application.

A typical ML system architecture includes:

1. Data collection
2. Data preprocessing
3. Model training
4. Model evaluation
5. Model deployment
6. Prediction interface

### System Components

**Data Layer**

Responsible for collecting and storing training data.

**Training Pipeline**

Handles preprocessing, feature engineering, and model training.

**Inference Service**

Provides predictions using the trained model.

**Application Interface**

Allows users to interact with the system and view predictions.

---

## Example: IPL Win Predictor Architecture

The IPL Win Predictor project follows a pipeline-based architecture.

### System Flow

1. Match dataset ingestion
2. Feature engineering (runs, overs, wickets, target)
3. Model training and evaluation
4. Real-time prediction engine
5. Web interface for probability visualization

### Design Considerations

* feature consistency between training and inference
* efficient data preprocessing
* interpretable prediction outputs

---

## Example: AI Job Risk Analyzer

This project analyzes job roles and estimates automation risk.

### System Architecture

1. Occupational dataset ingestion
2. feature extraction from job tasks
3. ML-based risk evaluation
4. score generation system
5. user-facing interface

### Key Challenges

* mapping qualitative job tasks to structured features
* interpreting model predictions clearly for users

---

## Design Principles I Try to Follow

### Modularity

Systems should be composed of independent components that can be developed and tested separately.

### Simplicity

Complex architectures should be avoided unless necessary.

A simple system that works reliably is usually better than an overly complicated design.

### Scalability Awareness

Even small projects benefit from thinking about how the system could scale in the future.

This includes:

* efficient data pipelines
* modular service layers
* flexible system architecture

---

## Topics I Am Currently Exploring

Some system design topics I am actively learning about include:

* distributed systems
* scalable machine learning pipelines
* vector databases
* AI agent architectures
* cloud-based infrastructure

These areas are important for building large-scale intelligent systems.

---

System design is a skill that develops through building systems, analyzing failures, and continuously refining architectures.
`;

const TECH_STACK_YAML = `profile:
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
familiarity:
- Solidity

machine_learning:
libraries:
- scikit-learn
- pandas
- numpy
- matplotlib
- seaborn
concepts:
- supervised learning
- classification models
- feature engineering
- model evaluation
- data preprocessing
- prediction pipelines

data_science:
tools:
- pandas
- numpy
- matplotlib
tasks:
- exploratory data analysis
- dataset preparation
- feature extraction
- data cleaning

frontend:
frameworks:
- React
- Next.js
technologies:
- HTML
- CSS
- JavaScript
focus:
- UI/UX development
- interactive interfaces
- component-based architecture

backend:
runtime:
- Node.js
frameworks:
- Express
concepts:
- REST APIs
- modular backend architecture

databases:
relational:
- MySQL
non_relational:
- MongoDB
backend_services:
- Firebase
- Supabase

blockchain:
technologies:
- Solidity
concepts:
- smart contracts
- decentralized applications
- blockchain fundamentals

cloud_and_platforms:

* Firebase
* Supabase

design_tools:

* Figma

computer_science:
fundamentals:
- data structures and algorithms (DSA)
- algorithmic thinking
- problem solving

developer_tools:
version_control:
- Git
- GitHub
development_environment:
- VS Code
package_managers:
- npm
- pip

visualization:

* data visualization
* algorithm visualization
* interactive visualization systems

areas_of_interest:

* AI systems engineering
* machine learning pipelines
* system architecture
* developer tools
* AR/VR interfaces
* intelligent software systems

currently_exploring:

* AI agents
* vector databases
* distributed systems
* scalable ML pipelines
* immersive interfaces`;


const CURRENTLY_LEARNING_MARKDOWN = `# Currently Learning

This file contains technologies and concepts I am actively exploring as I continue developing my understanding of intelligent software systems and scalable architectures.

---

## AI Agents

Exploring how autonomous systems can perform complex tasks by combining reasoning, planning, and tool usage.

Key areas of interest:

* agent workflows
* task planning
* tool-augmented AI systems
* multi-step reasoning pipelines

These systems are becoming increasingly important for building intelligent software assistants and automation tools.

---

## Vector Databases

Studying how vector embeddings are used to represent unstructured data such as text, images, and code.

Topics being explored:

* embedding generation
* similarity search
* semantic retrieval
* vector indexing

Vector databases are a key component in modern AI applications such as recommendation systems and retrieval-augmented generation.

---

## Scalable Machine Learning Systems

Learning how machine learning models are deployed and maintained in real-world systems.

Focus areas include:

* model deployment pipelines
* data preprocessing pipelines
* model versioning
* inference services

Understanding these systems is important for moving from experimental models to production-ready applications.

---

## Distributed Systems

Exploring how large-scale systems handle reliability, scalability, and high availability.

Topics currently being studied:

* distributed architecture patterns
* service-based systems
* fault tolerance
* load distribution

These concepts are essential for designing systems that operate at scale.

---

## Immersive Interfaces

Experimenting with interactive technologies that combine software engineering with spatial or visual computing.

Areas of exploration include:

* AR/VR interfaces
* interactive 3D environments
* visualization systems
* user interaction design

These technologies offer new ways for users to interact with complex software systems.

---

Learning new technologies is an ongoing process, and most of my learning happens through building projects, experimenting with tools, and analyzing how real-world systems are designed.
`;

const IDEAS_MARKDOWN = `# Project Ideas & Experiments

This file contains product ideas and experiments that I find interesting.
Some of these are early concepts, while others are projects I am actively exploring.

Most ideas revolve around **AI-powered tools, developer platforms, and interactive applications**.

---

# AI & Intelligent Systems

## AI Teaching Assistant

An AI-powered learning platform that helps students study based on their syllabus and exam schedule.

Concept:

* students upload syllabus and exam timeline
* AI generates a structured study plan
* provides notes and learning resources
* adapts learning pace based on progress

Possible features:

* subject-specific tutors
* automated revision plans
* interactive quizzes
* predefined technical courses (e.g. Data Structures)

---

## AI Prompt Optimizer

An AI tool designed to improve prompts using the **ROSES framework**.

Framework structure:

R — Role
O — Objective
S — Scenario
E — Expected Solution
S — Steps

The system would transform vague prompts into structured ones to improve AI responses.

Possible extensions:

* prompt scoring
* prompt templates
* prompt optimization suggestions

---

## AI Fitness Coach

An intelligent fitness assistant that generates personalized training plans.

Inputs:

* height
* weight
* fitness goals
* available workout days
* food preferences

Features:

* custom exercise plans
* diet recommendations
* progress tracking
* adaptive workout difficulty

---

## Jainism Knowledge AI

A specialized AI assistant focused on Jain philosophy and community needs.

Features:

* answers questions from Jain teachings
* explains religious concepts
* shows nearby Jain temples
* helps users find Jain-friendly places to eat or stay
* tracks religious events and important days

---

# Developer Platforms

## Developer Social Network

A platform similar to LinkedIn but designed specifically for developers.

Features:

* developers share personal websites and projects
* follow other developers
* technical discussion forums
* question and answer system
* community groups for different technologies

Goal:
Create a space focused purely on **builders and technical communities**.

---

## Gamified Competitive Programming Platform

A platform that helps users learn competitive programming through **interactive and gamified challenges**.

Concept:

* integrates with Codeforces APIs
* tracks solved problems
* visualizes progress
* introduces gamification elements such as levels and achievements

Possible features:

* daily challenges
* learning paths
* leaderboard systems

---

# Sports & Community Platforms

## Cricket Auction Platform

A web platform that simulates cricket team auctions similar to professional leagues.

Features:

* player pools
* bidding system
* team budget constraints
* real-time auction interface

This could also be used for community tournaments.

---

## Turf Booking & Tournament Platform

A platform for discovering and booking nearby sports turfs.

Features:

* location-based turf discovery
* booking system
* tournament creation tools
* match scheduling
* optional live-streaming integration

---

# Financial & Market Platforms

## Virtual Stock Market Simulator

A stock market learning platform where users trade using **virtual money**.

Purpose:

* help beginners learn stock trading
* simulate real market conditions
* track investment strategies

Possible features:

* portfolio tracking
* risk analysis tools
* trading competitions

---

## Product Trend Discovery AI

An AI system designed to identify trending products for e-commerce and dropshipping.

Concept:

* scrape marketplaces such as Alibaba and Temu
* analyze trending products
* detect category growth patterns
* optionally analyze social media trends

Potential outputs:

* best-selling product lists
* country-specific market trends
* demand predictions

---

# Social Impact Ideas

## Climate Impact Reward System

A platform that rewards users for environmentally friendly actions.

Concept:

* users log eco-friendly activities
* receive reward points
* points can be exchanged for discounts or coupons

Goal:

Encourage people to reduce their environmental impact through **gamification**.

---

# Experimental Projects

## Air Piano

A computer vision experiment where hand movements in front of a camera trigger piano notes.

Concept:

* detect hand positions through webcam
* map positions to musical keys
* simulate piano playing without physical instruments

---

# Education Tools

## Degree & Career Discovery Platform

A platform designed for students who are unsure about which degree or field to pursue.

Features:

* information about different degree programs
* college listings
* answers to common student questions
* career pathway explanations

Goal:

Help students make more informed education decisions.
`;


const CONTACT_JSON = `{
"name": "Manas Shah",
"location": "Mumbai, India",
"contact": {
"email": "[manasshah1210@gmail.com](mailto:manasshah1210@gmail.com)"
},
"profiles": {
"github": "https://github.com/manasshah1810",
"linkedin": "https://www.linkedin.com/in/manasshah1007"
},
"open_to": [
"AI/ML internships",
"software engineering internships",
"collaborative technical projects",
"open-source contributions"
],
"preferred_contact": "email"
}`;


const VSCode: React.FC = () => {
    const [isExplorerExpanded, setIsExplorerExpanded] = useState(true);
    const [isTerminalOpen, setIsTerminalOpen] = useState(false);
    const [isSourceOpen, setIsSourceOpen] = useState(false);
    const [activeFile, setActiveFile] = useState('About me.md');

    const activeMarkdown = activeFile === 'About me.md' ? ABOUT_ME_MARKDOWN : activeFile === 'projects.md' ? PROJECTS_MARKDOWN : activeFile === 'system-design.md' ? SYSTEM_DESIGN_MARKDOWN : activeFile === 'tech-stack.yaml' ? TECH_STACK_YAML : activeFile === 'currently-learning.md' ? CURRENTLY_LEARNING_MARKDOWN : activeFile === 'ideas.md' ? IDEAS_MARKDOWN : CONTACT_JSON;
    const lines = activeMarkdown.split('\n');

    return (
        <div className="vscode-container">
            {/* ── Title Bar ── */}
            <div className="vscode-titlebar">
                <div className="titlebar-left">
                    <span>File</span>
                    <span>Edit</span>
                    <span>Selection</span>
                    <span>View</span>
                    <span onClick={() => setIsTerminalOpen(!isTerminalOpen)} style={{ cursor: "pointer" }}>Terminal</span>
                </div>
                <div className="titlebar-center">
                    <div className="vscode-search-bar">
                        <Search size={14} />
                        <span>vscode</span>
                    </div>
                </div>
                <div className="titlebar-right">
                    <Layout size={16} />
                    <Split size={16} onClick={() => setIsSourceOpen(!isSourceOpen)} style={{ cursor: 'pointer' }} />
                    <MoreHorizontal size={16} />
                </div>
            </div>

            <div className="vscode-main">
                {/* ── Activity Bar ── */}
                <aside className="activity-bar">
                    <Files className={`activity-icon ${isSourceOpen ? 'active' : ''}`} size={24} onClick={() => setIsSourceOpen(!isSourceOpen)} style={{ cursor: 'pointer' }} />
                    <Search className="activity-icon" size={24} />
                    <GitBranch className="activity-icon" size={24} />
                    <Play className="activity-icon" size={24} />
                    <Blocks className="activity-icon" size={24} />
                    <div style={{ flex: 1 }} />
                    <UserCircle className="activity-icon" size={24} />
                    <Settings className="activity-icon" size={24} />
                </aside>

                {/* ── Sidebar ── */}
                <aside className="vscode-sidebar">
                    <div className="sidebar-header">
                        EXPLORER
                        <MoreHorizontal size={16} />
                    </div>
                    <div className="sidebar-section">
                        <div className="section-title" onClick={() => setIsExplorerExpanded(!isExplorerExpanded)}>
                            {isExplorerExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                            VSCODE
                        </div>
                        {isExplorerExpanded && (
                            <div className="file-tree">
                                <div
                                    className={`tree-item ${activeFile === 'About me.md' ? 'active' : ''}`}
                                    onClick={() => setActiveFile('About me.md')}
                                >
                                    <FileText size={16} color="#519aba" />
                                    About me.md
                                </div>
                                <div
                                    className={`tree-item ${activeFile === 'projects.md' ? 'active' : ''}`}
                                    onClick={() => setActiveFile('projects.md')}
                                >
                                    <FileText size={16} color="#519aba" />
                                    projects.md
                                </div>
                                <div
                                    className={`tree-item ${activeFile === 'system-design.md' ? 'active' : ''}`}
                                    onClick={() => setActiveFile('system-design.md')}
                                >
                                    <FileText size={16} color="#519aba" />
                                    system-design.md
                                </div>
                                <div
                                    className={`tree-item ${activeFile === 'tech-stack.yaml' ? 'active' : ''}`}
                                    onClick={() => setActiveFile('tech-stack.yaml')}
                                >
                                    <Code2 size={16} color="#519aba" />
                                    tech-stack.yaml
                                </div>
                                <div
                                    className={`tree-item ${activeFile === 'currently-learning.md' ? 'active' : ''}`}
                                    onClick={() => setActiveFile('currently-learning.md')}
                                >
                                    <FileText size={16} color="#519aba" />
                                    currently-learning.md
                                </div>
                                <div
                                    className={`tree-item ${activeFile === 'ideas.md' ? 'active' : ''}`}
                                    onClick={() => setActiveFile('ideas.md')}
                                >
                                    <FileText size={16} color="#519aba" />
                                    ideas.md
                                </div>
                                <div
                                    className={`tree-item ${activeFile === 'contact.json' ? 'active' : ''}`}
                                    onClick={() => setActiveFile('contact.json')}
                                >
                                    <Code2 size={16} color="#519aba" />
                                    contact.json
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="sidebar-section">
                        <div className="section-title">
                            <ChevronRight size={14} />
                            OUTLINE
                        </div>
                    </div>
                    <div className="sidebar-section">
                        <div className="section-title">
                            <ChevronRight size={14} />
                            TIMELINE
                        </div>
                    </div>
                </aside>

                {/* ── Editor Area ── */}
                <main className="vscode-editor-area">
                    <div className="editor-tabs">
                        <div
                            className={`editor-tab ${activeFile === 'About me.md' ? 'active' : ''}`}
                            onClick={() => setActiveFile('About me.md')}
                        >
                            <FileText size={14} color="#519aba" />
                            About me.md
                            <X size={14} className="tab-close" />
                        </div>
                        <div
                            className={`editor-tab ${activeFile === 'projects.md' ? 'active' : ''}`}
                            onClick={() => setActiveFile('projects.md')}
                        >
                            <FileText size={14} color="#519aba" />
                            projects.md
                            <X size={14} className="tab-close" />
                        </div>
                        <div
                            className={`editor-tab ${activeFile === 'system-design.md' ? 'active' : ''}`}
                            onClick={() => setActiveFile('system-design.md')}
                        >
                            <FileText size={14} color="#519aba" />
                            system-design.md
                            <X size={14} className="tab-close" />
                        </div>
                        <div
                            className={`editor-tab ${activeFile === 'tech-stack.yaml' ? 'active' : ''}`}
                            onClick={() => setActiveFile('tech-stack.yaml')}
                        >
                            <Code2 size={14} color="#519aba" />
                            tech-stack.yaml
                            <X size={14} className="tab-close" />
                        </div>
                        <div
                            className={`editor-tab ${activeFile === 'currently-learning.md' ? 'active' : ''}`}
                            onClick={() => setActiveFile('currently-learning.md')}
                        >
                            <FileText size={14} color="#519aba" />
                            currently-learning.md
                            <X size={14} className="tab-close" />
                        </div>
                        <div
                            className={`editor-tab ${activeFile === 'ideas.md' ? 'active' : ''}`}
                            onClick={() => setActiveFile('ideas.md')}
                        >
                            <FileText size={14} color="#519aba" />
                            ideas.md
                            <X size={14} className="tab-close" />
                        </div>
                        <div
                            className={`editor-tab ${activeFile === 'contact.json' ? 'active' : ''}`}
                            onClick={() => setActiveFile('contact.json')}
                        >
                            <Code2 size={14} color="#519aba" />
                            contact.json
                            <X size={14} className="tab-close" />
                        </div>
                    </div>

                    <div className="editor-breadcrumbs">
                        <span className="breadcrumb-item">src</span>
                        <ChevronRight size={12} />
                        <span className="breadcrumb-item">docs</span>
                        <ChevronRight size={12} />
                        <span className="breadcrumb-item">{activeFile}</span>
                    </div>

                    <div className="editor-split">
                        {/* Source View */}
                        {isSourceOpen && (
                            <div className="source-view">
                                <div className="line-numbers">
                                    {lines.map((_, i) => (
                                        <div key={i}>{i + 1}</div>
                                    ))}
                                </div>
                                <div className="source-content">
                                    {lines.map((line, i) => (
                                        <div key={i}>{line || ' '}</div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Preview View */}
                        <div className="preview-view">
                            <div className="preview-content">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {activeFile.endsWith('.yaml') ? `\`\`\`yaml\n${activeMarkdown}\n\`\`\`` : activeFile.endsWith('.json') ? `\`\`\`json\n${activeMarkdown}\n\`\`\`` : activeMarkdown}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>

                    {/* ── Bottom Panel ── */}
                    {isTerminalOpen && (
                        <div className="bottom-panel">
                            <div className="panel-tabs">
                                <div className="panel-tab">PROBLEMS</div>
                                <div className="panel-tab">OUTPUT</div>
                                <div className="panel-tab active">TERMINAL</div>
                                <div className="panel-tab">PORTS</div>
                            </div>
                            <div className="panel-layout">
                                <div className="panel-content">
                                    <div className="terminal-text">
                                        {`-a----        2/8/2024   2:44 PM           9749 package.json
-a----        2/8/2024   2:44 PM           3185 product.json
-a----       12/20/2023  11:33 AM          6939 README.md
-a----       12/20/2023  11:33 AM          2807 SECURITY.md

C:\\code\\vscode [main *] > `}
                                        <span className="cursor" />
                                    </div>
                                </div>
                                <div className="panel-right-indicator">
                                    <div className="panel-d-badge">D</div>
                                    <span>Panel</span>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>

        </div>
    );
};

export default VSCode;
