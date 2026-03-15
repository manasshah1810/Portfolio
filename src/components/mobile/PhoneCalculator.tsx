"use client";

import React, { useState, useRef } from "react";
import "./phone-calculator.css";

const PhoneCalculator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
    const [display, setDisplay] = useState("0");
    const [prevValue, setPrevValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);

    // Swipe to home (High-fidelity implementation)
    const [dragY, setDragY] = useState(0);
    const [isClosing, setIsClosing] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const touchStartY = useRef(0);
    const lastTouchY = useRef(0);
    const lastTouchTime = useRef(0);
    const velocity = useRef(0);

    const handleTouchStart = (e: React.TouchEvent) => {
        touchStartY.current = e.touches[0].clientY;
        lastTouchY.current = e.touches[0].clientY;
        lastTouchTime.current = Date.now();
        setIsActive(true);
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        const currentY = e.touches[0].clientY;
        const currentTime = Date.now();
        const dy = currentY - touchStartY.current;

        const dt = currentTime - lastTouchTime.current;
        if (dt > 0) {
            velocity.current = (currentY - lastTouchY.current) / dt;
        }

        // Only allow upward swipe from bottom area or if already dragging
        if (dy < 0 && (touchStartY.current > window.innerHeight - 100 || dragY < 0)) {
            setDragY(dy);
            if (e.cancelable) e.preventDefault();
        }

        lastTouchY.current = currentY;
        lastTouchTime.current = currentTime;
    };

    const handleTouchEnd = () => {
        setIsActive(false);
        const threshold = -window.innerHeight * 0.2;
        const fastSwipe = velocity.current < -0.5;

        if (dragY < threshold || fastSwipe) {
            setIsClosing(true);
            setTimeout(() => onBack(), 300);
        } else {
            setDragY(0);
        }
    };

    const shrinkScale = Math.max(0.85, 1 + (dragY / window.innerHeight) * 0.4);
    const shrinkRadius = Math.min(40, (dragY / -200) * 40);

    // ── Calculator Logic ──────────────────────────────────────────
    const inputDigit = (digit: string) => {
        if (waitingForOperand) {
            setDisplay(digit);
            setWaitingForOperand(false);
        } else {
            setDisplay(display === "0" ? digit : display + digit);
        }
    };

    const inputDot = () => {
        if (waitingForOperand) {
            setDisplay("0.");
            setWaitingForOperand(false);
        } else if (!display.includes(".")) {
            setDisplay(display + ".");
        }
    };

    const clearAll = () => {
        setDisplay("0");
        setPrevValue(null);
        setOperator(null);
        setWaitingForOperand(false);
    };

    const toggleSign = () => {
        setDisplay((parseFloat(display) * -1).toString());
    };

    const inputPercent = () => {
        const value = parseFloat(display);
        setDisplay((value / 100).toString());
    };

    const calculate = (prev: number, next: number, op: string): number => {
        switch (op) {
            case "÷": return prev / next;
            case "×": return prev * next;
            case "−": return prev - next;
            case "+": return prev + next;
            default: return next;
        }
    };

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display);
        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operator) {
            const newValue = calculate(prevValue, inputValue, operator);
            setPrevValue(newValue);
            setDisplay(formatDisplay(newValue));
        }
        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const handleEquals = () => {
        const inputValue = parseFloat(display);
        if (operator && prevValue !== null) {
            const newValue = calculate(prevValue, inputValue, operator);
            setDisplay(formatDisplay(newValue));
            setPrevValue(null);
            setOperator(null);
            setWaitingForOperand(false);
        }
    };

    const formatDisplay = (num: number): string => {
        if (isNaN(num)) return "Error";
        if (!isFinite(num)) return "Error";
        if (Number.isInteger(num)) return num.toLocaleString("en-US");
        return num.toString();
    };

    const getFormattedDisplay = () => {
        const num = parseFloat(display);
        if (isNaN(num)) return display;
        if (Number.isInteger(num) && !display.includes(".")) {
            return parseInt(display, 10).toLocaleString("en-US");
        }
        return display;
    };

    const displayText = getFormattedDisplay();
    const fontSize = displayText.length > 9 ? "48px" : displayText.length > 6 ? "64px" : "80px";

    return (
        <div
            className={`phone-calc-overlay ${isClosing ? "pcalc-closing" : ""}`}
            style={{
                transform: isClosing
                    ? `translateY(-20%) scale(0.3) opacity(0)`
                    : `translateY(${dragY}px) scale(${shrinkScale})`,
                borderRadius: isClosing ? '50px' : `${shrinkRadius}px`,
                transition: isClosing
                    ? 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
                    : isActive ? 'none' : 'all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
            }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            {/* Swipe hint pill at bottom — like iOS home indicator */}
            <div className="pf-home-indicator-wrap">
                <div className="pf-home-indicator" />
            </div>

            <div className="phone-calc-container">
                {/* Display */}
                <div className="phone-calc-display">
                    <div className="phone-calc-number" style={{ fontSize }}>
                        {displayText}
                    </div>
                </div>

                {/* Keypad */}
                <div className="phone-calc-keypad">
                    {/* Row 1 */}
                    <button className="pcalc-btn pcalc-func" onClick={clearAll}>
                        {display === "0" && !prevValue ? "AC" : "C"}
                    </button>
                    <button className="pcalc-btn pcalc-func" onClick={toggleSign}>+/−</button>
                    <button className="pcalc-btn pcalc-func" onClick={inputPercent}>%</button>
                    <button className={`pcalc-btn pcalc-op ${operator === "÷" && waitingForOperand ? "pcalc-op-active" : ""}`} onClick={() => performOperation("÷")}>÷</button>

                    {/* Row 2 */}
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("7")}>7</button>
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("8")}>8</button>
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("9")}>9</button>
                    <button className={`pcalc-btn pcalc-op ${operator === "×" && waitingForOperand ? "pcalc-op-active" : ""}`} onClick={() => performOperation("×")}>×</button>

                    {/* Row 3 */}
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("4")}>4</button>
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("5")}>5</button>
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("6")}>6</button>
                    <button className={`pcalc-btn pcalc-op ${operator === "−" && waitingForOperand ? "pcalc-op-active" : ""}`} onClick={() => performOperation("−")}>−</button>

                    {/* Row 4 */}
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("1")}>1</button>
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("2")}>2</button>
                    <button className="pcalc-btn pcalc-digit" onClick={() => inputDigit("3")}>3</button>
                    <button className={`pcalc-btn pcalc-op ${operator === "+" && waitingForOperand ? "pcalc-op-active" : ""}`} onClick={() => performOperation("+")}>+</button>

                    {/* Row 5 */}
                    <button className="pcalc-btn pcalc-digit pcalc-zero" onClick={() => inputDigit("0")}>0</button>
                    <button className="pcalc-btn pcalc-digit" onClick={inputDot}>.</button>
                    <button className="pcalc-btn pcalc-op" onClick={handleEquals}>=</button>
                </div>
            </div>
        </div>
    );
};

export default PhoneCalculator;
