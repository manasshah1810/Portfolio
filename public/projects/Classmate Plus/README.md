# HackNova

HackNova is a specialized educational platform designed to bridge the accessibility gap for students with ADHD and visual impairments. By providing tailored user experiences, the platform ensures that education is inclusive and effective for everyone.

## Problem

Traditional educational environments and digital learning platforms often fail to accommodate neurodivergent and visually impaired students. Complex layouts, excessive visual noise, and a lack of robust screen-reader support contribute to cognitive overload for ADHD students and complete exclusion for those with visual impairments. There is a critical need for an educational interface that can adapt to these specific sensory and cognitive requirements.

## Solution

The system features two primary modes of interaction:

1. ADHD-Friendly Interface: A minimalist design using a Sage Green and Off-White color palette to reduce anxiety. It includes Focus Mode and Reader View to eliminate distractions and help students maintain concentration.

2. Blind Assistive Voice OS: A voice-first navigation layer that allows visually impaired students to join classes, interact with content, and take tests entirely through voice commands. The system includes an audio MCQ engine and a hybrid Voice-to-Text engine for written assignments.

## Tech Stack

- Frontend: React with Vite for high-performance rendering and HMR.
- State Management: React Context API and Hooks.
- Backend and Database: Firebase Firestore for real-time data storage and Firebase Web Auth.
- Artificial Intelligence: Google Gemini API and OpenAI for intelligent content processing and assistive interaction.
- Styling and Animation: Framer Motion for smooth transitions and Vanilla CSS for precise control.
- Document Processing: PDF.js for intelligent PDF reading and text extraction.
- Icons: Lucide React for accessible, high-quality iconography.

## Key Idea

The core innovation lies in the integration of a seamless Voice OS layer that operates as a wrapper around the web application. Unlike standard screen readers, this Voice OS provides a context-aware, interactive experience where students can "Ask AI" about specific parts of a document or navigate complex dashboards using natural language processing, making the web feel like a dedicated assistive device.

## Impact

The project has demonstrated significant results in accessibility and focus:
- ADHD Focus: Students report higher retention rates when using the clutter-free Focus Mode.
- Full Inclusion: Visually impaired students can perform 100% of educational tasks, from enrollment to final exams, without needing a sighted assistant.
- Unified Platform: Teachers can create one set of materials that the platform automatically adapts for both ADHD-friendly visual output and voice-assistive audio output.

## Team Members

- Bhakti Rathod
- Kathan Talati
- Meet Makwana
