import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { useGoogleLogin } from "@react-oauth/google";
import { ApiCall } from "../utils/Hooks";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate();
  const notify = (msg) => toast(msg);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      const res = await axios.post(
        "http://localhost:5000/api/auth/login",
        formData
      );
      secureLocalStorage.setItem("token", res.data.token)
      secureLocalStorage.setItem("user", { firstname: res.data.user.firstName, lastname: res.data.user.lastName, email: res.data.user.email, imageBase64: res.data.user.imageBase64 }) // Store user info in secure local storage  
      navigate("/")
      notify(`Welcome, ${res.data.user.firstName} ${res.data.user.lastName}`);

    } catch (error) {
      console.error(error.response?.data || error.message);
    }
  };

  const responseGoogel = async (response) => {
    try {
      if (response['code']) {
        const res = await ApiCall("/api/auth/google-login", { code: response.code });
        console.log(res);
        secureLocalStorage.setItem("token", res.token)
        secureLocalStorage.setItem("user", { firstname: res.user.firstName, lastname: res.user.lastName, email: res.user.email, imageBase64: res.user.imageBase64 }) // Store user info in secure local storage  
        navigate("/")
        notify(`Welcome, ${res.user.firstName} ${res.user.lastName}`);
      }
    }
    catch (error) {
      console.error(error.response?.data || error.message);
    }
  }

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogel,
    onError: responseGoogel,
    flow: "auth-code"
  })


  return (
    <div className="min-h-screen w-full flex bg-[#fafafa] selection:bg-violet-100">

      {/* Left Side: Visual/Branding (Hidden on Mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        {/* Reusing your animated grid */}
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(to_right,#818cf8_1px,transparent_1px),linear-gradient(to_bottom,#818cf8_1px,transparent_1px)] bg-size-[40px_40px] animate-gridMove" />

        {/* Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/30 rounded-full blur-[120px]" />

        <div className="relative z-10 p-12 text-white">
          <h2 className="text-5xl font-bold tracking-tight mb-6">
            Welcome back to <br />
            <span className="text-violet-400">trackme.</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-md leading-relaxed">
            Log in to access your personalized workspace and continue your growth journey.
          </p>
        </div>
      </div>

      {/* Right Side: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="mb-10">
            <h1 className="text-3xl font-bold text-slate-900">Sign In</h1>
            <p className="text-slate-500 mt-2">Enter your details to manage your projects.</p>
          </div>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <input
                type="email"
                placeholder="name@company.com"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all bg-white"
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                value={formData.email}
              />
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <label className="text-sm font-bold text-slate-700">Password</label>
                <a href="#" className="text-sm font-semibold text-violet-600 hover:underline">Forgot?</a>
              </div>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all bg-white"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                value={formData.password}
              />
            </div>

            <button className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold shadow-xl shadow-slate-200 hover:bg-violet-600 transition-all active:scale-[0.98]" onClick={handleLogin}>
              Sign In
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 flex flex-col gap-4">
            <button className="w-full py-3 px-4 border border-slate-200 rounded-xl flex items-center justify-center gap-3 font-semibold text-slate-700 hover:bg-slate-50 transition-colors" onClick={googleLogin}>
              <img src="https://www.svgrepo.com/show/355037/google.svg" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>

            <p className="text-center text-slate-500 text-sm">
              Don't have an account? <a href="/signup" className="font-bold text-violet-600 hover:underline">Sign up for free</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;