import React, { useState } from 'react';

const MasterPage = () => {
    // State for Tabs and Modal
    const [activeTab, setActiveTab] = useState('Skills Master');
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Dynamic Master Definitions (to simulate saved masters)
    const [masters, setMasters] = useState([
        { name: 'Skills Master', fields: ['Skill Name', 'Level', 'Category'] },
        { name: 'Certificate Master', fields: ['Certificate Name', 'Issuer', 'Expiry Date'] }
    ]);

    const activeMaster = masters.find(m => m.name === activeTab) || masters[0];

    return (
        <div className="flex-1 h-screen flex flex-col bg-[#030303] text-zinc-100 overflow-hidden font-sans">

            {/* 1. TOP HEADER */}
            <div className="flex justify-between items-end p-8 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Configuration <span className="text-violet-500">Masters</span></h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage dynamic data structures and records.</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-violet-600/20 active:scale-95"
                >
                    + Add New Master
                </button>
            </div>

            {/* 2. TABS SYSTEM */}
            <div className="px-8 flex gap-8 border-b border-zinc-900 overflow-x-auto no-scrollbar">
                {masters.map((m) => (
                    <button
                        key={m.name}
                        onClick={() => setActiveTab(m.name)}
                        className={`pb-4 text-sm font-medium whitespace-nowrap transition-all relative ${activeTab === m.name ? 'text-violet-500' : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                    >
                        {m.name}
                        {activeTab === m.name && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 shadow-[0_-4px_10px_rgba(139,92,246,0.5)]" />
                        )}
                    </button>
                ))}
            </div>

            {/* 3. MAIN CONTENT AREA (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-8 space-y-6">

                {/* DYNAMIC INPUT FORM */}
                <div className="bg-[#0a0a0a] border border-zinc-800/50 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6">Add New {activeMaster.name} Entry</h2>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                        {activeMaster.fields.map((field) => (
                            <div key={field} className="flex flex-col gap-2">
                                <label className="text-xs text-zinc-500 ml-1">{field}</label>
                                <input
                                    type="text"
                                    placeholder={`Enter ${field.toLowerCase()}...`}
                                    className="bg-zinc-950 border border-zinc-800 rounded-lg p-2.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 transition-all"
                                />
                            </div>
                        ))}
                        <div className="flex gap-2">
                            <button className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2.5 rounded-lg text-sm font-medium transition-colors">Reset</button>
                            <button className="flex-1 bg-violet-600 hover:bg-violet-700 py-2.5 rounded-lg text-sm font-medium transition-colors">Add</button>
                        </div>
                    </div>
                </div>

                {/* DATA TABLE SECTION */}
                <div className="bg-[#0a0a0a] border border-zinc-800/50 rounded-2xl overflow-hidden shadow-sm">
                    {/* Table Toolbar */}
                    <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/30">
                        <div className="flex items-center gap-3 w-1/3">
                            <input
                                type="text"
                                placeholder="Filter records..."
                                className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                            />
                        </div>
                        <div className="flex gap-2 items-center text-xs text-zinc-500">
                            <span>Showing 1-10 of 42</span>
                            <div className="flex gap-1 ml-4">
                                <button className="p-1.5 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors">Prev</button>
                                <button className="p-1.5 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors">Next</button>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-zinc-900/20 text-zinc-500 text-[11px] uppercase tracking-widest">
                                    <th className="px-6 py-4 font-semibold">ID</th>
                                    {activeMaster.fields.map(field => (
                                        <th key={field} className="px-6 py-4 font-semibold">{field}</th>
                                    ))}
                                    <th className="px-6 py-4 font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-900/50">
                                {[1, 2, 3, 4].map((item) => (
                                    <tr key={item} className="hover:bg-zinc-900/30 transition-colors group">
                                        <td className="px-6 py-4 text-xs text-zinc-500">#REC-{100 + item}</td>
                                        {activeMaster.fields.map(f => (
                                            <td key={f} className="px-6 py-4 text-sm text-zinc-300">Data Point {item}</td>
                                        ))}
                                        <td className="px-6 py-4">
                                            <div className="w-8 h-4 bg-zinc-800 rounded-full relative p-0.5 cursor-pointer">
                                                <div className="w-3 h-3 bg-violet-500 rounded-full absolute right-0.5" />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* 4. "CREATE NEW MASTER" MODAL */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 z-50">
                    <div className="bg-[#0a0a0a] border border-zinc-800 w-full max-w-lg rounded-2xl p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
                        <h2 className="text-2xl font-bold mb-2">Configure Master</h2>
                        <p className="text-zinc-500 text-sm mb-8 border-b border-zinc-900 pb-4">Define the structure for your new master data table.</p>

                        <div className="space-y-6">
                            {/* Master Name */}
                            <div className="flex flex-col gap-2">
                                <label className="text-xs font-semibold text-zinc-400">Master Name</label>
                                <input
                                    type="text"
                                    placeholder="e.g. Skill Master"
                                    className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:ring-1 focus:ring-violet-500 outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Number of Fields */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-zinc-400">Number of Fields</label>
                                    <input
                                        type="number"
                                        defaultValue={3}
                                        className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:ring-1 focus:ring-violet-500 outline-none"
                                    />
                                </div>
                                {/* Field Type Selection */}
                                <div className="flex flex-col gap-2">
                                    <label className="text-xs font-semibold text-zinc-400">Primary Field Type</label>
                                    <select className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:ring-1 focus:ring-violet-500 outline-none text-sm text-zinc-400">
                                        <option>Text Input</option>
                                        <option>Numeric</option>
                                        <option>Date Picker</option>
                                        <option>Dropdown List</option>
                                    </select>
                                </div>
                            </div>

                            {/* Options/Switches */}
                            <div className="bg-zinc-950 p-4 rounded-xl border border-zinc-900">
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="w-5 h-5 rounded-md border-zinc-700 bg-zinc-900 text-violet-600 focus:ring-violet-500 transition-all"
                                    />
                                    <div>
                                        <p className="text-sm font-medium group-hover:text-violet-400 transition-colors">Include Active/Inactive Switch</p>
                                        <p className="text-[10px] text-zinc-600 uppercase">System will add a status toggle by default</p>
                                    </div>
                                </label>
                            </div>
                        </div>

                        <div className="flex gap-4 mt-10">
                            <button onClick={() => setIsModalOpen(false)} className="flex-1 py-3 rounded-xl border border-zinc-800 hover:bg-zinc-900 font-medium transition-colors">Discard</button>
                            <button className="flex-1 py-3 rounded-xl bg-violet-600 hover:bg-violet-700 font-bold transition-all shadow-lg shadow-violet-600/20">Generate Master</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterPage;