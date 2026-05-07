import React, { useEffect, useState } from 'react';
import {
    CheckCircle2,
    Layers,
    TrendingUp,
    Calendar,
    ArrowUpRight,
    Clock
} from 'lucide-react';
import secureLocalStorage from 'react-secure-storage';
import { useSelector } from 'react-redux';
import { formatDate } from '../utils/Hooks';

const MainDashboard = () => {
    const { user } = useSelector((state) => state.auth);


    const stats = [
        { label: 'Active Projects', value: '12', icon: <Layers size={20} />, color: 'text-blue-400', bg: 'bg-blue-400/10' },
        { label: 'To-dos Pending', value: '08', icon: <CheckCircle2 size={20} />, color: 'text-violet-400', bg: 'bg-violet-400/10' },
        { label: 'Growth Score', value: '+14%', icon: <TrendingUp size={20} />, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
        { label: 'Hours Focused', value: '42h', icon: <Clock size={20} />, color: 'text-amber-400', bg: 'bg-amber-400/10' },
    ];

    return (
        <div className="flex-1 bg-black min-h-screen p-8 text-white overflow-y-auto">

            {/* --- HEADER SECTION --- */}
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Welcome back, <span className="bg-clip-text text-transparent bg-linear-to-r from-violet-500 to-indigo-400">{user.firstname} {user.lastname}</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1 flex items-center gap-2">
                        <Calendar size={14} /> Today is {formatDate()}
                    </p>
                </div>

                <button className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-violet-600 hover:text-white transition-all duration-300 shadow-lg shadow-white/5">
                    + NEW PROJECT
                </button>
            </header>

            {/* --- STATS GRID --- */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <div key={i} className="group bg-zinc-900/40 border border-white/5 p-5 rounded-2xl hover:border-violet-500/50 transition-all duration-500">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`${stat.bg} ${stat.color} p-2.5 rounded-xl`}>
                                {stat.icon}
                            </div>
                            <span className="text-zinc-600 group-hover:text-violet-400 transition-colors">
                                <ArrowUpRight size={18} />
                            </span>
                        </div>
                        <h3 className="text-zinc-400 text-xs font-bold tracking-widest uppercase">{stat.label}</h3>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            {/* --- MAIN CONTENT GRID --- */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Growth Chart Placeholder */}
                <div className="lg:col-span-2 bg-zinc-900/40 border border-white/5 rounded-3xl p-6 relative overflow-hidden">
                    <div className="flex justify-between items-center mb-8">
                        <h2 className="text-lg font-bold">Growth Activity</h2>
                        <select className="bg-black border border-white/10 text-xs rounded-lg px-2 py-1 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                        </select>
                    </div>
                    {/* Minimalist Graphic Representation */}
                    <div className="h-64 w-full flex items-end gap-2 px-2">
                        {[40, 70, 45, 90, 65, 80, 95].map((height, i) => (
                            <div
                                key={i}
                                style={{ height: `${height}%` }}
                                className="flex-1 bg-linear-to-t from-violet-600/20 to-violet-500 rounded-t-sm group relative"
                            >
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-violet-600 text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    {height}%
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Upcoming Milestones */}
                <div className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6">
                    <h2 className="text-lg font-bold mb-6">Milestones</h2>
                    <div className="space-y-6">
                        {[
                            { title: 'Portfolio Revamp', date: 'In 2 days', color: 'bg-blue-500' },
                            { title: 'Learn Three.js', date: 'Next week', color: 'bg-violet-500' },
                            { title: 'Read 5 Books', date: 'By March', color: 'bg-emerald-500' }
                        ].map((m, i) => (
                            <div key={i} className="flex gap-4">
                                <div className={`w-1 h-10 rounded-full ${m.color}`} />
                                <div>
                                    <p className="text-sm font-bold text-zinc-200">{m.title}</p>
                                    <p className="text-xs text-zinc-500">{m.date}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-8 py-3 border border-dashed border-white/10 rounded-xl text-xs text-zinc-500 hover:text-white hover:border-white/20 transition-all">
                        View All Milestones
                    </button>
                </div>

            </div>
        </div>
    );
};

export default MainDashboard;