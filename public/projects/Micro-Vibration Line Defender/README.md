# Micro-Vibration Line Defender

Micro-Vibration Line Defender is an Edge Analytics and Visualization Platform designed to detect early-stage machine failures using high-frequency vibration data. The platform enables industrial operators to visualize vibration signals, identify anomalies, and assess machine health through AI-driven analysis.

## Problem

Manufacturing machines rely on critical rotating components such as bearings, motors, shafts, and gearboxes. Failures in these components often occur without visible warning, leading to severe operational and financial consequences.

Key Challenges:
* Unplanned downtime can stop production lines for hours or days, costing between $50,000 and $500,000 per incident.
* Traditional monitoring methods often detect issues too late to prevent catastrophic failure.
* High-frequency vibration data is extremely difficult to interpret manually without specialized expertise.
* Most existing predictive maintenance systems require expensive, proprietary hardware installations, creating a high barrier to entry for many companies.

## Solution

The platform provides a web-based vibration analytics and anomaly detection system that works with both simulated and customer-provided datasets. It bridges the gap between raw sensor data and actionable maintenance insights.

What we built:
* A high-performance dashboard for real-time vibration waveform and FFT frequency spectrum visualization.
* An automated anomaly detection engine that identifies abnormal mechanical behavior early in the failure cycle.
* A machine health scoring system (0-100) that provides a simple, color-coded indicator of equipment condition.
* A flexible data ingestion system supporting both mock simulation modes and CSV uploads for real-world analysis.
* A dual-mode interface that allows users to switch between demonstration data and their own uploaded datasets seamlessly.

## Tech Stack

The architecture is built on a modern, serverless, and "database-less" philosophy to ensure scalability and speed.

* Frontend: Next.js 14, TypeScript, Tailwind CSS, ShadCN UI, Framer Motion.
* Backend: Next.js API Routes (Serverless Functions).
* Authentication: Firebase Authentication (Google and Email/Password).
* Storage: Firebase Storage (File-based storage for CSV and JSON datasets).
* AI Inference: OpenRouter API (Integration with LLMs for anomaly interpretation).
* Signal Processing: Node.js (PapaParse) and Python (NumPy, SciPy, Pandas).
* Visualization: Recharts and ECharts for high-frequency data rendering.

## Key Idea

The interesting part of this project is its "Inference-First" architecture. Unlike traditional predictive maintenance systems that require training heavy local ML models on specific machine types, our system extracts fundamental vibration features (RMS, Peak, FFT Peaks) and uses advanced LLMs via OpenRouter to interpret these features in context.

By treating vibration data as a signal-processing-to-text-insight problem, we eliminate the need for traditional database maintenance and expensive model training, allowing for a completely stateless and highly scalable analysis pipeline.

## Impact

The Micro-Vibration Line Defender transforms how maintenance teams interact with machine data.

* Early Warning: Identifies mechanical degradation weeks before actual failure occurs.
* Cost Reduction: Significantly reduces unplanned downtime costs by enabling scheduled, proactive repairs.
* Accessibility: Removes the need for expensive hardware trials by allowing customers to test the system with their own CSV data instantly.
* Dashboard Clarity: Simplifies complex vibrational physics into intuitive health scores and visual patterns that any operator can understand.
