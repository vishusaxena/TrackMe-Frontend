import React, { useState } from 'react';
import {
    Code2, Copy, Search, Plus,
    Cpu, ChevronRight, Terminal,
    Layers, Zap, Command
} from 'lucide-react';

const CodeVault = () => {
    const [selectedStack, setSelectedStack] = useState('All');
    const stacks = ['All', 'React', 'Node.js', 'Tailwind', 'Python', 'Go'];

    return (
        /* Main Container: Bleeds from sidebar black into deep obsidian */
        <div className='flex-1 min-h-screen bg-[#030303] border-l border-white/5'>
            <div className=" flex flex-col relative overflow-hidden">

                {/* Cinematic Glow - Positioned to illuminate the top workspace */}
                <div className="absolute top-0 left-0 w-full h-125 bg-[radial-gradient(circle_at_20%_0%,#1e293b_0%,transparent_70%)] opacity-40 pointer-events-none" />

                {/* Subtle Dotted Pattern */}
                <div className="absolute inset-0 opacity-[0.05] bg-[radial-gradient(#ffffff_1px,transparent_1px)] bg-size-[32px_32px] pointer-events-none" />

                <div className="relative z-10 p-10 flex flex-col h-full max-w-7xl mx-auto w-full">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-[10px] font-black text-blue-500 uppercase tracking-widest">
                                    Assets Library
                                </div>
                            </div>
                            <h1 className="text-4xl font-black tracking-tighter text-white flex items-center gap-3">
                                CODE VAULT
                            </h1>
                            <p className="text-zinc-500 text-sm font-medium max-w-md">
                                Standardized logic fragments and UI patterns to accelerate your deployment cycle.
                            </p>
                        </div>

                        <button className="group flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-blue-50 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-white/5">
                            <Plus size={18} className="group-hover:rotate-90 transition-transform duration-300" />
                            Save Snippet
                        </button>
                    </div>

                    {/* Filter & Command Bar */}
                    <div className="flex flex-col md:flex-row items-center gap-4 mb-10">
                        <div className="relative w-full md:w-96 group">
                            <div className="absolute inset-0 bg-blue-500/5 rounded-xl blur-md opacity-0 group-focus-within:opacity-100 transition-opacity" />
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-blue-500 transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Find logic... (CMD + K)"
                                className="relative w-full bg-white/3 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-sm text-zinc-300 focus:outline-none focus:border-blue-500/40 transition-all placeholder:text-zinc-700"
                            />
                        </div>

                        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-white/2 border border-white/5 backdrop-blur-sm overflow-x-auto no-scrollbar">
                            {stacks.map((stack) => (
                                <button
                                    key={stack}
                                    onClick={() => setSelectedStack(stack)}
                                    className={`whitespace-nowrap px-5 py-2 rounded-xl text-[11px] font-bold tracking-wider uppercase transition-all ${selectedStack === stack
                                        ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5'
                                        : 'text-zinc-500 hover:text-zinc-300 hover:bg-white/5 border border-transparent'
                                        }`}
                                >
                                    {stack}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Vault Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                        <VaultCard
                            title="Auth Protector"
                            stack="Node.js"
                            tags={['Auth', 'JWT']}
                            description="HOC for protecting private routes in Express.js."
                            code="const isAuth = (req, res, next) => ..."
                            icon={<Zap size={18} />}
                        />

                        <VaultCard
                            title="Modern Glass Card"
                            stack="Tailwind"
                            tags={['UI', 'Glass']}
                            description="Tailwind config for high-fidelity glassmorphism."
                            code="bg-opacity-10 backdrop-filter blur-lg..."
                            icon={<Layers size={18} />}
                        />

                        <VaultCard
                            title="Fetch Hook"
                            stack="React"
                            tags={['Logic', 'Hooks']}
                            description="Standardized useFetch with auto-loading and error states."
                            code="const { data, loading } = useFetch(url)..."
                            icon={<Command size={18} />}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

const VaultCard = ({ title, stack, tags, description, code, icon }) => (
    <div className="group relative bg-[#0a0a0b] border border-white/5 rounded-3xl p-6 hover:border-blue-500/30 transition-all duration-500 flex flex-col h-full overflow-hidden">
        {/* Subtle Hover Gradient */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-colors" />

        <div className="flex items-start justify-between mb-5 relative z-10">
            <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-white/3 border border-white/5 flex items-center justify-center text-zinc-400 group-hover:text-blue-400 group-hover:border-blue-500/20 transition-all duration-500 shadow-inner">
                    {icon}
                </div>
                <div>
                    <h3 className="text-[13px] font-black text-white uppercase tracking-tight">{title}</h3>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{stack}</p>
                </div>
            </div>
            <button className="p-2 rounded-lg hover:bg-blue-500/10 text-zinc-700 hover:text-blue-500 transition-all active:scale-90">
                <Copy size={16} />
            </button>
        </div>

        <p className="text-xs text-zinc-500 leading-relaxed mb-6 flex-1 relative z-10 font-medium">
            {description}
        </p>

        {/* Snippet Preview with Terminal Style */}
        <div className="bg-black/60 rounded-xl p-4 border border-white/5 mb-6 relative z-10">
            <div className="flex gap-1.5 mb-2">
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
                <div className="w-1.5 h-1.5 rounded-full bg-zinc-800" />
            </div>
            <code className="text-[10px] text-blue-400/70 font-mono truncate block">
                {code}
            </code>
        </div>

        <div className="flex items-center justify-between mt-auto relative z-10">
            <div className="flex items-center gap-2">
                {tags.map((tag) => (
                    <span key={tag} className="text-[9px] font-black px-2.5 py-1 rounded-lg bg-white/3 text-zinc-500 border border-white/5 group-hover:border-blue-500/10 group-hover:text-zinc-400 transition-colors">
                        {tag}
                    </span>
                ))}
            </div>
            <button className="text-[10px] font-black text-blue-600 uppercase tracking-tighter flex items-center gap-1 group/btn">
                Open <ChevronRight size={12} className="group-hover/btn:translate-x-1 transition-transform" />
            </button>
        </div>
    </div>
);

export default CodeVault;