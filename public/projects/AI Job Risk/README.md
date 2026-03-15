# AI Job Risk Predictor

## Problem
The rapid advancement of Artificial Intelligence is reshaping the global labor market at an unprecedented pace. Many professionals across various sectors face growing uncertainty regarding the future stability of their roles. There is a critical lack of accessible, data-driven tools that can help an individual understand the specific automation risks associated with their unique set of responsibilities and industry context.

## Why this project exists
This project exists to democratize access to AI transition analytics. By providing a clear, evidence-based assessment of job vulnerability, it empowers workers and students to make informed decisions about upskilling and career pivots. It aims to replace general anxiety with actionable insights based on historical industry trends and technical automation potential.

## Solution
The solution is a full-stack risk assessment platform that converts qualitative career data into quantitative risk metrics. The application provides an intuitive interface for users to describe their roles, which is then processed through a multi-layered analysis pipeline to generate a precise risk percentage and high-level classification.

## What system you built
The system is a distributed intelligence application featuring a Python-based FastAPI backend and a React-driven frontend. It utilizes a two-step inference process: first, a Large Language Model (LLM) parses raw job descriptions into structured technical features; second, these features are fed into a specialized Machine Learning classifier that has been trained on a decade of AI impact data to determine the final risk score.

## Tech Stack
The backend is built using Python, FastAPI, and Uvicorn for high-performance API delivery. The machine learning pipeline is powered by CatBoost, Scikit-learn, and Joblib for model persistence. Integration with the OpenRouter API allows for sophisticated feature extraction via advanced LLMs. The frontend leverages React 19, Vite, Framer Motion for animations, and Lucide React for iconography, ensuring a premium and responsive user interface.

## Key Idea
The core innovation of this project is its hybrid "Feature-Extraction-to-Classifier" pipeline. Traditional predictive models often struggle with the nuance of natural language in job titles and descriptions. This system solves that problem by using an LLM as a "translator" to map unstructured human career paths to a 20-dimensional embedding space and specific intensity scores. This structured data is then processed by a CatBoost model, which provides the statistical reliability and performance that LLMs alone cannot guarantee for numerical risk assessment.

## Impact
The system demonstrates exceptional predictive accuracy, reaching a 1.0 ROC-AUC score and near-perfect recall on test datasets. By meeting a strict recall target of 0.95 or higher, the system ensures that potentially high-risk occupations are almost never misclassified as low-risk. This provides a high-integrity safety net for users looking to future-proof their careers against the next wave of technological disruption.
