import axios from "axios";
import React, { useState } from "react";

const Register = () => {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: ""
    })

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            console.log(formData);
            const res = await axios.post(
                "http://localhost:5000/api/auth/register",
                formData
            );

            console.log(res.data);
        } catch (error) {
            console.error(error.response?.data || error.message);
        }
    };


    return (
        // Fixed height and overflow-hidden prevents page scrolling
        <div className="h-screen w-full flex bg-white selection:bg-violet-100 overflow-hidden">

            {/* Right Side: Form (Order 1 on mobile, 1 on desktop) */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create Account</h1>
                        <p className="text-slate-500 mt-2 font-medium">Start your 14-day free trial today.</p>
                    </div>

                    <form className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">First Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" autoComplete="off" onChange={(e) => setFormData({ ...formData, firstName: e.target.value })} value={formData.firstName} />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Last Name</label>
                                <input type="text" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" autoComplete="off" onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} value={formData.lastName} />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Email</label>
                            <input type="email" placeholder="you@example.com" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" autoComplete="off" onChange={(e) => setFormData({ ...formData, email: e.target.value })} value={formData.email} />
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Password</label>
                            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-4 focus:ring-violet-500/10 focus:border-violet-500 outline-none transition-all" autoComplete="off" onChange={(e) => setFormData({ ...formData, password: e.target.value })} value={formData.password} />
                        </div>

                        <div className="flex items-center gap-2 py-2">
                            <input type="checkbox" className="w-4 h-4 rounded border-slate-300 text-violet-600 focus:ring-violet-500 cursor-pointer" />
                            <label className="text-xs text-slate-500 font-medium leading-tight">
                                I agree to the <span className="text-violet-600 cursor-pointer hover:underline">Terms</span> and <span className="text-violet-600 cursor-pointer hover:underline">Privacy</span>.
                            </label>
                        </div>

                        <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-2xl shadow-slate-200 hover:bg-slate-800 transition-all active:scale-[0.98]" onClick={handleRegister}>
                            Create My Account
                        </button>
                    </form>

                    <p className="mt-8 text-center text-slate-400 text-sm font-medium">
                        Already have an account? <a href="/login" className="font-bold text-violet-600 hover:underline ml-1">Log in</a>
                    </p>
                </div>
            </div>

            {/* Left Side: Illustration / Visual (Order 2) */}
            <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center p-12">
                {/* Animated Architectural Pattern */}
                <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#818cf8_0.5px,transparent_0.5px)] bg-size-[24px_24px]" />

                {/* Soft Vector Aura */}
                <div className="absolute w-125 h-125 bg-violet-600/20 rounded-full blur-[120px]" />

                <div className="relative z-10 w-full max-w-lg">
                    {/* Mockup "Illustrator" Style Component */}
                    <div className="relative bg-white/5 backdrop-blur-xl rounded-4xl border border-white/10 p-8 shadow-2xl overflow-hidden group">

                        {/* Top Bar Decoration */}
                        <div className="flex gap-1.5 mb-8">
                            <div className="w-2 h-2 rounded-full bg-red-400/50" />
                            <div className="w-2 h-2 rounded-full bg-amber-400/50" />
                            <div className="w-2 h-2 rounded-full bg-emerald-400/50" />
                        </div>

                        {/* Vector Content Simulation */}
                        <div className="space-y-6">
                            <div className="h-6 bg-white/10 rounded-full w-3/4 animate-pulse" />
                            <div className="grid grid-cols-3 gap-4">
                                <div className="h-20 bg-linear-to-tr from-violet-500/20 to-indigo-500/20 rounded-2xl border border-white/5" />
                                <div className="h-20 bg-white/5 rounded-2xl border border-white/5" />
                                <div className="h-20 bg-white/5 rounded-2xl border border-white/5" />
                            </div>
                            <div className="space-y-3">
                                <div className="h-3 bg-white/10 rounded-full w-full" />
                                <div className="h-3 bg-white/10 rounded-full w-5/6" />
                                <div className="h-3 bg-white/10 rounded-full w-4/6" />
                            </div>

                            {/* "Floating" Vector Element */}
                            <div className="absolute -right-4 top-1/2 translate-y-[-50%] bg-violet-600 p-6 rounded-3xl shadow-2xl group-hover:-rotate-6 transition-transform duration-500">
                                <div className="w-12 h-12 bg-white/20 rounded-xl" />
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 text-center">
                        <h3 className="text-3xl font-bold text-white mb-4 tracking-tight">Streamline your growth.</h3>
                        <p className="text-slate-400 font-medium leading-relaxed max-w-sm mx-auto">
                            Join thousands of professionals using our visual engine to track every milestone.
                        </p>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Register;