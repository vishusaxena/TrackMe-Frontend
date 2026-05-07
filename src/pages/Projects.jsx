import React from 'react';
import {
    FolderPlus, MoreHorizontal, ExternalLink,
    Layers, Cpu, Globe, Palette
} from 'lucide-react';

const Projects = () => {
    const projects = [
        {
            name: "Neural Nexus AI",
            category: "MACHINE LEARNING",
            status: "Active",
            progress: 75,
            color: "from-blue-500 to-indigo-600",
            icon: <Cpu size={20} />
        },
        {
            name: "TrackMe Dashboard",
            category: "WEB APPLICATION",
            status: "Review",
            progress: 90,
            color: "from-violet-500 to-purple-600",
            icon: <Layers size={20} />
        },
        {
            name: "Global Sourcing",
            category: "E-COMMERCE",
            status: "Planning",
            progress: 20,
            color: "from-emerald-500 to-teal-600",
            icon: <Globe size={20} />
        },
        {
            name: "Brand Identity v2",
            category: "DESIGN",
            status: "On Hold",
            progress: 45,
            color: "from-rose-500 to-pink-600",
            icon: <Palette size={20} />
        }
    ];

    return (
        <div className="flex-1 h-screen flex flex-col bg-[#09090b] overflow-hidden">

            {/* Header */}
            <header className="flex justify-between items-end p-8 pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-white">Project Hub</h1>
                    <p className="text-zinc-500 text-xs tracking-widest mt-1 uppercase font-semibold">
                        Management & System Architecture
                    </p>
                </div>
                <div className="flex gap-3">
                    <button className="bg-zinc-900 border border-white/10 text-zinc-300 p-2.5 rounded-xl hover:bg-zinc-800 transition-all">
                        <FolderPlus size={18} />
                    </button>
                    <button className="bg-violet-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold hover:bg-violet-700 transition-all shadow-lg shadow-violet-600/20">
                        CREATE PROJECT
                    </button>
                </div>
            </header>

            {/* Main Content Area (Scrollable internally) */}
            <div className="flex-1 overflow-y-auto no-scrollbar px-8 pb-10">

                {/* Stats / Health Grid */}
                <div className="grid grid-cols-4 gap-4 mb-8">
                    {[
                        { label: "TOTAL", val: "12" },
                        { label: "COMPLETED", val: "08" },
                        { label: "IN-FLIGHT", val: "03" },
                        { label: "EFFICIENCY", val: "94%" },
                    ].map((stat, i) => (
                        <div key={i} className="bg-zinc-900/40 border border-white/5 p-4 rounded-2xl">
                            <p className="text-[10px] font-black tracking-widest text-zinc-500 mb-1">{stat.label}</p>
                            <p className="text-xl font-bold text-zinc-200">{stat.val}</p>
                        </div>
                    ))}
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((proj, i) => (
                        <div key={i} className="group relative bg-zinc-900/30 border border-white/5 rounded-3xl p-6 hover:bg-zinc-900/60 transition-all duration-300">

                            {/* Top Row */}
                            <div className="flex justify-between items-start mb-6">
                                <div className={`p-3 rounded-2xl bg-linear-to-br ${proj.color} text-white shadow-lg`}>
                                    {proj.icon}
                                </div>
                                <button className="text-zinc-600 hover:text-white transition-colors">
                                    <MoreHorizontal size={20} />
                                </button>
                            </div>

                            {/* Project Info */}
                            <div className="mb-6">
                                <p className="text-[10px] font-bold text-violet-400 tracking-widest mb-1 uppercase">
                                    {proj.category}
                                </p>
                                <h3 className="text-lg font-bold text-white group-hover:text-violet-400 transition-colors">
                                    {proj.name}
                                </h3>
                            </div>

                            {/* Progress Section */}
                            <div className="space-y-3">
                                <div className="flex justify-between text-[10px] font-bold tracking-tighter">
                                    <span className="text-zinc-400">COMPLETION</span>
                                    <span className="text-zinc-200">{proj.progress}%</span>
                                </div>
                                <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full bg-linear-to-r ${proj.color} transition-all duration-1000`}
                                        style={{ width: `${proj.progress}%` }}
                                    />
                                </div>
                            </div>

                            {/* Footer Row */}
                            <div className="mt-8 pt-6 border-t border-white/5 flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{proj.status}</span>
                                </div>
                                <button className="flex items-center gap-1.5 text-[10px] font-bold text-zinc-400 hover:text-white transition-colors">
                                    VIEW DETAILS <ExternalLink size={12} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </div>
    );
};

export default Projects;