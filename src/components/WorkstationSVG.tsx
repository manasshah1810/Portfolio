"use client";

import React from "react";

export default function WorkstationSVG() {
    return (
        <div className="workstation-svg-wrapper">
            <img
                src="/workstation.svg"
                alt="Futuristic isometric developer workstation illustration"
                width={900}
                height={1000}
                style={{ width: "100%", height: "auto", maxWidth: "700px" }}
            />
        </div>
    );
}
