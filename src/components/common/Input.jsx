import React, { useState, forwardRef } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = forwardRef(({
    label,
    icon: Icon,
    type = "text",
    error,
    className = "",
    ...props
}, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const isPassword = type === "password";
    const inputType = isPassword && showPassword ? "text" : type;

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

                {/* Left Icon */}
                {Icon && (
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors duration-300">
                        <Icon size={18} />
                    </div>
                )}

                {/* Input Field */}
                <input
                    ref={ref}
                    type={inputType}
                    className={`
            relative w-full bg-[#0a0a0b] border text-zinc-200 text-sm rounded-xl py-3
            ${Icon ? "pl-12" : "pl-4"} 
            ${isPassword ? "pr-12" : "pr-4"}
            ${error ? "border-red-500/50" : "border-white/10 group-hover:border-white/20"}
            focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20
            transition-all duration-300 placeholder:text-zinc-700
          `}
                    {...props}
                />

                {/* Password Toggle Button */}
                {isPassword && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-600 hover:text-zinc-300 transition-colors duration-200"
                    >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                )}
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

Input.displayName = "Input";

export default Input;