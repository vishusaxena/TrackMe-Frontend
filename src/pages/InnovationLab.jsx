import React, { useState } from 'react';
import {
    FlaskConical, Beaker, Rocket,
    Binary, Cpu, GitBranch,
    ArrowUpRight, Microscope,
    Settings2, Zap, MicroscopeIcon
} from 'lucide-react';

const InnovationLab = () => {
    const [filter, setFilter] = useState('active');

    return (
        <div className='flex-1 min-h-screen bg-[#030303] border-l border-white/5'>
        /* Main Container with Sidebar Compatibility */
        <div className=" flex flex-col relative overflow-hidden">

            {/* Lab Atmosphere: Toxic Green/Cyan Glow for "Innovation" feel */}
            <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute inset-0 opacity-[0.02] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] pointer-events-none" />

            <div className="relative z-10 p-10 flex flex-col h-full max-w-7xl mx-auto w-full">

                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-500 uppercase tracking-[0.3em]">
                            <FlaskConical size={12} /> R&D Environment Active
                        </div>
                        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                            Innovation Lab
                        </h1>
                        <p className="text-zinc-500 text-sm font-medium max-w-md">
                            Incubate wild ideas. Test experimental stacks. Move from prototype to production.
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="p-3 rounded-2xl bg-white/3 border border-white/10 text-zinc-500 hover:text-white transition-all">
                            <Settings2 size={20} />
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-emerald-600/20 active:scale-95">
                            <Zap size={18} />
                            New Experiment
                        </button>
                    </div>
                </div>

                {/* Grid Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">

                    {/* Active Experiments Column */}
                    <div className="xl:col-span-3 space-y-6">
                        <div className="flex items-center justify-between mb-4 border-b border-white/5 pb-4">
                            <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em]">Current Incubation</h3>
                            <div className="flex gap-4">
                                {['active', 'archived', 'successful'].map(t => (
                                    <button
                                        key={t}
                                        onClick={() => setFilter(t)}
                                        className={`text-[10px] font-bold uppercase tracking-widest ${filter === t ? 'text-emerald-500' : 'text-zinc-600'}`}
                                    >
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ExperimentCard
                                title="Neural Interface v1"
                                type="Hardware/AI"
                                complexity="High"
                                status="Testing"
                                icon={<Cpu size={24} />}
                                color="text-blue-400"
                            />
                            <ExperimentCard
                                title="Autonomous Agent Mesh"
                                type="Software"
                                complexity="Medium"
                                status="Protoryping"
                                icon={<Binary size={24} />}
                                color="text-emerald-400"
                            />
                            <ExperimentCard
                                title="Quantum Auth Logic"
                                type="Cryptography"
                                complexity="Extreme"
                                status="Research"
                                icon={<MicroscopeIcon size={24} />}
                                color="text-purple-400"
                            />
                            <ExperimentCard
                                title="Zero-Config Deployment"
                                type="DevOps"
                                complexity="Low"
                                status="Stable"
                                icon={<Rocket size={24} />}
                                color="text-orange-400"
                            />
                        </div>
                    </div>

                    {/* Right Sidebar: Lab Stats & Tools */}
                    <div className="space-y-6">
                        <div className="p-6 rounded-3xl bg-emerald-500/5 border border-emerald-500/10 backdrop-blur-sm">
                            <h4 className="text-emerald-500 font-bold text-sm mb-4">Lab Resources</h4>
                            <div className="space-y-4">
                                <LabStat label="GPU Utilization" val="84%" />
                                <LabStat label="Active Nodes" val="12" />
                                <LabStat label="Deployment Success" val="92%" />
                            </div>
                        </div>

                        <div className="p-6 rounded-3xl bg-white/2 border border-white/5">
                            <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                <GitBranch size={16} className="text-zinc-500" /> Recent Merges
                            </h4>
                            <div className="space-y-4 font-mono">
                                <p className="text-[10px] text-zinc-500 leading-none">#EXP-902: Auth-Bypass-Fix</p>
                                <p className="text-[10px] text-zinc-500 leading-none">#EXP-441: Mesh-Network-Up</p>
                                <p className="text-[10px] text-zinc-500 leading-none">#EXP-121: Kernel-Optimization</p>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        </div>
    );
};

/* Component: Experiment Card */
const ExperimentCard = ({ title, type, complexity, status, icon, color }) => (
    <div className="group relative bg-white/2 border border-white/5 rounded-3xl p-6 hover:border-emerald-500/30 transition-all duration-500">
        <div className="flex items-start justify-between mb-8">
            <div className={`p-4 rounded-2xl bg-white/3 border border-white/5 ${color} group-hover:scale-110 transition-transform duration-500`}>
                {icon}
            </div>
            <div className="text-right">
                <span className="text-[9px] font-black text-zinc-600 uppercase tracking-widest block">Complexity</span>
                <span className="text-xs font-bold text-zinc-300">{complexity}</span>
            </div>
        </div>

        <div className="space-y-1 mb-6">
            <h4 className="text-lg font-black text-white group-hover:text-emerald-400 transition-colors uppercase tracking-tight">{title}</h4>
            <p className="text-xs text-zinc-500 font-bold tracking-wider">{type}</p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-white/5">
            <div className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-zinc-500 uppercase">{status}</span>
            </div>
            <button className="p-2 rounded-xl bg-white/5 text-zinc-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                <ArrowUpRight size={16} />
            </button>
        </div>
    </div>
);

const LabStat = ({ label, val }) => (
    <div className="flex justify-between items-center">
        <span className="text-[11px] font-bold text-zinc-500 uppercase">{label}</span>
        <span className="text-xs font-mono text-emerald-400 font-bold">{val}</span>
    </div>
);

export default InnovationLab;