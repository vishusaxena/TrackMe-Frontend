import React from "react";

const FullPageLoader = ({ isLoading }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-[#030303]">
            {/* Background Glow - matches your profile's decorative element */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 blur-[100px] pointer-events-none" />

            <div className="relative flex flex-col items-center">
                {/* Modern Spinner */}
                <div className="relative h-20 w-20">
                    {/* Outer Ring */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/5"></div>
                    {/* Spinning Segment */}
                    <div className="absolute inset-0 rounded-full border-t-2 border-blue-500 animate-spin"></div>
                    {/* Inner Pulsing Core */}
                    <div className="absolute inset-4 rounded-full bg-blue-500/10 border border-blue-500/20 animate-pulse flex items-center justify-center">
                        <div className="w-2 h-2 bg-blue-500 rounded-full shadow-[0_0_15px_rgba(59,130,246,0.8)]"></div>
                    </div>
                </div>

                {/* Text matches your typography (uppercase, tracking-widest) */}
                <div className="mt-8 flex flex-col items-center gap-2">
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] animate-pulse">
                        System Initializing
                    </span>
                    <div className="h-px w-12 bg-linear-to-r from-transparent via-white/20 to-transparent"></div>
                </div>
            </div>
        </div>
    );
};

export default FullPageLoader;