import React, { useState } from "react";

const Tooltip = ({ children, text, position = "top" }) => {
    const [isVisible, setIsVisible] = useState(false);

    // Position Logic
    const positionClasses = {
        top: "bottom-full left-1/2 -translate-x-1/2 mb-3",
        bottom: "top-full left-1/2 -translate-x-1/2 mt-3",
        left: "right-full top-1/2 -translate-y-1/2 mr-3",
        right: "left-full top-1/2 -translate-y-1/2 ml-3",
    };

    // Arrow Logic (matches the position)
    const arrowClasses = {
        top: "top-full left-1/2 -translate-x-1/2 border-t-zinc-800",
        bottom: "bottom-full left-1/2 -translate-x-1/2 border-b-zinc-800",
        left: "left-full top-1/2 -translate-y-1/2 border-l-zinc-800",
        right: "right-full top-1/2 -translate-y-1/2 border-r-zinc-800",
    };

    return (
        <div
            className="relative flex items-center"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <div className={`absolute z-50 whitespace-nowrap ${positionClasses[position]}`}>
                    {/* Tooltip Box */}
                    <div className="bg-zinc-900 border border-white/10 px-3 py-1.5 rounded-lg shadow-2xl backdrop-blur-md">
                        <p className="text-[10px] font-bold text-zinc-200 uppercase tracking-widest">
                            {text}
                        </p>
                    </div>

                    {/* Custom Arrow */}
                    <div className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`} />
                </div>
            )}
        </div>
    );
};

export default Tooltip;