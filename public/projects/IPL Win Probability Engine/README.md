# IPL Win Probability Engine

## Problem
Cricket, particularly the T20 format in the IPL, is a dynamic sport where momentum shifts rapidly. Traditional statistics often fail to capture the real-time pressure and the impact of venue-specific conditions on the outcome of a match. Fans and analysts need a way to quantify these shifts using data rather than just intuition.

## Solution
The IPL Win Probability Engine is a sophisticated predictive analytics system designed to calculate the win probability of the team batting second in real-time. By processing live match states, the system provides a ball-by-ball analysis of which team holds the advantage at any given moment.

## Tech Stack
- **Programming Languages**: Python, JavaScript
- **Machine Learning Libraries**: XGBoost, Scikit-learn, Pandas, NumPy
- **Backend Framework**: FastAPI, Uvicorn
- **Frontend Tools**: React.js, Vite, Streamlit
- **Data Visualization**: Plotly, Mermaid.js
- **Model Management**: Joblib for serialization and persistence

## Key Idea
The core innovation of this project lies in its feature engineering. Instead of relying solely on raw score data, the engine implements:
- **Relative Score Analysis**: It compares the current score against historical "par scores" for the specific venue at that exact point in the match.
- **Momentum Tracking**: It calculates performance metrics over the last 30 deliveries (runs made and wickets lost) to capture the current "flow" of the game.
- **Venue Context**: It factors in the unique characteristics of different stadiums, recognizing that a score of 160 might be winning at one ground but losing at another.

## Impact
The engine delivers high-precision win/loss probabilities that adapt to every delivery. This allows for:
- Detailed sports analysis backed by quantitative data.
- Enhanced fan engagement through real-time predictive visuals.
- A deeper understanding of "clutch" moments where win probability swings dramatically.
- Data-driven narratives for broadcasters and analysts during live matches.
