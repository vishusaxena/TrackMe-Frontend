import React, { useState } from 'react';
import {
    BookOpen, Sparkles, LinkIcon,
    ChevronRight, CheckCircle2, Clock,
    Plus, Search, GraduationCap, Map
} from 'lucide-react';

const StudyPlan = () => {
    const [activeTab, setActiveTab] = useState('Roadmaps');

    return (
        <div className='flex-1 min-h-screen bg-[#030303] border-l border-white/5'>
            <div className=" flex flex-col relative overflow-hidden">

                {/* AI Sparkle Background Effect */}
                <div className="absolute top-0 right-0 w-150 h-100 bg-indigo-600/5 rounded-full blur-[120px] pointer-events-none" />
                <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-size-[40px_40px] pointer-events-none" />

                <div className="relative z-10 p-10 flex flex-col h-full max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-2">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-[0.2em]">
                                <Sparkles size={12} /> AI-Powered Roadmaps
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
                                Study Engine
                            </h1>
                            <p className="text-zinc-500 text-sm font-medium max-w-md">
                                Centralize your learning curve. Transform complex topics into structured, actionable paths.
                            </p>
                        </div>

                        <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
                            <Plus size={18} />
                            New Learning Path
                        </button>
                    </div>

                    {/* Dashboard Tabs */}
                    <div className="flex items-center gap-8 border-b border-white/5 mb-10">
                        {['Roadmaps', 'Curated Links', 'Notes', 'Syllabus'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 text-xs font-bold uppercase tracking-widest transition-all relative ${activeTab === tab ? 'text-white' : 'text-zinc-600 hover:text-zinc-400'
                                    }`}
                            >
                                {tab}
                                {activeTab === tab && (
                                    <div className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-500 shadow-[0_0_10px_#6366f1]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Active Learning Path Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Roadmap Timeline (Main Area) */}
                        <div className="lg:col-span-2 space-y-4">
                            <h3 className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.3em] mb-6">Current Progress: Fullstack Engineer 2026</h3>

                            <RoadmapStep
                                title="Advanced System Design"
                                status="In Progress"
                                progress={65}
                                topics={['Load Balancers', 'Microservices', 'Caching']}
                            />
                            <RoadmapStep
                                title="Database Deep Dive"
                                status="Completed"
                                progress={100}
                                topics={['ACID Properties', 'Sharding', 'Indexing']}
                            />
                            <RoadmapStep
                                title="Cloud Infrastructure"
                                status="Locked"
                                progress={0}
                                topics={['Terraform', 'Docker', 'Kubernetes']}
                            />
                        </div>

                        {/* Sidebar learning stats/links */}
                        <div className="space-y-6">
                            {/* AI Insight Box */}
                            <div className="p-6 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 backdrop-blur-sm">
                                <h4 className="flex items-center gap-2 text-indigo-300 font-bold text-sm mb-3">
                                    <Sparkles size={16} /> AI Optimization
                                </h4>
                                <p className="text-[11px] text-indigo-200/70 leading-relaxed italic">
                                    "Based on your activity, you should focus on 'Sharding' today. You've spent 4 hours on theoretical study; it's time for a practical lab."
                                </p>
                            </div>

                            {/* Fast Links */}
                            <div className="p-6 rounded-3xl bg-white/2 border border-white/5">
                                <h4 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                                    <LinkIcon size={16} className="text-zinc-500" /> Curated Resources
                                </h4>
                                <ul className="space-y-3">
                                    <ResourceLink title="Distributed Systems Guide" site="medium.com" />
                                    <ResourceLink title="Next.js 15 Documentation" site="nextjs.org" />
                                    <ResourceLink title="The Pragmatic Programmer" site="amazon.com" />
                                </ul>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

/* Component: Roadmap Step */
const RoadmapStep = ({ title, status, progress, topics }) => (
    <div className={`p-6 rounded-3xl border transition-all duration-500 ${status === 'In Progress' ? 'bg-white/3 border-indigo-500/30 shadow-xl' : 'bg-white/1 border-white/5'
        }`}>
        <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                    status === 'In Progress' ? 'bg-indigo-500 text-white' : 'bg-zinc-800 text-zinc-600'
                    }`}>
                    {status === 'Completed' ? <CheckCircle2 size={20} /> : <Map size={20} />}
                </div>
                <div>
                    <h4 className={`text-sm font-bold ${status === 'Locked' ? 'text-zinc-600' : 'text-white'}`}>{title}</h4>
                    <div className="flex items-center gap-2 mt-1">
                        <Clock size={10} className="text-zinc-600" />
                        <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{status}</span>
                    </div>
                </div>
            </div>
            <span className="text-xs font-mono text-zinc-500">{progress}%</span>
        </div>

        <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden mb-5">
            <div
                className={`h-full transition-all duration-1000 ${status === 'Completed' ? 'bg-emerald-500' : 'bg-indigo-500'}`}
                style={{ width: `${progress}%` }}
            />
        </div>

        <div className="flex flex-wrap gap-2">
            {topics.map(topic => (
                <span key={topic} className="text-[9px] font-bold px-2 py-1 rounded-lg bg-white/5 text-zinc-500 border border-white/5">
                    {topic}
                </span>
            ))}
        </div>
    </div>
);

/* Component: Resource Link */
const ResourceLink = ({ title, site }) => (
    <li className="group flex items-center justify-between cursor-pointer">
        <div className="flex flex-col">
            <span className="text-xs font-medium text-zinc-400 group-hover:text-indigo-400 transition-colors">{title}</span>
            <span className="text-[9px] text-zinc-600 font-mono uppercase">{site}</span>
        </div>
        <ChevronRight size={14} className="text-zinc-700 group-hover:text-white transition-all transform group-hover:translate-x-1" />
    </li>
);

export default StudyPlan;