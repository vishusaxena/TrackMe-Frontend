import React, { forwardRef } from "react";
import { Calendar } from "lucide-react";

const DateBox = forwardRef(({
    label,
    error,
    className = "",
    ...props
}, ref) => {
    return (
        <div className={`w-full space-y-2 ${className}`}>
            {/* Label */}
            {label && (
                <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">
                    {label}
                </label>
            )}

            <div className="relative group">
                {/* Decorative Focus Glow */}
                <div className="absolute inset-0 bg-blue-600/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity duration-300" />

                {/* Calendar Icon */}
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors duration-300 pointer-events-none z-10">
                    <Calendar size={18} />
                </div>

                {/* Date Input */}
                <input
                    ref={ref}
                    type="date"
                    className={`
                        relative w-full bg-[#0a0a0b] border text-zinc-200 text-sm rounded-xl py-3 pl-12 pr-4
                        ${error ? "border-red-500/50" : "border-white/10 group-hover:border-white/20"}
                        focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20
                        transition-all duration-300
                        scheme-dark 
                    `}
                    {...props}
                />
            </div>

            {error && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
});

DateBox.displayName = "DateBox";
export default DateBox;