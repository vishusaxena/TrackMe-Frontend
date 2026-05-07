import React, { forwardRef } from "react";

const TextArea = forwardRef(({
    label,
    icon: Icon,
    error,
    className = "",
    rows = 4,
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

                {/* Icon (Positioned at top-left for Textareas) */}
                {Icon && (
                    <div className="absolute left-4 top-4 text-zinc-600 group-focus-within:text-blue-500 transition-colors duration-300">
                        <Icon size={18} />
                    </div>
                )}

                {/* Textarea Field */}
                <textarea
                    ref={ref}
                    rows={rows}
                    className={`
                        relative w-full bg-[#0a0a0b] border text-zinc-200 text-sm rounded-xl py-3
                        ${Icon ? "pl-12" : "pl-4"} 
                        pr-4
                        ${error ? "border-red-500/50" : "border-white/10 group-hover:border-white/20"}
                        focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20
                        transition-all duration-300 placeholder:text-zinc-700 resize-none
                    `}
                    {...props}
                />
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-[10px] font-bold text-red-500 uppercase tracking-wider ml-1 animate-in fade-in slide-in-from-top-1">
                    {error}
                </p>
            )}
        </div>
    );
});

TextArea.displayName = "TextArea";
export default TextArea;