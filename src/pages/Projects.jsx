import React, { useState } from 'react';
import {
    FolderPlus, MoreVertical, ExternalLink,
    Layers, Cpu, Globe, Palette, X, Sparkles,
    CheckCircle2, ArrowLeft, Terminal, Code2, Clock, Search, Plus
} from 'lucide-react';

const Projects = () => {
    // Structural states
    const [selectedProject, setSelectedProject] = useState(null);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [aiModeActive, setAiModeActive] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    // Controlled Form State for Creation Modal
    const [newProject, setNewProject] = useState({
        name: '',
        category: 'WEB APPLICATION',
        prompt: ''
    });

    const [projects, setProjects] = useState([
        {
            id: 1,
            name: "Neural Nexus AI",
            category: "MACHINE LEARNING",
            status: "Active",
            progress: 75,
            color: "bg-blue-500",
            textColor: "text-blue-400",
            borderColor: "hover:border-blue-500/20",
            icon: <Cpu size={14} />,
            modules: [
                { title: "Vector Embeddings Engine", completed: true, complexity: "High" },
                { title: "LLM Context Window Pipeline", completed: true, complexity: "Medium" },
                { title: "Streaming Response API Layer", completed: false, complexity: "High" },
                { title: "Fine-Tuning Dashboard UI", completed: false, complexity: "Low" }
            ]
        },
        {
            id: 2,
            name: "TrackMe Dashboard",
            category: "WEB APPLICATION",
            status: "Review",
            progress: 90,
            color: "bg-purple-500",
            textColor: "text-purple-400",
            borderColor: "hover:border-purple-500/20",
            icon: <Layers size={14} />,
            modules: [
                { title: "Workspace Core Context State", completed: true, complexity: "Medium" },
                { title: "Dynamic Sidebar Navigation Redesign", completed: true, complexity: "Low" },
                { title: "Kanban Drag-and-Drop Lifecycle", completed: true, complexity: "High" },
                { title: "Analytics Realtime Aggregations", completed: false, complexity: "Medium" }
            ]
        },
        {
            id: 3,
            name: "Global Sourcing",
            category: "E-COMMERCE",
            status: "Planning",
            progress: 20,
            color: "bg-emerald-500",
            textColor: "text-emerald-400",
            borderColor: "hover:border-emerald-500/20",
            icon: <Globe size={14} />,
            modules: [
                { title: "Multi-Currency Edge Localization", completed: true, complexity: "High" },
                { title: "GraphQL Supplier Schema Design", completed: false, complexity: "Medium" },
                { title: "Stripe Connect Split Ledger", completed: false, complexity: "High" }
            ]
        },
        {
            id: 4,
            name: "Brand Identity v2",
            category: "DESIGN",
            status: "On Hold",
            progress: 45,
            color: "bg-rose-500",
            textColor: "text-rose-400",
            borderColor: "hover:border-rose-500/20",
            icon: <Palette size={14} />,
            modules: [
                { title: "Vector Asset System Definition", completed: true, complexity: "Low" },
                { title: "Design Token Export Automations", completed: false, complexity: "Medium" },
                { title: "Typography Scale Matrix Docs", completed: false, complexity: "Low" }
            ]
        }
    ]);

    // Filter engine mapping text inputs to list rows
    const filteredProjects = projects.filter(proj =>
        proj.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        proj.category?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateProject = (e) => {
        e.preventDefault();
        const createdNode = {
            id: Date.now(),
            name: newProject.name || (aiModeActive ? "AI Generated Spec Archetype" : "Untitled Architecture Module"),
            category: newProject.category,
            status: "Planning",
            progress: aiModeActive ? 15 : 0,
            color: "bg-blue-500",
            textColor: "text-blue-400",
            borderColor: "hover:border-blue-500/20",
            icon: <Code2 size={14} />,
            modules: aiModeActive ? [
                { title: "AI Generated System Blueprint Specification", completed: true, complexity: "Low" },
                { title: "Auto Scaffold Controller Mapping", completed: false, complexity: "High" }
            ] : [
                { title: "Initial Base Code Assembly Initialization", completed: false, complexity: "Low" }
            ]
        };

        setProjects([createdNode, ...projects]);
        setIsCreateModalOpen(false);
        setNewProject({ name: '', category: 'WEB APPLICATION', prompt: '' });
        setAiModeActive(false);
    };

    return (
        <div className="flex-1 min-h-screen bg-black text-white selection:bg-blue-500/30">
            <main className="flex-1 flex flex-col relative overflow-hidden">

                {/* Visual Backdrop Ambient Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-10 w-160 h-160 bg-violet-500/5 rounded-full blur-[140px]" />
                </div>

                <div className="relative z-10 p-6 md:p-10 flex flex-col h-full max-w-7xl mx-auto w-full">

                    {/* Top Workspace Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            {selectedProject && (
                                <button
                                    onClick={() => setSelectedProject(null)}
                                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-white/5 text-zinc-400 hover:text-white text-[10px] font-bold uppercase tracking-wider mb-3 active:scale-95 transition-all"
                                >
                                    <ArrowLeft size={12} /> Back to Hub
                                </button>
                            )}
                            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 bg-clip-text text-transparent bg-linear-to-b from-white via-zinc-200 to-zinc-400">
                                Project Forge
                            </h1>
                            <p className="text-zinc-400 text-sm mt-1.5 font-medium">
                                {selectedProject ? "Inspecting nested micro-services and deployment blueprints." : "Manage system architecture nodes and track development pipeline completion."}
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 border border-white/5 hover:border-white/10 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-all backdrop-blur-md active:scale-95">
                                <Code2 size={15} />
                                Architecture Metrics
                            </button>
                            <button
                                className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg shadow-violet-600/25 hover:scale-[1.02] active:scale-95"
                                onClick={() => { handleClear(); setIsCreateModalOpen(true); }}
                            >
                                <Plus size={16} />
                                Create Project
                            </button>
                        </div>
                    </div>

                    {/* Top Stats Overview Block (Matches your metric style exactly) */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-5 mb-10">
                        <MetricCard label="Active Projects" value={String(projects.length).padStart(2, '0')} icon={<Layers size={13} />} />
                        <MetricCard label="Completed Systems" value="08" icon={<CheckCircle2 size={13} />} />
                        <MetricCard label="In-Flight Tasks" value={String(projects.filter(p => p.status === 'Active' || p.status === 'Review').length).padStart(2, '0')} icon={<Clock size={13} />} />
                        <MetricCard label="System Efficiency" value="94%" icon={<Terminal size={13} />} />
                    </div>

                    {/* Main Content Terminal Sheet */}
                    <div className="flex-1 bg-zinc-950/40 border border-white/5 rounded-3xl flex flex-col shadow-2xl backdrop-blur-md overflow-hidden">

                        {/* Control Toolbar (Matches your search toolbar exactly) */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/20 backdrop-blur-xs gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search project components..."
                                    className="w-full bg-black/60 border border-white/5 focus:border-violet-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-mono placeholder:text-zinc-600 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-violet-500/10 transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <div className="h-2 w-2 rounded-full bg-violet-500 animate-pulse shadow-[0_0_8px_#8b5cf6]" title="System connected" />
                                <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors" onClick={() => setIsCreateModalOpen(true)}><Plus size={16} /></button>
                                <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors"><MoreVertical size={16} /></button>
                            </div>
                        </div>

                        {/* List Area */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
                            {!selectedProject ? (
                                /* PROJECT LIST RUN (Like your Blog Items) */
                                filteredProjects.length === 0 ? (
                                    <div className="text-center text-zinc-500 italic py-10 font-mono text-xs">
                                        No structural project components found.
                                    </div>
                                ) : (
                                    filteredProjects.map((proj) => (
                                        <ProjectListItem
                                            key={proj.id}
                                            project={proj}
                                            onInspect={() => setSelectedProject(proj)}
                                        />
                                    ))
                                )
                            ) : (
                                /* DETAILED SUB-MODULE VIEW */
                                <div className="animate-in fade-in duration-200 space-y-4">
                                    <div className="p-4 rounded-xl bg-zinc-900/40 border border-violet-500/10 flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <span className={`text-xs font-black tracking-widest px-2 py-0.5 rounded-md uppercase font-mono ${selectedProject.textColor} bg-white/5 border border-white/5`}>
                                                {selectedProject.category}
                                            </span>
                                            <span className="text-zinc-500 font-mono text-xs">•</span>
                                            <span className="text-xs font-mono text-zinc-400 font-bold">{selectedProject.progress}% Finished</span>
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(null)}
                                            className="text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
                                        >
                                            [Exit Inspection]
                                        </button>
                                    </div>

                                    <div className="space-y-2.5">
                                        {selectedProject.modules?.map((mod, idx) => (
                                            <div key={idx} className="flex items-center justify-between p-4 bg-zinc-900/10 border border-white/5 rounded-xl">
                                                <div className="flex items-center gap-3 min-w-0">
                                                    {mod.completed ? (
                                                        <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
                                                    ) : (
                                                        <Clock size={15} className="text-zinc-600 shrink-0" />
                                                    )}
                                                    <span className={`text-xs font-medium truncate ${mod.completed ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>
                                                        {mod.title}
                                                    </span>
                                                </div>
                                                <span className="text-[8px] font-mono px-2 py-0.5 rounded-sm font-black bg-zinc-800 border border-white/5 text-zinc-400 tracking-wider">
                                                    {mod.complexity} LOAD
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>

            {/* AI Architecture Scaffold Generator Modal */}
            {isCreateModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-[#0c0c0e] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200">

                        <div className="flex items-center justify-between p-6 border-b border-white/5 bg-zinc-950/40">
                            <div>
                                <h3 className="text-md font-bold text-white flex items-center gap-2">
                                    {aiModeActive ? <Sparkles size={16} className="text-amber-400 animate-pulse" /> : <Code2 size={16} className="text-violet-500" />}
                                    {aiModeActive ? "AI Copilot System Architect" : "Standard Project Blueprint"}
                                </h3>
                                <p className="text-[10px] font-mono text-zinc-500 tracking-wider mt-0.5">Scaffold application operational matrices</p>
                            </div>
                            <button onClick={() => { setIsCreateModalOpen(false); setAiModeActive(false); }} className="text-zinc-500 hover:text-white p-1 rounded-lg hover:bg-white/5 transition-all">
                                <X size={16} />
                            </button>
                        </div>

                        <form onSubmit={handleCreateProject} className="p-6 space-y-5">
                            <div className="grid grid-cols-2 p-1 bg-black rounded-xl border border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setAiModeActive(false)}
                                    className={`py-2 text-xs font-bold rounded-lg transition-all ${!aiModeActive ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    Manual Input
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setAiModeActive(true)}
                                    className={`py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${aiModeActive ? 'bg-linear-to-r from-amber-500/20 to-orange-500/20 text-amber-400 border border-amber-500/20 shadow-md' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    <Sparkles size={12} /> AI Copilot Mode
                                </button>
                            </div>

                            {!aiModeActive ? (
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Project Identifier Name</label>
                                        <input
                                            type="text"
                                            required={!aiModeActive}
                                            value={newProject.name}
                                            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                                            placeholder="e.g., Hyperion Cache Array"
                                            className="w-full bg-black border border-white/5 focus:border-violet-500/30 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-violet-500/10 text-zinc-200 transition-all"
                                        />
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-black">Classification Stack</label>
                                        <select
                                            value={newProject.category}
                                            onChange={(e) => setNewProject({ ...newProject, category: e.target.value })}
                                            className="w-full bg-black border border-white/5 focus:border-violet-500/30 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none text-zinc-300 transition-all"
                                        >
                                            <option value="WEB APPLICATION">WEB APPLICATION</option>
                                            <option value="MACHINE LEARNING">MACHINE LEARNING</option>
                                            <option value="E-COMMERCE">E-COMMERCE</option>
                                            <option value="DESIGN">DESIGN SYSTEM</option>
                                        </select>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="flex flex-col gap-1.5">
                                        <label className="text-[10px] font-mono text-amber-400/90 uppercase tracking-widest font-black">AI Architecture Prompt</label>
                                        <textarea
                                            required={aiModeActive}
                                            rows={4}
                                            value={newProject.prompt}
                                            onChange={(e) => setNewProject({ ...newProject, prompt: e.target.value })}
                                            placeholder="Describe the application architecture system objectives. AI will auto-scaffold operational scopes..."
                                            className="w-full bg-black border border-white/5 focus:border-amber-500/30 rounded-xl p-4 text-xs font-mono leading-relaxed placeholder:text-zinc-600 focus:outline-none text-zinc-200 transition-all resize-none"
                                        />
                                    </div>
                                </div>
                            )}

                            <div className="pt-4 border-t border-white/5 flex justify-end gap-3">
                                <button type="button" onClick={() => { setIsCreateModalOpen(false); setAiModeActive(false); }} className="px-4 py-2 rounded-xl text-xs font-bold text-zinc-400 hover:text-white transition-colors">Cancel</button>
                                <button type="submit" className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-widest shadow-lg transition-all active:scale-95 ${aiModeActive ? 'bg-linear-to-r from-amber-500 to-orange-600 text-white shadow-amber-500/10' : 'bg-violet-600 text-white shadow-violet-600/10'}`}>
                                    {aiModeActive ? "GENERATE SCAFFOLD" : "DEPLOY ARCHETYPE"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

/* Helper Metric Card Component (Matches your Blog ApiCard) */
const MetricCard = ({ label, value, icon }) => (
    <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5 flex flex-col justify-between gap-2">
        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.18em] flex items-center gap-2">
            <span className="text-zinc-400">{icon}</span> {label}
        </span>
        <span className="text-xl font-mono font-black text-zinc-200">{value}</span>
    </div>
);

/* Row Project Card Component (Matches your BlogListItem perfectly) */
const ProjectListItem = ({ project, onInspect }) => (
    <div
        onClick={onInspect}
        className={`group flex items-center justify-between p-4 rounded-xl bg-zinc-900/10 border border-white/5 ${project.borderColor} hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer select-none active:scale-[0.99]`}
    >
        <div className="flex items-center gap-4 min-w-0">
            {/* Pulsing Status Dot */}
            <div className="relative flex shrink-0">
                <span className={`animate-ping absolute inline-flex h-2 w-2 rounded-full ${project.color} opacity-20`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${project.color} shadow-lg`}></span>
            </div>

            <div className="min-w-0">
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-violet-400 transition-colors truncate pr-2">
                    {project.name}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-zinc-500 font-mono font-bold uppercase tracking-wider">{project.category}</span>
                    <span className="text-zinc-800 text-xs">•</span>
                    <span className="text-[10px] text-zinc-500 font-mono font-medium">{project.progress}% Complete</span>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-4">
            <span className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider bg-zinc-800 text-zinc-400 border border-white/5 font-mono">
                {project.status}
            </span>
            <button className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-white/5 transition-all">
                <ExternalLink size={14} />
            </button>
        </div>
    </div>
);

export default Projects;