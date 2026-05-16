import React, { useState, useRef, useEffect } from 'react';

export const MultiSelect = ({
    label = "Issuer",
    placeholder = "Select options",
    options = ["Beginner", "Intermediate", "Advanced", "Expert"],
    selectedValues = [],
    onChange
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleToggleOption = (option) => {
        let newSelection;
        if (selectedValues.includes(option)) {
            // Remove option if already selected
            newSelection = selectedValues.filter((item) => item !== option);
        } else {
            // Add option if not selected
            newSelection = [...selectedValues, option];
        }

        if (onChange) {
            onChange(newSelection);
        }
    };

    return (
        <div ref={dropdownRef} className="relative flex flex-col w-full max-w-sm select-none">
            {/* Label matching your specific layout */}
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">
                {label}
            </span>

            {/* Main Select Field Header Box */}
            <div
                onClick={() => setIsOpen(!isOpen)}
                className={`
          flex items-center justify-between w-full h-11 px-4 
          text-sm rounded-xl cursor-pointer transition-all duration-200 bg-[#09090a]
          ${isOpen
                        ? 'border border-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.2)] text-zinc-300'
                        : 'border border-zinc-900 text-zinc-700 hover:border-zinc-700'}
        `}
            >
                <span className="truncate max-w-[85%]">
                    {selectedValues.length === 0
                        ? placeholder
                        : selectedValues.join(', ')
                    }
                </span>

                {/* Animated Chevron Arrow Up/Down */}
                <svg
                    className={`w-4 h-4 transition-transform duration-200 text-zinc-600 ${isOpen ? 'rotate-180 text-blue-500' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            {/* Dropdown Options Panel */}
            {isOpen && (
                <div className="absolute left-0 w-full z-50 mt-14 p-2 bg-[#09090a] border border-zinc-900 rounded-xl shadow-2xl max-h-60 overflow-y-auto">
                    {options.map((option) => {
                        const isSelected = selectedValues.includes(option);
                        return (
                            <div
                                key={option}
                                onClick={() => handleToggleOption(option)}
                                className={`
                  flex items-center justify-between px-3 py-2.5 my-0.5 text-sm rounded-lg cursor-pointer transition-colors duration-150
                  ${isSelected
                                        ? 'bg-blue-600/10 text-blue-400 font-medium'
                                        : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'}
                `}
                            >
                                <span>{option}</span>

                                {/* Minimalist Checkmark indicator if active */}
                                {isSelected && (
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                                    </svg>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;