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
      const { firstname, lastname, email, imageName, imageBase64, imageExtension, role, bio } = res.data;
      dispatch(setCredentials({ user: { firstname, lastname, email, imageBase64 } })); // Update Redux store with latest profile data
    }
    else {
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

          {/* Subtle Grid */}
          <div className="absolute inset-0 opacity-[0.1] bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />

          {/* Deep Blue Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-250 h-100 bg-blue-900/20 rounded-full blur-[120px]" />
        </div>

        {/* Content Layer */}
        <div className="relative z-10 w-full max-w-5xl mx-auto flex flex-col items-center text-center mt-6">

          {/* Version Badge - Centered with margin */}
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
            The workspace for modern achievers. Organize projects,
            monitor growth, and stay ahead without the clutter.
          </p>

          {/* CTA Buttons */}
          <div className="mt-6 flex flex-col sm:flex-row items-center gap-5">
            <button
              onClick={() => navigate("/dashboard")}
              className="px-10 py-4 bg-white text-black hover:bg-blue-50 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl shadow-white/5"
            >
              Start Building
            </button>
            <button className="px-10 py-4 bg-zinc-900/50 text-zinc-300 border border-white/10 rounded-xl font-bold backdrop-blur-sm hover:bg-zinc-800 transition-all duration-300">
              Explore Features
            </button>
          </div>

          {/* Supporting Line */}
          <p className="mt-6 text-zinc-600 text-[10px] font-bold tracking-[0.3em] uppercase">
            One dashboard. <span className="text-blue-500/40 italic">Infinite momentum.</span>
          </p>

          {/* Modernized Stats Cards */}
          <div className="mt-24 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full max-w-4xl">
            <StatCard label="Projects Built" value="12" glowColor="bg-blue-500" />
            <StatCard label="Tasks Completed" value="250+" glowColor="bg-blue-400" />
            <StatCard label="Study Hours" value="38" glowColor="bg-indigo-400" suffix="This Week" />
          </div>

        </div>
      </main>
    </div>
  );
};

const StatCard = ({ label, value, glowColor, suffix }) => (
  <div className="group p-8 rounded-3xl bg-white/2 border border-white/5 backdrop-blur-sm flex flex-col items-center transition-all duration-500 hover:border-blue-500/20 hover:bg-blue-500/3">
    <div className={`w-1 h-1 rounded-full ${glowColor} mb-4 shadow-[0_0_15px_rgba(59,130,246,0.6)] group-hover:scale-[4] transition-transform duration-500`} />
    <span className="text-4xl font-black text-white mb-1 tracking-tighter">
      {value}
    </span>
    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">
      {label}
    </span>
    {suffix && (
      <span className="text-[9px] text-zinc-700 mt-2 font-black uppercase tracking-widest">
        {suffix}
      </span>
    )}
  </div>
);

export default Home;