"use client"
import { useEffect, useState } from "react";

type params = {
    value: boolean,
    onChanged?: (data: {
        checked: boolean
    }) => void
}

export default function Checkbox({ value, onChanged }: params) {
    const [checked, setChecked] = useState(value);
    useEffect(() => {
        onChanged?.({ checked });

    }, [checked]);

    return (
        <button
            onClick={() => setChecked(!checked)}
            className={`cursor-pointer relative w-12 h-7 rounded-full transition-colors duration-300 
    ${checked ? "bg-blue-500" : "bg-gray-300"}`}
        >
            <span
                className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md 
        transition-all duration-200 ease-in-out
        ${checked ? "translate-x-5" : "translate-x-0"}`}
            />
        </button>


    );
}