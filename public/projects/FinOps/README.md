# Health Insights - Healthcare Payer Operations Platform

## Problem
Healthcare payer operations face significant challenges in identifying risk adjustment gaps and managing revenue leakage. Manual processes for detecting uncoded conditions are inefficient, error-prone, and lack the real-time synthesis needed to make informed financial and compliance decisions.

## Why this project exists
This project was developed to bridge the gap between medical claims data and actionable operational intelligence. It provides a production-quality framework for insurance payers to monitor member health trends, simulate financial outcomes, and automate the identification of hierarchical condition category (HCC) suspects.

## Solution
The platform features a multi-agent orchestration layer that integrates clinical risk analysis with financial impact assessments and compliance validation. By providing a unified dashboard for MLR tracking, risk exploration, and executive decision-making, it transforms raw data into a strategic asset.

## What system you built
A full-stack web application consisting of a React-based frontend and a Node.js backend. The system includes:
- An Executive Dashboard for real-time monitoring of Payer KPIs.
- A Multi-Agent System coordinating Risk, Finance, and Compliance agents.
- A What-If Simulation Engine for financial modeling.
- An Executive Chat interface for natural language data querying.

## Tech Stack
- Frontend: React, Vite, Tailwind CSS, Recharts
- Backend: Node.js, Express
- AI/ML: Custom multi-agent orchestration with OpenRouter LLM integration
- Data: High-fidelity synthetic claims and member datasets processed in-memory

## Key Idea
The interesting part is the agentic orchestration workflow. Instead of flat data views, the system uses specialized agents to interpret medical evidence. The Risk Agent flags potential gaps, the Finance Agent calculates the exact dollar value of those gaps, and the Compliance Agent ensures all findings meet regulatory documentation standards.

## Impact
- Identified significant Suspect RAF Uplift and potential revenue recovery opportunities.
- Provided clear visibility into Risk-Adjusted MLR, moving beyond traditional raw claims metrics.
- Enabled operational teams to perform complex financial simulations with near-instant feedback.
- Automated the vetting of clinical findings, reducing manual review time while maintaining high compliance cleared rates.
