import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { LogOut, User, Settings, LayoutGrid, ChevronDown, Heart } from 'lucide-react';
import Tooltip from "./common/ToolTip";
import { useSelector } from "react-redux";

const Navbar = () => {
    const { user } = useSelector((state) => state.auth);
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        secureLocalStorage.removeItem("token");
        navigate("/login", { replace: true });
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <nav className="fixed top-6 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
            <div className="backdrop-blur-md bg-white/2 border border-white/8 rounded-3xl px-6 py-2 flex items-center justify-between">

                {/* Brand */}
                <div className="flex items-center gap-2.5 group cursor-pointer" onClick={() => navigate("/")}>
                    <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-500 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                        <div className="w-3.5 h-3.5 bg-white rounded-full shadow-inner"></div>
                    </div>
                    <span className="text-xl font-bold text-white tracking-tighter">
                        trackme<span className="text-blue-500">.</span>
                    </span>
                </div>

                {/* Right Side */}
                <div className="flex items-center gap-5">
                    {/* Support Heart Icon */}
                    <button className="p-2.5 rounded-xl bg-white/3 border border-white/8 text-zinc-400 hover:text-red-400 hover:bg-red-400/10 transition-all duration-300 group">
                        <Tooltip text="Support Us!" position="bottom">
                            <Heart size={18} className="group-hover:fill-current" />
                        </Tooltip>
                    </button>

                    {/* Profile Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="flex items-center gap-2 p-1 pr-2 rounded-2xl bg-white/3 border border-white/8 hover:border-white/20 transition-all"
                        >
                            <img
                                src={
                                    user?.imageBase64
                                        ? !user?.googleLoggedIn
                                            ? user.imageBase64
                                            : `data:image/jpeg;base64,${user.imageBase64}`
                                        : "https://i.pravatar.cc/40?img=32"
                                }
                                alt="User"
                                className="w-8 h-8 rounded-xl object-cover grayscale hover:grayscale-0 transition-all"
                            />
                            <ChevronDown size={14} className={`text-zinc-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>

                        {isOpen && (
                            <div className="absolute right-0 mt-4 w-52 origin-top-right rounded-2xl bg-[#0a0a0b] border border-white/10 p-2 shadow-[0_30px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl animate-in fade-in zoom-in duration-200">
                                <div className="px-3 py-2 border-b border-white/5 mb-1">
                                    <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Signed in as</p>
                                    <p className="text-sm font-medium text-white truncate">{user.email}</p>
                                </div>
                                <DropdownItem icon={<LayoutGrid size={16} />} label="Dashboard" onClick={() => navigate("/dashboard")} />
                                <DropdownItem icon={<User size={16} />} label="Profile" onClick={() => navigate("/profile")} />
                                <DropdownItem icon={<Settings size={16} />} label="Settings" onClick={() => navigate("/dashboard/settings")} />
                                <div className="h-px bg-white/5 my-1" />
                                <button
                                    onClick={handleLogout}
                                    className="w-full flex items-center gap-3 px-3 py-2 rounded-xl text-red-400/80 hover:bg-red-500/10 transition-colors text-sm font-medium"
                                >
                                    <LogOut size={16} /> Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

const DropdownItem = ({ icon, label, onClick }) => (
    <button onClick={onClick} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-zinc-400 hover:text-white hover:bg-white/5 transition-all text-sm font-medium">
        {icon} {label}
    </button>
);

export default Navbar;