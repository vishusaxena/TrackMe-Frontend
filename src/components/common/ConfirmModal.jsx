import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, MessageSquare } from 'lucide-react';

const ConfirmModal = ({
    isOpen,
    onClose,
    onConfirm,
    title = "Confirm Action",
    description = "Are you sure you want to proceed?",
    showTextArea = false, // Toggle this to show/hide the prompt
    promptLabel = "Remarks",
    placeholder = "Enter your reason here...",
    confirmText = "Confirm",
    isDanger = true
}) => {
    const [promptValue, setPromptValue] = useState("");

    // Reset state when modal opens/closes
    useEffect(() => {
        if (!isOpen) setPromptValue("");
    }, [isOpen]);

    if (!isOpen) return null;

    // Validation: If textarea is required, disable button if empty
    const isInvalid = showTextArea && promptValue.trim().length === 0;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md"
                onClick={onClose}
            />

            {/* Modal Card */}
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-950 shadow-2xl transition-all">

                {/* Top Accent Bar (Danger/Warning) */}
                {isDanger && <div className="h-1.5 w-full bg-rose-600" />}

                <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-xl font-bold text-white tracking-tight">{title}</h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {description}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
                            className="p-1 rounded-full hover:bg-zinc-800 text-zinc-500 hover:text-white transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Conditional Textarea Section */}
                    {showTextArea && (
                        <div className="mt-6 space-y-3 animate-in slide-in-from-top-2 duration-300">
                            <div className="flex items-center gap-2 text-zinc-500">
                                <MessageSquare size={14} />
                                <label className="text-[10px] font-bold uppercase tracking-widest">
                                    {promptLabel}
                                </label>
                            </div>
                            <textarea
                                autoFocus
                                value={promptValue}
                                onChange={(e) => setPromptValue(e.target.value)}
                                placeholder={placeholder}
                                rows={4}
                                className="w-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-4 text-sm text-zinc-200 placeholder:text-zinc-600 focus:border-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-500 transition-all resize-none shadow-inner"
                            />
                            {isInvalid && (
                                <p className="text-[10px] text-rose-500 italic">
                                    * This field is required to proceed.
                                </p>
                            )}
                        </div>
                    )}

                    {/* Footer Actions */}
                    <div className="flex items-center gap-3 mt-8">
                        <button
                            onClick={onClose}
                            className="flex-1 rounded-xl px-4 py-3 text-sm font-semibold text-zinc-400 border border-zinc-800 hover:bg-zinc-900 hover:text-white transition-all"
                        >
                            Go Back
                        </button>
                        <button
                            disabled={isInvalid}
                            onClick={() => onConfirm(showTextArea ? promptValue : null)}
                            className={`flex-[1.5] rounded-xl px-4 py-3 text-sm font-bold text-white transition-all shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed disabled:active:scale-100 ${isDanger
                                ? 'bg-rose-600 hover:bg-rose-500 shadow-rose-900/20'
                                : 'bg-violet-600 hover:bg-violet-500 shadow-violet-900/20'
                                }`}
                        >
                            {confirmText}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;