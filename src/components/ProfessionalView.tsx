"use client";

import React from "react";
import "./professional-view.css";

interface ProfessionalViewProps {
    onBack: () => void;
}

const ProfessionalView: React.FC<ProfessionalViewProps> = ({ onBack }) => {
    return (
        <div className="pv-container">
            <div className="pv-grid" />
            <div className="pv-background">
                <div className="pv-orb pv-orb-1" />
                <div className="pv-orb pv-orb-2" />
                <div className="pv-orb pv-orb-3" />
            </div>

            <div className="pv-content">
                <div className="pv-badge">Coming Soon</div>
                <h1 className="pv-title">PROFESSIONAL<br />VIEW</h1>
                <p className="pv-subtitle">
                    A high-performance workspace designed for industry standards.
                    We're currently architecting a refined experience that brings together
                    system precision and executive clarity.
                </p>
                <button className="pv-btn" onClick={onBack}>
                    Go Back to Portfolio
                </button>
            </div>
        </div>
    );
};

export default ProfessionalView;
