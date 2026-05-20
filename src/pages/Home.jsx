import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ApiCall } from "../utils/Hooks";
import { setCredentials } from "../Redux/authSlice";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const GetProfileData = async () => {
    const res = await ApiCall("/api/auth/profile");
    if (res.status === "success") {
      const { firstname, lastname, email, imageBase64 } = res.data;
      dispatch(setCredentials({ user: { firstname, lastname, email, imageBase64 } }));
    } else {
      console.error("Failed to fetch profile data:", res.message);
    }
  };

  useEffect(() => {
    GetProfileData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-x-hidden">
      <Navbar />

      <main className="relative min-h-screen flex flex-col items-center pt-20 pb-20 px-6">
        {/* Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-linear-to-b from-[#020617] via-black to-black" />
          <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[40px_40px]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 bg-blue-900/20 rounded-full blur-[120px]" />
        </div>

        {/* Hero Content Layer */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-6">
          {/* Version Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-950/30 border border-blue-500/20 backdrop-blur-md mb-6 group transition-all hover:border-blue-500/40">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            <span className="text-[10px] font-bold text-blue-300 uppercase tracking-[0.4em]">Personal OS v2.0</span>
          </div>

          {/* Refined Heading Section */}
          <div className="space-y-6">
            <h2 className="text-zinc-500 text-xs md:text-sm font-bold uppercase tracking-[0.5em] opacity-80">
              Designed for Developers Who Refuse to Stay Average
            </h2>
            <h1 className="text-6xl md:text-8xl font-black tracking-tight leading-[1.1]">
              <span className="bg-clip-text text-transparent bg-linear-to-b from-white via-blue-200 to-blue-500">
                Track. Build. Evolve.
              </span>
            </h1>
          </div>

          {/* Subheading */}
          <p className="mt-6 max-w-xl text-zinc-400 text-base md:text-lg leading-relaxed font-medium">
            The workspace for modern achievers. Organize projects, monitor growth, and stay ahead without the clutter.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-5">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-10 py-4 bg-white text-black hover:bg-blue-50 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
            >
              Start Building
            </button>
            <button
              onClick={() => document.getElementById("features")?.scrollIntoView({ behavior: "smooth" })}
              className="px-10 py-4 bg-zinc-900/50 text-zinc-300 border border-white/10 rounded-xl font-bold backdrop-blur-sm hover:bg-zinc-800 transition-all duration-300"
            >
              Explore Features
            </button>
          </div>

          {/* Supporting Line */}
          <p className="mt-6 text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase">
            One dashboard. <span className="text-blue-500/40 italic">Infinite momentum.</span>
          </p>

          {/* Stats Cards */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
            <StatCard label="Projects Built" value="12" glowColor="bg-blue-500" />
            <StatCard label="Tasks Completed" value="250+" glowColor="bg-blue-400" />
            <StatCard label="Study Hours" value="38" glowColor="bg-indigo-400" suffix="This Week" />
          </div>
        </div>

        {/* SECTION 1: Bento Features Grid */}
        <section id="features" className="relative z-10 w-full max-w-5xl mx-auto mt-40">
          <div className="text-center mb-16">
            <h2 className="text-xs font-bold text-blue-500 uppercase tracking-[0.3em] mb-3">Engineered Ecosystem</h2>
            <h3 className="text-3xl md:text-4xl font-black tracking-tight">Everything you need to ship daily.</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Feature 1 (Large) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
              <div>
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 mb-4 font-mono font-bold">01</div>
                <h4 className="text-xl font-bold mb-2">Deep Work Analytics</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                  Stop guessing your developer velocity. Auto-calculate deep work cycles, study hours, and production bursts through a beautifully organized chart engine.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/5 flex gap-2 overflow-hidden opacity-50">
                <div className="h-16 w-full bg-linear-to-t from-blue-500/20 to-transparent rounded-t-lg animate-pulse" />
                <div className="h-24 w-full bg-linear-to-t from-blue-500/40 to-transparent rounded-t-lg" />
                <div className="h-12 w-full bg-linear-to-t from-blue-500/10 to-transparent rounded-t-lg" />
                <div className="h-20 w-full bg-linear-to-t from-blue-500/30 to-transparent rounded-t-lg" />
              </div>
            </div>

            {/* Feature 2 (Small) */}
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
              <div>
                <div className="h-8 w-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-400 border border-indigo-500/20 mb-4 font-mono font-bold">02</div>
                <h4 className="text-xl font-bold mb-2">Atomic Tasks</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Break features down into micro-objectives. Fast keyboard shortcuts allow tracking without lifting your hands off the keys.
                </p>
              </div>
              <div className="mt-6 text-zinc-600 font-mono text-xs border border-white/5 p-3 rounded-xl bg-black/40">
                $ track task "auth-fix" --done
              </div>
            </div>

            {/* Feature 3 (Small) */}
            <div className="p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
              <div>
                <div className="h-8 w-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-400 border border-teal-500/20 mb-4 font-mono font-bold">03</div>
                <h4 className="text-xl font-bold mb-2">Project Vault</h4>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  Consolidate repository info, roadmap specs, deployment environments, and build logs all inside a single source of truth.
                </p>
              </div>
              <div className="mt-6 flex gap-2">
                <span className="text-[10px] bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md border border-white/5">Active</span>
                <span className="text-[10px] bg-blue-950/40 text-blue-300 px-2 py-1 rounded-md border border-blue-500/25">Vercel Live</span>
              </div>
            </div>

            {/* Feature 4 (Large) */}
            <div className="md:col-span-2 p-8 rounded-3xl bg-zinc-900/30 border border-white/5 backdrop-blur-sm flex flex-col justify-between hover:border-blue-500/20 transition-all duration-300">
              <div>
                <div className="h-8 w-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20 mb-4 font-mono font-bold">04</div>
                <h4 className="text-xl font-bold mb-2">The Evolve Metric</h4>
                <p className="text-zinc-400 text-sm leading-relaxed max-w-md">
                  An algorithmic XP system that updates live based on your completed tasks, project deliveries, and study streaks. Level up your profile from junior sandbox to code master.
                </p>
              </div>
              <div className="mt-6 w-full bg-zinc-950 border border-white/5 rounded-2xl p-4 flex items-center justify-between">
                <span className="text-xs font-mono text-zinc-400">Current Level: <span className="text-purple-400 font-bold">Lvl 24 Elite</span></span>
                <div className="w-1/2 bg-zinc-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-purple-500 h-full w-[78%]" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: Command Line/Preview Interface Mock */}
        <section className="relative z-10 w-full max-w-4xl mx-auto mt-40">
          <div className="p-1 rounded-2xl bg-linear-to-b from-zinc-800 via-zinc-900/50 to-transparent shadow-2xl">
            <div className="bg-zinc-950 rounded-xl overflow-hidden border border-white/5">
              {/* Mock Window Top Bar */}
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/50 border-b border-white/5">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                  <div className="w-3 h-3 rounded-full bg-zinc-800" />
                </div>
                <div className="text-[11px] font-mono text-zinc-500">~trackme/dashboard-preview.sh</div>
                <div className="w-12" />
              </div>

              {/* Window Layout Body */}
              <div className="p-6 md:p-10 font-mono text-left space-y-6 text-sm text-zinc-400">
                <p className="text-zinc-600">// Initialize a new growth metric timeline</p>
                <p><span className="text-blue-400">trackme</span> init --profile=developer_os_v2</p>
                <div className="p-4 rounded-xl bg-black/50 border border-white/5 space-y-2 text-xs">
                  <p className="text-emerald-400">✓ Connected to Local Git Repositories</p>
                  <p className="text-emerald-400">✓ Syncing active pomodoro study tracking data...</p>
                  <p className="text-blue-300">ℹ Overall Efficiency increased by 14% this week.</p>
                </div>
                <p className="animate-pulse text-blue-500 font-black">▉ <span className="text-zinc-500 text-xs font-normal">System operational. Ready to elevate.</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 3: Action Footer Call-out */}
        <section className="relative z-10 w-full max-w-5xl mx-auto mt-40 mb-20 text-center">
          <div className="p-12 md:p-20 rounded-3xl bg-linear-to-b from-blue-950/20 via-zinc-900/10 to-transparent border border-white/5 relative overflow-hidden">
            {/* Absolute Ambient Glow inside container */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-40 bg-blue-500/10 rounded-full blur-[80px]" />

            <h3 className="text-4xl md:text-5xl font-black tracking-tight mb-4">
              Ready to quit staying average?
            </h3>
            <p className="text-zinc-400 max-w-lg mx-auto text-sm md:text-base mb-8">
              Join developers organizing their sprints, tracking real metric points, and taking control of their progress.
            </p>
            <button
              onClick={() => navigate("/dashboard")}
              className="px-10 py-4 bg-white text-black hover:bg-blue-50 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl"
            >
              Enter Dashboard
            </button>
          </div>
        </section>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, glowColor, suffix }) => (
  <div className="group p-8 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm flex flex-col items-center transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/3">
    <div className={`w-1 h-1 rounded-full ${glowColor} mb-4 shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:scale-[4] transition-transform duration-500`} />
    <span className="text-4xl font-black text-white mb-1 tracking-tighter">{value}</span>
    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{label}</span>
    {suffix && (
      <span className="text-[9px] text-zinc-700 mt-2 font-black uppercase tracking-widest">{suffix}</span>
    )}
  </div>
);

export default Home;