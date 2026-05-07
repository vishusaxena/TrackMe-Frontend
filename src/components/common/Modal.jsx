import React, { useEffect } from "react";
import { X, Maximize2 } from "lucide-react";

const Modal = ({ isOpen, onClose, title, subtitle, children, icon: Icon, handleButtonClick }) => {
    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) document.body.style.overflow = "hidden";
        else document.body.style.overflow = "unset";
        return () => (document.body.style.overflow = "unset");
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 md:p-10">
            {/* Backdrop: High-fidelity blur */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
                onClick={onClose}
            />

            {/* Modal Container: Landscape Format */}
            <div className="relative w-full max-w-5xl h-full max-h-150 bg-[#0a0a0b] border border-white/10 rounded-4xl shadow-[0_0_100px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">

                {/* Top Glow bar */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-linear-to-r from-transparent via-blue-500/50 to-transparent" />

                {/* Modal Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/5 bg-white/1">
                    <div className="flex items-center gap-4">
                        {Icon && (
                            <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-500 border border-blue-500/20">
                                <Icon size={20} />
                            </div>
                        )}
                        <div>
                            <h2 className="text-lg font-black text-white uppercase tracking-tight leading-none">
                                {title}
                            </h2>
                            {subtitle && (
                                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1.5">
                                    {subtitle}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                            <Maximize2 size={16} />
                        </button>
                        <button
                            onClick={onClose}
                            className="p-2 bg-white/5 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 rounded-xl transition-all"
                        >
                            <X size={20} />
                        </button>
                    </div>
                </div>

                {/* Modal Body: Custom Content Area */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar relative">
                    {children}
                </div>

                {/* Modal Footer: Optional Status/Action Bar */}
                <div className="px-8 py-4 bg-black/40 border-t border-white/5 flex justify-end items-center gap-4">

                    {handleButtonClick && <button
                        onClick={onClose}
                        className="px-6 py-2 text-xs font-bold text-zinc-400 hover:text-white transition-all"
                    >
                        Cancel
                    </button>}
                    {handleButtonClick && <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-black rounded-xl transition-all shadow-lg shadow-blue-600/20 uppercase tracking-widest" onClick={handleButtonClick}>
                        Execute Action
                    </button>}
                </div>
            </div>
        </div>
    );
};

export default Modal;