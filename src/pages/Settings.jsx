import React, { useState } from "react";
import Input from "../components/common/Input";
import Select from "../components/common/SelectInput";
import {
    Palette, ShieldCheck, Database,
    Bell, Globe, Trash2, Key,
    Monitor, Moon, Sun, RefreshCw
} from "lucide-react";

const Settings = () => {
    const [theme, setTheme] = useState("obsidian");

    const themeOptions = [
        { label: "Deep Obsidian (Default)", value: "obsidian" },
        { label: "Midnight Blue", value: "midnight" },
        { label: "Matrix Green", value: "matrix" },
        { label: "Cyberpunk Red", value: "cyber" },
    ];

    return (
        <div className="flex-1 min-h-screen bg-[#030303] border-l border-white/5">
            <div className=" flex flex-col relative overflow-hidden">

                {/* Background Accent */}
                <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/5 rounded-full blur-[120px] pointer-events-none" />

                <div className="relative z-10 p-10 max-w-5xl mx-auto w-full">

                    {/* Header */}
                    <div className="mb-12">
                        <h1 className="text-3xl font-black tracking-tighter text-white uppercase italic">System Configuration</h1>
                        <p className="text-zinc-500 text-sm font-medium mt-1">Manage your environment variables and security protocols.</p>
                    </div>

                    <div className="space-y-10">

                        {/* Section 1: Appearance */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/5">
                            <div className="space-y-2">
                                <h3 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
                                    <Palette size={16} className="text-blue-500" /> Appearance
                                </h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">Customize the visual interface of your OS workspace.</p>
                            </div>

                            <div className="md:col-span-2 space-y-6">
                                <Select
                                    label="Interface Theme"
                                    options={themeOptions}
                                    value={theme}
                                    onChange={(val) => setTheme(val)}
                                />
                                <div className="grid grid-cols-3 gap-4">
                                    <ThemePreview label="Obsidian" active={theme === 'obsidian'} color="bg-zinc-900" />
                                    <ThemePreview label="Midnight" active={theme === 'midnight'} color="bg-blue-950" />
                                    <ThemePreview label="Matrix" active={theme === 'matrix'} color="bg-emerald-950" />
                                </div>
                            </div>
                        </section>

                        {/* Section 2: Security & Credentials */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-white/5">
                            <div className="space-y-2">
                                <h3 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-blue-500" /> Authentication
                                </h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">Rotate your security keys and update login credentials.</p>
                            </div>

                            <div className="md:col-span-2 space-y-6">
                                <div className="p-6 rounded-2xl bg-white/2 border border-white/5 space-y-4">
                                    <Input label="Current Password" type="password" icon={Key} placeholder="••••••••" />
                                    <Input label="New Password" type="password" icon={Key} placeholder="••••••••" />
                                    <div className="flex justify-end pt-2">
                                        <button className="px-6 py-2 bg-white text-black text-[10px] font-black uppercase rounded-lg hover:bg-blue-50 transition-all">
                                            Reset Password
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Section 3: System & Danger Zone */}
                        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="space-y-2">
                                <h3 className="text-sm font-black text-white uppercase tracking-tight flex items-center gap-2">
                                    <Database size={16} className="text-blue-500" /> Data Management
                                </h3>
                                <p className="text-xs text-zinc-500 leading-relaxed">Export your data or clear system cache.</p>
                            </div>

                            <div className="md:col-span-2 space-y-4">
                                <div className="flex items-center justify-between p-4 rounded-xl bg-white/2 border border-white/5 hover:bg-white/4 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <RefreshCw size={18} className="text-zinc-500 group-hover:rotate-180 transition-transform duration-500" />
                                        <div>
                                            <p className="text-xs font-bold text-zinc-300 uppercase">Clear System Cache</p>
                                            <p className="text-[10px] text-zinc-600">Free up local storage used by the OS.</p>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-black text-zinc-500 hover:text-white uppercase tracking-widest">Execute</button>
                                </div>

                                <div className="flex items-center justify-between p-4 rounded-xl bg-red-500/5 border border-red-500/10 hover:bg-red-500/10 transition-all group">
                                    <div className="flex items-center gap-3">
                                        <Trash2 size={18} className="text-red-500/50 group-hover:text-red-500" />
                                        <div>
                                            <p className="text-xs font-bold text-red-500 uppercase">Delete Account</p>
                                            <p className="text-[10px] text-red-900/60">Permanently remove all data and projects.</p>
                                        </div>
                                    </div>
                                    <button className="text-[10px] font-black text-red-500 uppercase tracking-widest underline-offset-4 hover:underline">Terminate</button>
                                </div>
                            </div>
                        </section>

                    </div>
                </div>
            </div>
        </div>
    );
};

/* Helper Component: Theme Preview */
const ThemePreview = ({ label, active, color }) => (
    <div className={`p-2 rounded-xl border transition-all cursor-pointer ${active ? 'border-blue-500 bg-blue-500/5 shadow-[0_0_15px_rgba(59,130,246,0.2)]' : 'border-white/5 bg-white/2 hover:border-white/20'}`}>
        <div className={`h-12 w-full rounded-lg ${color} mb-2 shadow-inner`} />
        <span className={`text-[9px] font-black uppercase tracking-widest block text-center ${active ? 'text-blue-400' : 'text-zinc-600'}`}>
            {label}
        </span>
    </div>
);

export default Settings;