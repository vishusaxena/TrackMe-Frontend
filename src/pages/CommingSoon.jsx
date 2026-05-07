import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Construction, Rocket, Timer, ChevronLeft, Sparkles, Terminal } from 'lucide-react';

const ComingSoon = ({ featureName = "Module" }) => {
    const navigate = useNavigate();

    return (
        <div className='flex-1 min-h-screen bg-[#030303] border-l border-white/5'>
        /* Main Container with Sidebar Compatibility */
            <div className=" flex flex-col relative overflow-hidden">

                {/* Background Glows */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

                <div className="relative z-10 flex flex-col items-center justify-center h-full max-w-2xl mx-auto px-6 text-center">

                    {/* Status Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-400 uppercase tracking-[0.3em] mb-8 animate-pulse">
                        <Construction size={14} /> Under Development
                    </div>

                    {/* Main Visual Component */}
                    <div className="relative mb-10 group">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-[60px] group-hover:blur-[80px] transition-all duration-700 opacity-50" />
                        <div className="relative w-24 h-24 bg-black border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl">
                            <Rocket size={40} className="text-white animate-bounce" />
                        </div>
                    </div>

                    {/* Typography */}
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase italic mb-4">
                        Evolution in <span className="text-blue-500">Progress.</span>
                    </h1>

                    <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed mb-10">
                        The <span className="text-zinc-300 font-bold">"{featureName}"</span> engine is currently being calibrated in the R&D lab.
                        We're building something that refuses to stay average. Hang tight.
                    </p>

                    {/* Progress Indicators */}
                    <div className="w-full max-w-xs space-y-4 mb-12">
                        <div className="flex justify-between items-end mb-1">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">Compiler Status</span>
                            <span className="text-[10px] font-mono text-blue-500 font-bold">78.4%</span>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600 w-[78.4%] shadow-[0_0_15px_rgba(37,99,235,0.4)]" />
                        </div>
                        <div className="flex items-center justify-center gap-6 pt-2">
                            <StatusItem icon={<Timer size={14} />} label="Q1 2026" />
                            <StatusItem icon={<Terminal size={14} />} label="v2.4-Beta" />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4">
                        <button
                            onClick={() => navigate(-1)}
                            className="flex items-center gap-2 px-8 py-3 bg-white text-black hover:bg-blue-50 rounded-2xl font-bold transition-all active:scale-95"
                        >
                            <ChevronLeft size={18} /> Go Back
                        </button>
                        <button className="flex items-center gap-2 px-8 py-3 bg-white/5 text-zinc-400 border border-white/10 rounded-2xl font-bold hover:bg-white/10 transition-all">
                            <Sparkles size={18} /> Notify Me
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatusItem = ({ icon, label }) => (
    <div className="flex items-center gap-2 text-zinc-600">
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-widest">{label}</span>
    </div>
);

export default ComingSoon;