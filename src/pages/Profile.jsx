import React, { useState, useRef, useEffect } from "react";
import Navbar from "../components/Navbar";
import Input from "../components/common/Input";
import Select from "../components/common/SelectInput";
import { Camera, Shield, Globe, Github, Twitter, Save, Zap } from "lucide-react";
import { ApiCall, handleFileUpload, setFocus } from "../utils/Hooks";
import { toast } from "react-toastify";
import FullPageLoader from "../components/common/Loader";
import { useDispatch } from "react-redux";
import { setCredentials } from "../Redux/authSlice";

const Profile = () => {
    const dispatch = useDispatch();
    const [profile, setProfile] = useState({
        firstname: "",
        lastname: "",
        email: "",
        username: "dev_aryan",
        role: "Fullstack Developer",
        bio: "Building the next generation of developer tools.",
        imageName: "",
        imageBase64: "",
        imageExtension: ""
    });
    const [isLoading, setIsLoading] = useState(false);

    const fileInputRef = useRef(null);

    const roleOptions = [
        { label: "Frontend Developer", value: "frontend" },
        { label: "Backend Developer", value: "backend" },
        { label: "Fullstack Developer", value: "fullstack" },
        { label: "AI Engineer", value: "ai" },
    ];

    const GetProfileData = async () => {
        setIsLoading(true);
        const res = await ApiCall("/api/auth/profile");
        if (res.status === "success") {
            const { firstname, lastname, email, imageName, imageBase64, imageExtension, role, bio } = res.data;
            setProfile((prev) => ({
                ...prev,
                firstname,
                lastname,
                email,
                imageName,
                imageBase64,
                imageExtension,
                role,
                bio,
            }));
            dispatch(setCredentials({ user: { firstname, lastname, email, imageBase64 } })); // Update Redux store with latest profile data
        }
        else {
            console.error("Failed to fetch profile data:", res.message);
        }

        setIsLoading(false);

    };
    const UpdateProfileData = async () => {
        const res = await ApiCall("/api/auth/updateProfile", profile);
        if (res.status === "success") {
            toast.success("Profile updated successfully!");
            GetProfileData(); // Refresh profile data after update
        } else {
            toast.error("Failed to update profile!");
            console.error("Failed to update profile:", res.message);
        }
    };
    useEffect(() => {
        GetProfileData();
    }, []);

    useEffect(() => {
        if (!isLoading) {
            setTimeout(() => {
                document.title = `${profile.firstname} ${profile.lastname} | TrackMe`;
                setFocus("txtFirstName");
            }, 0);
        }
    }, [isLoading]);
    return (
        <div className="min-h-screen bg-[#030303] text-white selection:bg-blue-500/30 overflow-x-hidden">
            <Navbar />
            {isLoading ? <FullPageLoader isLoading={isLoading} /> :
                (<main className="relative pt-32 pb-20 px-6 max-w-6xl mx-auto">
                    {/* Background Decorative Element */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-100 bg-linear-to-b from-blue-600/10 to-transparent blur-[100px] pointer-events-none" />

                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12">

                        {/* Left Column: Avatar & Identity */}
                        <div className="lg:col-span-4 space-y-8">
                            <div className="flex flex-col items-center p-8 rounded-4xl bg-white/2 border border-white/5 backdrop-blur-md">
                                <div className="relative group cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                    <div className="w-40 h-40 rounded-3xl overflow-hidden border-2 border-white/10 group-hover:border-blue-500/50 transition-all duration-500 shadow-2xl">
                                        <img
                                            src={profile.imageBase64 ? `data:image/${profile.imageExtension};base64,${profile.imageBase64}` : "https://i.pravatar.cc/160?img=32"}
                                            alt="Profile"
                                            className="w-full h-full object-fit grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                                        />
                                    </div>
                                    {/* Upload Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl">
                                        <Camera className="text-white" size={32} />
                                    </div>
                                    <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, setProfile)} />
                                </div>

                                <h2 className="mt-6 text-xl font-black tracking-tight uppercase italic">{`${profile.firstname} ${profile.lastname}`}</h2>
                                <p className="text-zinc-500 text-xs font-bold tracking-[0.2em] uppercase mt-1">@{profile.username}</p>

                                <div className="mt-8 w-full space-y-3">
                                    <SocialLink icon={<Github size={14} />} label="github.com/aryan" />
                                    <SocialLink icon={<Twitter size={14} />} label="twitter.com/dev_aryan" />
                                </div>
                            </div>

                            {/* Account Status Card */}
                            <div className="p-6 rounded-3xl bg-blue-500/5 border border-blue-500/10">
                                <h4 className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                    <Shield size={12} /> Security Status
                                </h4>
                                <div className="flex items-center justify-between">
                                    <span className="text-xs text-zinc-400">Two-Factor Auth</span>
                                    <span className="text-[10px] font-bold px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg">Active</span>
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Edit Details */}
                        <div className="lg:col-span-8 space-y-8">
                            <section className="p-10 rounded-4xl bg-white/2 border border-white/5">
                                <div className="flex items-center justify-between mb-10">
                                    <div>
                                        <h3 className="text-2xl font-black tracking-tight uppercase">Profile Settings</h3>
                                        <p className="text-zinc-500 text-xs font-medium mt-1">Update your digital identity and preferences.</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-6 py-3 bg-white text-black hover:bg-blue-50 rounded-2xl font-bold transition-all active:scale-95 shadow-xl shadow-white/10" onClick={() => UpdateProfileData()}>
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <Input
                                        id="txtFirstName"
                                        label="First Name"
                                        value={profile.firstname}
                                        placeholder="Your first name"
                                        onChange={(e) => setProfile({ ...profile, firstname: e.target.value })}
                                        onKeyDown={(e) => { if (e.key === "Enter") setFocus("txtLastName"); }}
                                    />
                                    <Input
                                        id="txtLastName"
                                        label="Last Name"
                                        value={profile.lastname}
                                        placeholder="Your last name"
                                        onChange={(e) => setProfile({ ...profile, lastname: e.target.value })}
                                        onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); setFocus("ddlRole"); } }}
                                    />
                                    <Input
                                        id="txtEmail"
                                        label="Email"
                                        value={profile.email}
                                        placeholder="Your email address"
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        disabled
                                        onKeyDown={(e) => { if (e.key === "Enter") setFocus("ddlRole"); }}
                                    />
                                    <div className="md:col-span-2">
                                        <Select
                                            id="ddlRole"
                                            label="Professional Role"
                                            options={roleOptions}
                                            value={profile.role}
                                            onChange={(val) => setProfile({ ...profile, role: val })}
                                            onKeyDown={(e) => { if (e.key === "Enter") setFocus("txtBio"); }}
                                        />
                                    </div>
                                    <div className="md:col-span-2 space-y-2">
                                        <label className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] ml-1">Bio / Manifesto</label>
                                        <textarea
                                            id="txtBio"
                                            rows="4"
                                            className="w-full bg-[#0a0a0b] border border-white/10 rounded-2xl p-4 text-sm text-zinc-200 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/20 transition-all placeholder:text-zinc-700 resize-none"
                                            placeholder="Briefly describe your mission..."
                                            value={profile.bio}
                                            onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-zinc-500">
                                            <Globe size={20} />
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-white uppercase tracking-tight">Public Profile</p>
                                            <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">trackme.dev/@{profile.username}</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-blue-500 hover:text-blue-400 flex items-center gap-2 group">
                                        View Public Page <Zap size={14} className="group-hover:fill-current" />
                                    </button>
                                </div>
                            </section>
                        </div>

                    </div >
                </main >)}
        </div >
    );
};

/* Helper Component: Social Link */
const SocialLink = ({ icon, label }) => (
    <div className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-white/3 border border-white/5 group hover:border-white/10 transition-all cursor-pointer">
        <div className="text-zinc-500 group-hover:text-white transition-colors">
            {icon}
        </div>
        <span className="text-xs text-zinc-500 group-hover:text-zinc-300 transition-colors font-medium">
            {label}
        </span>
    </div>
);

export default Profile;