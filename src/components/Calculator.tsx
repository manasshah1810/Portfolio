"use client";

import React, { useState, useEffect } from "react";
import "./calculator.css";

const Calculator: React.FC<{ isMaximized?: boolean }> = ({ isMaximized }) => {
    const [display, setDisplay] = useState("0");
    const [prevValue, setPrevValue] = useState<number | null>(null);
    const [operator, setOperator] = useState<string | null>(null);
    const [waitingForOperand, setWaitingForOperand] = useState(false);
    const [memory, setMemory] = useState(0);

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

    const performOperation = (nextOperator: string) => {
        const inputValue = parseFloat(display);

        if (prevValue === null) {
            setPrevValue(inputValue);
        } else if (operator) {
            const currentValue = prevValue || 0;
            const newValue = calculate(currentValue, inputValue, operator);
            setPrevValue(newValue);
            setDisplay(newValue.toString());
        }

        setWaitingForOperand(true);
        setOperator(nextOperator);
    };

    const calculate = (prev: number, next: number, op: string) => {
        switch (op) {
            case "÷": return prev / next;
            case "×": return prev * next;
            case "-": return prev - next;
            case "+": return prev + next;
            case "xʸ": return Math.pow(prev, next);
            case "ʸ√x": return Math.pow(prev, 1 / next);
            default: return next;
        }
    };

    const handleEquals = () => {
        const inputValue = parseFloat(display);
        if (operator && prevValue !== null) {
            const newValue = calculate(prevValue, inputValue, operator);
            setDisplay(newValue.toString());
            setPrevValue(null);
            setOperator(null);
            setWaitingForOperand(false);
        }
    };

    // Scientific Functions
    const sciFunc = (func: string) => {
        const val = parseFloat(display);
        let result = val;
        switch (func) {
            case "x²": result = val * val; break;
            case "x³": result = val * val * val; break;
            case "eˣ": result = Math.exp(val); break;
            case "10ˣ": result = Math.pow(10, val); break;
            case "1/x": result = 1 / val; break;
            case "²√x": result = Math.sqrt(val); break;
            case "³√x": result = Math.cbrt(val); break;
            case "ln": result = Math.log(val); break;
            case "log₁₀": result = Math.log10(val); break;
            case "sin": result = Math.sin(val); break;
            case "cos": result = Math.cos(val); break;
            case "tan": result = Math.tan(val); break;
            case "sinh": result = Math.sinh(val); break;
            case "cosh": result = Math.cosh(val); break;
            case "tanh": result = Math.tanh(val); break;
            case "e": result = Math.E; break;
            case "π": result = Math.PI; break;
            case "Rand": result = Math.random(); break;
            case "x!":
                let f = 1;
                for (let i = 1; i <= val; i++) f *= i;
                result = f;
                break;
        }
        setDisplay(result.toString());
        setWaitingForOperand(true);
    };

    return (
        <div className={`calculator ${isMaximized ? "scientific" : "basic"}`}>
            <div className="calc-display">
                <div className="display-text">{display}</div>
            </div>
            <div className="calc-keypad">
                {isMaximized && (
                    <>
                        <button className="key sci" onClick={() => { }}>(</button>
                        <button className="key sci" onClick={() => { }}>)</button>
                        <button className="key sci" onClick={() => setMemory(0)}>mc</button>
                        <button className="key sci" onClick={() => setMemory(memory + parseFloat(display))}>m+</button>
                        <button className="key sci" onClick={() => setMemory(memory - parseFloat(display))}>m-</button>
                        <button className="key sci" onClick={() => setDisplay(memory.toString())}>mr</button>
                    </>
                )}

                <button className={`key function ${isMaximized ? "sci-gray" : ""}`} onClick={clearAll}>{display === "0" ? "AC" : "C"}</button>
                <button className={`key function ${isMaximized ? "sci-gray" : ""}`} onClick={toggleSign}>±</button>
                <button className={`key function ${isMaximized ? "sci-gray" : ""}`} onClick={inputPercent}>%</button>
                <button className={`key operator ${operator === "÷" ? "active" : ""}`} onClick={() => performOperation("÷")}>÷</button>

                {isMaximized && (
                    <>
                        <button className="key sci" onClick={() => { }}>2ⁿᵈ</button>
                        <button className="key sci" onClick={() => sciFunc("x²")}>x²</button>
                        <button className="key sci" onClick={() => sciFunc("x³")}>x³</button>
                        <button className="key sci" onClick={() => performOperation("xʸ")}>xʸ</button>
                        <button className="key sci" onClick={() => sciFunc("eˣ")}>eˣ</button>
                        <button className="key sci" onClick={() => sciFunc("10ˣ")}>10ˣ</button>
                    </>
                )}

                <button className="key digit" onClick={() => inputDigit("7")}>7</button>
                <button className="key digit" onClick={() => inputDigit("8")}>8</button>
                <button className="key digit" onClick={() => inputDigit("9")}>9</button>
                <button className={`key operator ${operator === "×" ? "active" : ""}`} onClick={() => performOperation("×")}>×</button>

                {isMaximized && (
                    <>
                        <button className="key sci" onClick={() => sciFunc("1/x")}>1/x</button>
                        <button className="key sci" onClick={() => sciFunc("²√x")}>²√x</button>
                        <button className="key sci" onClick={() => sciFunc("³√x")}>³√x</button>
                        <button className="key sci" onClick={() => performOperation("ʸ√x")}>ʸ√x</button>
                        <button className="key sci" onClick={() => sciFunc("ln")}>ln</button>
                        <button className="key sci" onClick={() => sciFunc("log₁₀")}>log₁₀</button>
                    </>
                )}

                <button className="key digit" onClick={() => inputDigit("4")}>4</button>
                <button className="key digit" onClick={() => inputDigit("5")}>5</button>
                <button className="key digit" onClick={() => inputDigit("6")}>6</button>
                <button className={`key operator ${operator === "-" ? "active" : ""}`} onClick={() => performOperation("-")}>-</button>

                {isMaximized && (
                    <>
                        <button className="key sci" onClick={() => sciFunc("x!")}>x!</button>
                        <button className="key sci" onClick={() => sciFunc("sin")}>sin</button>
                        <button className="key sci" onClick={() => sciFunc("cos")}>cos</button>
                        <button className="key sci" onClick={() => sciFunc("tan")}>tan</button>
                        <button className="key sci" onClick={() => sciFunc("e")}>e</button>
                        <button className="key sci" onClick={() => sciFunc("EE")}>EE</button>
                    </>
                )}

                <button className="key digit" onClick={() => inputDigit("1")}>1</button>
                <button className="key digit" onClick={() => inputDigit("2")}>2</button>
                <button className="key digit" onClick={() => inputDigit("3")}>3</button>
                <button className={`key operator ${operator === "+" ? "active" : ""}`} onClick={() => performOperation("+")}>+</button>

                {isMaximized && (
                    <>
                        <button className="key sci" onClick={() => { }}>Rad</button>
                        <button className="key sci" onClick={() => sciFunc("sinh")}>sinh</button>
                        <button className="key sci" onClick={() => sciFunc("cosh")}>cosh</button>
                        <button className="key sci" onClick={() => sciFunc("tanh")}>tanh</button>
                        <button className="key sci" onClick={() => sciFunc("π")}>π</button>
                        <button className="key sci" onClick={() => sciFunc("Rand")}>Rand</button>
                    </>
                )}

                <button className="key digit zero" onClick={() => inputDigit("0")}>0</button>
                <button className="key digit" onClick={inputDot}>.</button>
                <button className="key operator" onClick={handleEquals}>=</button>
            </div>
        </div>
    );
};

export default Calculator;
