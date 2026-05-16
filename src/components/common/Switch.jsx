import React, { useState } from 'react';

export const DarkModeSwitch = ({
    label = "Enable Skill",
    subLabel,
    checked: controlledChecked,
    onChange,
}) => {
    const [internalChecked, setInternalChecked] = useState(false);

    // Support both controlled and uncontrolled component patterns
    const isChecked = controlledChecked !== undefined ? controlledChecked : internalChecked;

    const handleToggle = () => {
        if (onChange) {
            onChange(!isChecked);
        } else {
            setInternalChecked(!internalChecked);
        }
    };

    return (
        <div className="flex items-center  gap-4 py-2 select-none">
            {/* Labels */}
            {(label || subLabel) && (
                <div className="flex flex-col">
                    {label && (
                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                            {label}
                        </span>
                    )}
                    {subLabel && (
                        <span className="mt-1 text-sm text-gray-500">
                            {subLabel}
                        </span>
                    )}
                </div>
            )}

            {/* Switch Button */}
            <button
                type="button"
                role="switch"
                aria-checked={isChecked}
                onClick={handleToggle}
                className={`
          relative inline-flex h-7 w-14 shrink-0 cursor-pointer rounded-full 
          border-2 border-transparent transition-colors duration-200 ease-in-out 
          focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black
          ${isChecked ? 'bg-purple-600 shadow-[0_0_12px_rgba(147,51,234,0.4)]' : 'bg-[#1E1E1F]'}
        `}
            >
                <span className="sr-only">{label}</span>
                {/* Toggle Knob */}
                <span
                    className={`
            pointer-events-none inline-block h-6 w-6 transform rounded-full 
            bg-white shadow-lg ring-0 transition duration-200 ease-in-out
            ${isChecked ? 'translate-x-7' : 'translate-x-0'}
          `}
                />
            </button>
        </div>
    );
};

export default DarkModeSwitch;