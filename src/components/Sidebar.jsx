import React, { act, useState } from 'react';
import {
    LayoutDashboard,
    CheckSquare,
    Rocket,
    Target,
    TrendingUp,
    BookOpen,
    PenLine,
    Boxes,
    Lightbulb,
    Bot,
    FileText,
    Globe,
    Settings,
    ChevronRight,
    ChevronLeft,
    LogOut
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const Sidebar = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const navigate = useNavigate()
    const handleLogout = () => {
        secureLocalStorage.removeItem("token")
        navigate("/login", { replace: true });
    }

    const navItems = [
        { icon: <LayoutDashboard size={18} />, label: 'DASHBOARD', path: "/dashboard", active: true },

        { icon: <CheckSquare size={18} />, label: 'TO-DO', path: "/dashboard/todo", active: true },

        { icon: <Rocket size={18} />, label: 'PROJECT FORGE', path: "/dashboard/projects", active: true },

        { icon: <PenLine size={18} />, label: 'DEV JOURNAL', path: "/dashboard/journal", active: true },

        { icon: <Boxes size={18} />, label: 'CODE VAULT', path: "/dashboard/vault", active: false },

        { icon: <BookOpen size={18} />, label: 'STUDY OS', path: "/dashboard/study", active: false },

        { icon: <Lightbulb size={18} />, label: 'INNOVATION LAB', path: "/dashboard/lab", active: false },

        { icon: <Bot size={18} />, label: 'AI COPILOT', path: "/dashboard/copilot", active: false },

        { icon: <FileText size={18} />, label: 'RESUME ENGINE', path: "/dashboard/resume", active: false },

        { icon: <Settings size={18} />, label: 'SETTINGS', path: "/dashboard/settings", active: false },
    ];


    return (
        <div className={`sticky top-0 left-0 bg-black h-screen transition-all duration-300 p-4 flex flex-col border-r border-white/10 
      ${isCollapsed ? 'w-20' : 'w-60'}`}>

            {/* Collapse Toggle */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-8 bg-violet-600 rounded-full p-1 text-white hover:scale-110 transition-transform z-10"
            >
                {isCollapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>


            <div className={`group flex items-center gap-3 mb-6 px-2 cursor-pointer ${isCollapsed ? 'justify-center' : ''}`} onClick={() => navigate("/")}>
                {/* Icon with 90-degree rotation on hover */}
                <div className="w-7 h-7 bg-violet-600 rounded flex items-center justify-center transition-transform duration-500 group-hover:rotate-90">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                </div>

                {!isCollapsed && (
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-white to-zinc-400 tracking-tight transition-all duration-300">
                        trackme<span className="text-violet-600">.</span>
                    </span>
                )}
            </div>

            {/* Navigation */}
            <nav className="flex-1">
                <ul className="space-y-1">
                    {navItems.map((item, index) => {
                        return item.active && <li key={index}>
                            <button className={`w-full flex items-center gap-4 p-2.5 rounded-lg transition-all duration-200 group
                                ${item.path === window.location.pathname
                                    ? 'bg-violet-600 text-white shadow-lg shadow-violet-600/20'
                                    : 'text-zinc-500 hover:bg-zinc-900 hover:text-zinc-200'}`} onClick={() => { navigate(item?.path); }}>
                                <span className="shrink-0">
                                    {item.icon}
                                </span>
                                {!isCollapsed && (
                                    <span className="text-[10px] font-bold tracking-widest leading-none">
                                        {item.label}
                                    </span>
                                )}
                            </button>
                        </li>
                    })}
                </ul>
            </nav>

            {/* Footer */}
            <div className="mt-auto pt-4 border-t border-white/5">
                <button className={`flex items-center gap-4 p-2.5 w-full text-zinc-500 hover:text-red-400 transition-colors ${isCollapsed ? 'justify-center' : ''}`} onClick={handleLogout}>
                    <LogOut size={18} />
                    {!isCollapsed && <span className="text-[10px] font-bold tracking-widest">LOGOUT</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;