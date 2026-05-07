import React, { useState, useRef, useEffect, forwardRef } from "react";
import { ChevronDown, Check } from "lucide-react";

const Select = forwardRef(({
    label,
    options = [],
    value,
    onChange,
    placeholder = "Select option",
    error,
    className = "",
    id
}, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClick = (e) => {
            if (containerRef.current && !containerRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleSelect = (optionValue) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    const selectedOption = options.find(opt => opt.value === value);

    return (
        <div className={`w-full space-y-2 ${className}`} ref={containerRef} >
            {label && (
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                    {label}
                </label>
            )}

            <div className="relative">
                {/* Select Trigger */}
                <button
                    id={id}
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`
            w-full flex items-center justify-between bg-[#0a0a0b] border px-4 py-3 rounded-xl transition-all duration-300
            ${isOpen ? "border-blue-500/50 ring-1 ring-blue-500/20" : "border-white/10 hover:border-white/20"}
            ${error ? "border-red-500/50" : ""}
          `}
                >
                    <span className={`text-sm ${!selectedOption ? "text-zinc-700" : "text-zinc-200"}`}>
                        {selectedOption ? selectedOption.label : placeholder}
                    </span>
                    <ChevronDown
                        size={16}
                        className={`text-zinc-600 transition-transform duration-300 ${isOpen ? "rotate-180 text-blue-500" : ""}`}
                    />
                </button>

                {/* Dropdown Menu */}
                {isOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-[#0a0a0b] border border-white/10 rounded-2xl p-1.5 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
                        <div className="max-h-60 overflow-y-auto custom-scrollbar">
                            {options.map((option) => (
                                <button
                                    key={option.value}
                                    type="button"
                                    onClick={() => handleSelect(option.value)}
                                    className={`
                    w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-all
                    ${value === option.value
                                            ? "bg-blue-600/10 text-blue-400"
                                            : "text-zinc-400 hover:bg-white/5 hover:text-white"}
                  `}
                                >
                                    <span className="font-medium">{option.label}</span>
                                    {value === option.value && <Check size={14} />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {error && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1">
                    {error}
                </p>
            )}
        </div>
    );
});

Select.displayName = "Select";

export default Select;