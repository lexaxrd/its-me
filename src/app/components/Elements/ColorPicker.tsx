"use client";

import { useState, useEffect, useRef } from "react";
import { HexColorPicker } from "react-colorful";

type ColorPickerProps = {
    color?: string
    onChange?: (newColor: string) => void
}

export default function ColorPicker({ color = "#3498db", onChange }: ColorPickerProps) {
    const [hex, setHex] = useState<string>(normalizeToHex(color));
    const [alpha, setAlpha] = useState<number>(1);
    const [open, setOpen] = useState<boolean>(false);
    const pickerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(e: MouseEvent) {
            if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
                setOpen(false);
            }
        }
        if (open) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [open]);


    function rgbaFromHex(h: string, a: number) {
        const r = parseInt(h.slice(1, 3), 16);
        const g = parseInt(h.slice(3, 5), 16);
        const b = parseInt(h.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${Number(a.toFixed(2))})`;
    }
    function handleChange(newColor: string) {
        setHex(newColor);
        onChange?.(alpha >= 1 ? newColor : rgbaFromHex(newColor, alpha));
    }


    return (
        <div style={{ position: "relative" }} ref={pickerRef}>
            <div
                onClick={() => setOpen(!open)}
                style={{
                    cursor: "pointer",
                    background: `
                        linear-gradient(${rgbaFromHex(hex, alpha)}, ${rgbaFromHex(hex, alpha)}),
                        repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 20px 20px
                    `,
                    height: "120px",
                    border: "1px solid rgba(0,0,0,0.3)",
                    borderRadius: "8px"
                }}
            />

            {open && (
                <div
                    style={{
                        zIndex: 10,
                        position: "absolute",
                        maxWidth: "fit-content",
                        boxShadow: "0px 0px 10px 1px rgba(0,0,0,0.14)",
                        border: "1px solid #e6e6e6",
                        borderRadius: 8,
                        background: "#FFFFFF",
                        marginTop: 8
                    }}
                >
                    <div style={{ marginBottom: 10 }}>
                        <HexColorPicker color={hex} onChange={(newColor: string) => handleChange(newColor)}
                            style={{ width: "100%" }} />
                    </div>

                    <div style={{ padding: 12 }}>
                        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 10 }}>
                            <div
                                style={{
                                    width: 32,
                                    height: 32,
                                    borderRadius: 100,
                                    background: `
                                        linear-gradient(${rgbaFromHex(hex, alpha)}, ${rgbaFromHex(hex, alpha)}),
                                        repeating-conic-gradient(#ccc 0% 25%, #fff 0% 50%) 50% / 8px 8px
                                    `,
                                    border: "1px solid #ccc"
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <input
                                    value={hex}
                                    onChange={e => setHex(sanitizeHex(e.target.value))}
                                    style={{
                                        width: "100%",
                                        padding: 8,
                                        borderRadius: 6,
                                        border: "1px solid #ddd",
                                        outline: "none"
                                    }}
                                />
                            </div>
                        </div>

                        <div style={{ marginBottom: 10 }}>
                            <label style={{ display: "block", fontSize: 12, color: "#444" }}>
                                Opacity: {Math.round(alpha * 100)}%
                            </label>
                            <input
                                type="range"
                                min={0}
                                max={1}
                                step={0.01}
                                value={alpha}
                                onChange={e => setAlpha(Number(e.target.value))}
                                style={{
                                    width: "100%",
                                    accentColor: "black"
                                }}
                            />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function sanitizeHex(value: string) {
    if (!value) return "#000000";
    if (value[0] !== "#") value = "#" + value;
    if (/^#[0-9A-Fa-f]{3}$/.test(value)) {
        value = "#" + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
    }
    if (!/^#[0-9A-Fa-f]{6}$/.test(value)) return "#000000";
    return value;
}

function normalizeToHex(value: string) {
    if (!value) return "#000000";
    const rgbaMatch = value.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)/i);
    if (rgbaMatch) {
        const r = Number(rgbaMatch[1]).toString(16).padStart(2, "0");
        const g = Number(rgbaMatch[2]).toString(16).padStart(2, "0");
        const b = Number(rgbaMatch[3]).toString(16).padStart(2, "0");
        return `#${r}${g}${b}`;
    }
    if (value[0] !== "#") value = "#" + value;
    if (/^#[0-9A-Fa-f]{3}$/.test(value)) {
        value = "#" + value[1] + value[1] + value[2] + value[2] + value[3] + value[3];
    }
    if (/^#[0-9A-Fa-f]{6}$/.test(value)) return value;
    return "#000000";
}
