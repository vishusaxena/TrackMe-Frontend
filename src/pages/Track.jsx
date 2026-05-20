import React, { useState } from 'react';
import {
    Terminal, Plus, Search, MoreVertical, BookOpen,
    CheckCircle2, Clock, Calendar, Bookmark, X, Sparkles,
    Layers, Check, HelpCircle, Activity, ChevronRight
} from 'lucide-react';

const Track = () => {
    // Structural Interface States
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [trackMethod, setTrackMethod] = useState('SPACED_REPETITION'); // Method switcher inside modal

    // Form State fields
    const [newTopic, setNewTopic] = useState({
        title: '',
        category: 'SYSTEM DESIGN',
        method: 'SPACED_REPETITION',
        subtasks: '',
    });

    // Mock Memory Nodes Dataset
    const [topics, setTopics] = useState([
        {
            id: 1,
            title: "Redis Distributed Caching Architecture",
            category: "SYSTEM DESIGN",
            method: "SPACED_REPETITION",
            status: "Active",
            lastActivity: "2 hours ago",
            progress: 50,
            color: "text-blue-400",
            borderColor: "hover:border-blue-500/20",
            glowColor: "bg-blue-500",
            // Specific data structures for tracking types
            intervals: [
                { label: "Day 1: Learn", completed: true, date: "May 18" },
                { label: "Day 3: Revise", completed: true, date: "May 20" },
                { label: "Day 7: Revise", completed: false, date: "May 24" },
                { label: "Day 15: Mastery", completed: false, date: "June 02" }
            ]
        },
        {
            id: 2,
            title: "Async Event Hooks & Concurrency Models",
            category: "ENGINEERING CORE",
            method: "CHECKLIST",
            status: "In Progress",
            lastActivity: "1 day ago",
            progress: 66,
            color: "text-purple-400",
            borderColor: "hover:border-purple-500/20",
            glowColor: "bg-purple-500",
            checklist: [
                { title: "Understand Event Loop Phase Macro-Tasks", completed: true },
                { title: "Implement Custom Worker Thread Pool Scheduler", completed: true },
                { title: "Handle Mutex Race Patterns in Shared Arrays", completed: false }
            ]
        },
        {
            id: 3,
            title: "Transformer Architectures & Self-Attention Matrices",
            category: "MACHINE LEARNING",
            method: "MILESTONE_LOG",
            status: "Deep Dive",
            lastActivity: "3 days ago",
            progress: 33,
            color: "text-amber-400",
            borderColor: "hover:border-amber-500/20",
            glowColor: "bg-amber-500",
            milestones: [
                { title: "Phase 1: Tokenization Vectors & Positional Encodings", status: "Logged", completed: true },
                { title: "Phase 2: Multi-Head Scaled Dot-Product Mechanics", status: "Pending Sync", completed: false },
                { title: "Phase 3: Backpropagation Layer-Norm Adjustments", status: "Locked", completed: false }
            ]
        }
    ]);

    // Text String Filter Evaluation Engine
    const filteredTopics = topics.filter(t =>
        t.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // State Update Handlers
    const toggleInterval = (topicId, intervalIndex) => {
        setTopics(topics.map(t => {
            if (t.id !== topicId) return t;
            const updatedIntervals = [...t.intervals];
            updatedIntervals[intervalIndex].completed = !updatedIntervals[intervalIndex].completed;
            const completedCount = updatedIntervals.filter(i => i.completed).length;
            const newProgress = Math.round((completedCount / updatedIntervals.length) * 100);
            return { ...t, intervals: updatedIntervals, progress: newProgress, lastActivity: "Just now" };
        }));
    };

    const toggleChecklistItem = (topicId, checkIndex) => {
        setTopics(topics.map(t => {
            if (t.id !== topicId) return t;
            const updatedChecklist = [...t.checklist];
            updatedChecklist[checkIndex].completed = !updatedChecklist[checkIndex].completed;
            const completedCount = updatedChecklist.filter(c => c.completed).length;
            const newProgress = Math.round((completedCount / updatedChecklist.length) * 100);
            return { ...t, checklist: updatedChecklist, progress: newProgress, lastActivity: "Just now" };
        }));
    };

    const advanceMilestone = (topicId, milestoneIndex) => {
        setTopics(topics.map(t => {
            if (t.id !== topicId) return t;
            const updatedMilestones = [...t.milestones];
            updatedMilestones[milestoneIndex].completed = !updatedMilestones[milestoneIndex].completed;
            updatedMilestones[milestoneIndex].status = updatedMilestones[milestoneIndex].completed ? "Logged" : "Pending Sync";
            const completedCount = updatedMilestones.filter(m => m.completed).length;
            const newProgress = Math.round((completedCount / updatedMilestones.length) * 100);
            return { ...t, milestones: updatedMilestones, progress: newProgress, lastActivity: "Just now" };
        }));
    };

    const handleCreateTopic = (e) => {
        e.preventDefault();

        let customProperties = {};
        if (trackMethod === 'SPACED_REPETITION') {
            customProperties = {
                intervals: [
                    { label: "Day 1: Learn", completed: false, date: "Today" },
                    { label: "Day 3: Revise", completed: false, date: "In 3 Days" },
                    { label: "Day 7: Revise", completed: false, date: "In 7 Days" },
                    { label: "Day 15: Mastery", completed: false, date: "In 15 Days" }
                ]
            };
        } else if (trackMethod === 'CHECKLIST') {
            const parsedTasks = newTopic.subtasks ? newTopic.subtasks.split('\n').filter(t => t.trim() !== '') : ["Initial Concept Initialization"];
            customProperties = {
                checklist: parsedTasks.map(title => ({ title, completed: false }))
            };
        } else {
            customProperties = {
                milestones: [
                    { title: "Core Fundamentals & Structural Scaffolding", status: "Pending Sync", completed: false },
                    { title: "Deep Conceptual Matrix Assembly", status: "Locked", completed: false },
                    { title: "Practical Implementation Testing", status: "Locked", completed: false }
                ]
            };
        }

        const fallbackColors = [
            { text: "text-blue-400", border: "hover:border-blue-500/20", glow: "bg-blue-500" },
            { text: "text-purple-400", border: "hover:border-purple-500/20", glow: "bg-purple-500" },
            { text: "text-amber-400", border: "hover:border-amber-500/20", glow: "bg-amber-500" }
        ];
        const assignedColors = fallbackColors[topics.length % fallbackColors.length];

        const createdNode = {
            id: Date.now(),
            title: newTopic.title || "Untitled Knowledge Vector",
            category: newTopic.category,
            method: trackMethod,
            status: "Active",
            lastActivity: "Just initialized",
            progress: 0,
            color: assignedColors.text,
            borderColor: assignedColors.border,
            glowColor: assignedColors.glow,
            ...customProperties
        };

        setTopics([createdNode, ...topics]);
        setIsCreateModalOpen(false);
        setNewTopic({ title: '', category: 'SYSTEM DESIGN', method: 'SPACED_REPETITION', subtasks: '' });
    };

    return (
        <div className="flex-1 min-h-screen bg-black text-white selection:bg-blue-500/30">
            <main className="flex-1 flex flex-col relative overflow-hidden">

                {/* Visual Backdrop Ambient Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-1/4 w-150 h-150 bg-emerald-500/5 rounded-full blur-[130px]" />
                </div>

                <div className="relative z-10 p-6 md:p-10 flex flex-col h-full max-w-7xl mx-auto w-full">

                    {/* Top Workspace Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/20 w-fit mb-3">
                                <Activity size={11} className="text-emerald-400 animate-pulse" />
                                <span className="text-[9px] font-black text-emerald-300 uppercase tracking-widest">Cognitive Synapse Syncing</span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight bg-clip-text text-transparent bg-linear-to-b from-white via-zinc-200 to-zinc-400">
                                Memory Lab
                            </h1>
                            <p className="text-zinc-400 text-sm mt-1.5 font-medium">
                                Track conceptual targets, monitor forgetting loops, and structure your knowledge graphs.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 border border-white/5 hover:border-white/10 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-all backdrop-blur-md active:scale-95">
                                <Bookmark size={14} />
                                Retention Analytics
                            </button>
                            <button
                                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg shadow-emerald-600/25 hover:scale-[1.02] active:scale-95"
                                onClick={() => setIsCreateModalOpen(true)}
                            >
                                <Plus size={16} />
                                Drop Tracker Node
                            </button>
                        </div>
                    </div>

                    {/* Operational Metric Bars Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
                        <MetricCard label="Monitored Topics" value={String(topics.length).padStart(2, '0')} icon={<BookOpen size={13} />} />
                        <MetricCard label="Average Retention" value="87%" icon={<Activity size={13} />} />
                        <MetricCard label="Spaced Targets" value={String(topics.filter(t => t.method === 'SPACED_REPETITION').length).padStart(2, '0')} icon={<Calendar size={13} />} />
                        <MetricCard label="Active Loops" value="03" icon={<Clock size={13} />} />
                    </div>

                    {/* Main Content Terminal Framework */}
                    <div className="flex-1 bg-zinc-950/40 border border-white/5 rounded-3xl flex flex-col shadow-2xl backdrop-blur-md overflow-hidden">

                        {/* Terminal Filter Toolbar */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/20 backdrop-blur-xs gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter memory loops by string match..."
                                    className="w-full bg-black/60 border border-white/5 focus:border-emerald-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-mono placeholder:text-zinc-600 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-emerald-500/10 transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_#10b981]" title="Lab Active" />
                                <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors" onClick={() => setIsCreateModalOpen(true)}><Plus size={16} /></button>
                                <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors"><MoreVertical size={16} /></button>
                            </div>
                        </div>

                        {/* Interactive Loops Container */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-4 custom-scrollbar">
                            {filteredTopics.length === 0 ? (
                                <div className="text-center text-zinc-500 italic py-12 font-mono text-xs">
                                    No tracked concepts found matching the current vector scope.
                                </div>
                            ) : (
                                filteredTopics.map((topic) => (
                                    <div
                                        key={topic.id}
                                        className={`p-5 rounded-2xl bg-zinc-900/10 border border-white/5 ${topic.borderColor} transition-all duration-300 flex flex-col gap-4`}
                                    >
                                        {/* Row Meta Header */}
                                        <div className="flex items-start justify-between gap-4">
                                            <div className="min-w-0">
                                                <div className="flex items-center gap-2.5 flex-wrap">
                                                    <span className={`text-[9px] font-mono font-black tracking-widest px-2 py-0.5 rounded-sm bg-white/5 border border-white/5 ${topic.color}`}>
                                                        {topic.category}
                                                    </span>
                                                    <span className="text-zinc-700 font-mono text-xs">•</span>
                                                    <span className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase bg-zinc-900 px-2 py-0.5 rounded-sm border border-white/5">
                                                        {topic.method.replace('_', ' ')} METHOD
                                                    </span>
                                                </div>
                                                <h3 className="text-md font-bold text-zinc-200 mt-2 tracking-tight hover:text-white transition-colors">
                                                    {topic.title}
                                                </h3>
                                            </div>

                                            <div className="text-right shrink-0 flex items-center gap-4">
                                                <div className="font-mono hidden sm:block">
                                                    <p className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Pulse Cycle</p>
                                                    <p className="text-[10px] text-zinc-400 font-medium mt-0.5">{topic.lastActivity}</p>
                                                </div>
                                                <span className="text-xs font-mono font-black text-zinc-300 bg-zinc-900/60 border border-white/5 px-2.5 py-1.5 rounded-lg">
                                                    {topic.progress}%
                                                </span>
                                            </div>
                                        </div>

                                        {/* Modular Dynamic Track Layout Engine */}
                                        <div className="p-3.5 bg-black/40 rounded-xl border border-white/5 mt-1">

                                            {/* Type 1: Spaced Repetition Array Control */}
                                            {topic.method === 'SPACED_REPETITION' && (
                                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                                    {topic.intervals.map((interval, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => toggleInterval(topic.id, idx)}
                                                            className={`p-3 rounded-xl border cursor-pointer select-none transition-all flex flex-col justify-between gap-2 active:scale-95 ${interval.completed
                                                                ? 'bg-blue-500/5 border-blue-500/20 text-blue-300'
                                                                : 'bg-zinc-950/40 border-white/5 text-zinc-500 hover:border-zinc-800'
                                                                }`}
                                                        >
                                                            <div className="flex items-center justify-between gap-1">
                                                                <span className="text-[10px] font-bold tracking-tight font-mono">{interval.label}</span>
                                                                {interval.completed ? <CheckCircle2 size={13} className="text-blue-400 shrink-0" /> : <Clock size={11} className="text-zinc-600 shrink-0" />}
                                                            </div>
                                                            <span className="text-[9px] font-mono opacity-60 text-right">{interval.date}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Type 2: Nested Sub-Topic Checklist Stack */}
                                            {topic.method === 'CHECKLIST' && (
                                                <div className="space-y-2">
                                                    {topic.checklist.map((item, idx) => (
                                                        <div
                                                            key={idx}
                                                            onClick={() => toggleChecklistItem(topic.id, idx)}
                                                            className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-white/2 cursor-pointer select-none transition-colors group/item"
                                                        >
                                                            <div className={`w-4 h-4 rounded-md border flex items-center justify-center transition-all shrink-0 ${item.completed ? 'bg-purple-600 border-purple-500 text-white' : 'border-zinc-700 group-hover/item:border-zinc-500'
                                                                }`}>
                                                                {item.completed && <Check size={11} strokeWidth={3} />}
                                                            </div>
                                                            <span className={`text-xs font-medium transition-all ${item.completed ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>
                                                                {item.item || item.title}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* Type 3: Sequential Milestone Log Timeline */}
                                            {topic.method === 'MILESTONE_LOG' && (
                                                <div className="space-y-3 py-1">
                                                    {topic.milestones.map((ms, idx) => (
                                                        <div key={idx} className="flex items-center justify-between gap-4 group/ms">
                                                            <div className="flex items-center gap-3 min-w-0">
                                                                <button
                                                                    onClick={() => advanceMilestone(topic.id, idx)}
                                                                    className={`w-5 h-5 rounded-full border flex items-center justify-center transition-all shrink-0 active:scale-90 ${ms.completed ? 'bg-amber-500/10 border-amber-500/40 text-amber-400' : 'bg-zinc-950 border-white/5 text-zinc-600 hover:text-zinc-400 hover:border-zinc-700'
                                                                        }`}
                                                                >
                                                                    {ms.completed ? <Check size={10} strokeWidth={3} /> : <ChevronRight size={10} />}
                                                                </button>
                                                                <span className={`text-xs font-medium truncate ${ms.completed ? 'text-zinc-500 font-normal' : 'text-zinc-300 font-bold'}`}>
                                                                    {ms.title}
                                                                </span>
                                                            </div>
                                                            <span className={`text-[8px] font-mono px-2 py-0.5 rounded-sm font-black border tracking-wider shrink-0 uppercase ${ms.status === 'Logged' ? 'bg-emerald-500/5 text-emerald-400 border-emerald-500/10' :
                                                                ms.status === 'Pending Sync' ? 'bg-amber-500/5 text-amber-400 border-amber-500/10' :
                                                                    'bg-zinc-900 text-zinc-600 border-white/5'
                                                                }`}>
                                                                {ms.status}
                                                            </span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* Custom Track Generator Modal Popover */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#0c0c0e] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">

                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950/40">
                            <div>
                                <h3 className="text-md font-bold text-white flex items-center gap-2">
                                    <Terminal size={16} className="text-emerald-500" /> Initialize Knowledge Tracker
                                </h3>
                                <p className="text-[10px] font-mono text-zinc-500 tracking-wider mt-0.5">Scaffold cognitive absorption parameters</p>
                            </div>
                            <button onClick={() => setIsCreateModalOpen(false)} className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateTopic} className="p-6 space-y-5">
                            {/* Workflow Method Selector Toggles */}
                            <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Tracking Workflow Strategy</label>
                                <div className="grid grid-cols-3 p-1 bg-black rounded-xl border border-white/5 gap-1">
                                    {[
                                        { id: 'SPACED_REPETITION', label: 'Spaced Rep' },
                                        { id: 'CHECKLIST', label: 'Checklist' },
                                        { id: 'MILESTONE_LOG', label: 'Milestone Paths' }
                                    ].map(btn => (
                                        <button
                                            key={btn.id}
                                            type="button"
                                            onClick={() => setTrackMethod(btn.id)}
                                            className={`py-2 text-[10px] font-bold rounded-lg transition-all font-mono uppercase tracking-tight ${trackMethod === btn.id ? 'bg-zinc-900 text-white border border-white/5' : 'text-zinc-500 hover:text-zinc-300'
                                                }`}
                                        >
                                            {btn.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Base Fields Input Groups */}
                            <div className="space-y-4">
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Knowledge Topic Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={newTopic.title}
                                        onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                                        placeholder="e.g., Vector Database Indexing Mechanics"
                                        className="w-full bg-black border border-white/5 focus:border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-emerald-500/10 text-zinc-200 transition-all"
                                    />
                                </div>
                                <div className="flex flex-col gap-1.5">
                                    <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Classification Domain</label>
                                    <select
                                        value={newTopic.category}
                                        onChange={(e) => setNewTopic({ ...newTopic, category: e.target.value })}
                                        className="w-full bg-black border border-white/5 focus:border-emerald-500/30 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none text-zinc-300 transition-all"
                                    >
                                        <option value="SYSTEM DESIGN">SYSTEM DESIGN</option>
                                        <option value="ENGINEERING CORE">ENGINEERING CORE</option>
                                        <option value="MACHINE LEARNING">MACHINE LEARNING</option>
                                        <option value="DATA ARCHITECTURE">DATA ARCHITECTURE</option>
                                    </select>
                                </div>

                                {/* Checklist Specific Variable Field */}
                                {trackMethod === 'CHECKLIST' && (
                                    <div className="flex flex-col gap-1.5 animate-in fade-in duration-150">
                                        <label className="text-[10px] font-mono text-purple-400 uppercase tracking-widest font-black">Sub-Tasks (One per line)</label>
                                        <textarea
                                            rows={3}
                                            value={newTopic.subtasks}
                                            onChange={(e) => setNewTopic({ ...newTopic, subtasks: e.target.value })}
                                            placeholder="Core Sub-Concept A&#10;Core Sub-Concept B&#10;Core Sub-Concept C"
                                            className="w-full bg-black border border-white/5 focus:border-purple-500/30 rounded-xl p-3 text-xs font-mono placeholder:text-zinc-700 text-zinc-200 focus:outline-none transition-all resize-none"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Modal Operational Footer Controls */}
                            <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                                <button type="button" onClick={() => setIsCreateModalOpen(false)} className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                                <button type="submit" className="px-5 py-2.5 rounded-xl text-xs font-black tracking-widest bg-emerald-600 hover:bg-emerald-500 text-white shadow-lg shadow-emerald-600/10 transition-all active:scale-95">
                                    MOUNT NODE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

/* Helper Component: Metric Card (Reuses Blog API-Card architecture layout parameters) */
const MetricCard = ({ label, value, icon }) => (
    <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5 flex flex-col justify-between gap-2 hover:border-zinc-900 transition-all">
        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.18em] flex items-center gap-2">
            <span className="text-zinc-400">{icon}</span> {label}
        </span>
        <span className="text-xl font-mono font-black text-zinc-200">{value}</span>
    </div>
);

export default Track;