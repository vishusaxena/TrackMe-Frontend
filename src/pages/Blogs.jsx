import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import {
    Edit3, Eye, Globe, Lock,
    MoreVertical, Plus, Search,
    Terminal, Code2, BookOpen, Copy, Check
} from 'lucide-react';
import BlogEditorModal from '../components/MarkdownModal';
import { ApiCall } from '../utils/Hooks';
import { toast } from 'react-toastify';

const Blogs = () => {
    const [view, setView] = useState('all'); // 'all' or 'editor'
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [blogData, setBlogData] = useState({
        postId: "",
        title: '',
        content: '',
        imageName: "",
        imageBase64: "",
        imageExtension: "",
        allowComments: true,
        fullWidth: false,
    });
    const [blogs, setBlogs] = useState([]);
    const [apiInfo, setApiInfo] = useState({
        getPublicById: "",
        getAllPublic: "",
        totalPosts: 0,
    });

    const handleClear = () => {
        setBlogData({
            postId: "",
            title: '',
            content: '',
            imageName: "",
            imageBase64: "",
            imageExtension: "",
            allowComments: true,
            fullWidth: false,
        })
    }

    const handleSavePost = async () => {
        const data = {
            ...blogData,
            coverImageName: blogData.imageName,
            coverImageBase64: blogData.imageBase64,
            coverImageExt: blogData.imageExtension,
        }
        const res = await ApiCall("/api/blog/InsertUpdatePost", data)
        if (res.status === "success") {
            setIsModalOpen(false);
            handleClear();
            GetBlogs();
            GetApiInfo();
            toast.success("Post published successfully");
        }
        else {
            toast.error("Failed to save post: " + res.message)
            console.error("Failed to save post:", res.message);
        }
    }

    const handleEditPost = async (postId) => {
        const res = await ApiCall("/api/blog/EditPost", { postId });
        if (res.status === "success") {
            setBlogData({
                postId: res.data._id,
                title: res.data.title,
                content: res.data.content,
                imageName: res.data.coverImageName,
                imageBase64: res.data.coverImageBase64,
                imageExtension: res.data.coverImageExt,
                allowComments: res.data.allowComments,
                fullWidth: res.data.fullWidth,
            });
            setIsModalOpen(true);
        }
        else {
            toast.error("Failed to edit post: " + res.message)
            console.error("Failed to edit post:", res.message);
        }
    }

    const GetBlogs = async () => {
        const res = await ApiCall("/api/blog/GetPosts")
        if (res.status === "success") {
            setBlogs(res.data);
        } else {
            console.error("Failed to fetch blogs:", res.message);
        }
    }

    const GetApiInfo = async () => {
        const res = await ApiCall("/api/blog/public/info")
        if (res.status === "success") {
            setApiInfo(res.endpoints);
        } else {
            console.error("Failed to fetch API info:", res.message);
        }
    }

    useEffect(() => {
        GetBlogs();
        GetApiInfo();
    }, []);

    // Filter engine
    const filteredBlogs = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex-1 min-h-screen bg-black text-white selection:bg-blue-500/30">
            <main className="flex-1 flex flex-col relative overflow-hidden">

                {/* Visual Backdrop Ambient Layer */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-10 w-160 h-160 bg-blue-500/5 rounded-full blur-[140px]" />
                    <div className="absolute -bottom-20 left-10 w-120 h-120 bg-violet-500/5 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 p-6 md:p-10 flex flex-col h-full max-w-7xl mx-auto w-full">

                    {/* Top Workspace Header */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
                        <div>
                            <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-blue-950/40 border border-blue-500/20 w-fit mb-3">
                                <Terminal size={11} className="text-blue-400" />
                                <span className="text-[9px] font-black text-blue-300 uppercase tracking-widest">Headless Engine Active</span>
                            </div>
                            <h1 className="text-4xl font-black tracking-tight flex items-center gap-3 bg-clip-text text-transparent bg-linear-to-b from-white via-zinc-200 to-zinc-400">
                                Engineering Journal
                            </h1>
                            <p className="text-zinc-400 text-sm mt-1.5 font-medium">
                                Author structured markdown layers and pipe deployment drops through your custom endpoints.
                            </p>
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-zinc-900/50 border border-white/5 hover:border-white/10 rounded-xl text-xs font-bold text-zinc-300 hover:text-white transition-all backdrop-blur-md active:scale-95">
                                <Code2 size={15} />
                                API Settings
                            </button>
                            <button
                                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-xs font-bold text-white transition-all shadow-lg shadow-blue-600/25 hover:scale-[1.02] active:scale-95"
                                onClick={() => { handleClear(); setIsModalOpen(true); }}
                            >
                                <Plus size={16} />
                                Drop New Post
                            </button>
                        </div>
                    </div>

                    {/* Endpoint Stream Overview Block */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
                        <ApiCard label="GET global engine posts" value={apiInfo.getAllPublic || "Not available"} icon={<Globe size={13} />} />
                        <ApiCard label="GET isolated target metrics" value={apiInfo.getPublicById || "Not available"} icon={<Code2 size={13} />} />
                        <ApiCard label="Total Deployments" value={apiInfo.totalPosts || 0} icon={<Edit3 size={13} />} isMetric />
                    </div>

                    {/* Control Terminal Shell Wrapper */}
                    <div className="flex-1 bg-zinc-950/40 border border-white/5 rounded-2xl flex flex-col shadow-2xl backdrop-blur-md overflow-hidden">

                        {/* Terminal Filter Toolbar */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-zinc-900/20 backdrop-blur-xs gap-4">
                            <div className="relative w-full max-w-sm">
                                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" size={15} />
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Filter nodes by string match..."
                                    className="w-full bg-black/60 border border-white/5 focus:border-blue-500/30 rounded-xl py-2 pl-10 pr-4 text-xs font-mono placeholder:text-zinc-600 text-zinc-200 focus:outline-none focus:ring-1 focus:ring-blue-500/10 transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-1.5 shrink-0">
                                <div className="h-2 w-2 rounded-full bg-emerald-500/80 animate-pulse shadow-[0_0_8px_#10b981]" title="System synced" />
                                <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors" onClick={() => { handleClear(); setIsModalOpen(true); }}><Plus size={16} /></button>
                                <button className="p-2 text-zinc-500 hover:text-zinc-200 transition-colors"><MoreVertical size={16} /></button>
                            </div>
                        </div>

                        {/* List Node Display Loop Container */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-3 custom-scrollbar">
                            {filteredBlogs.length === 0 ? (
                                <div className="flex flex-col items-center justify-center py-20 text-center border border-dashed border-white/5 rounded-xl bg-black/10">
                                    <BookOpen size={24} className="text-zinc-700 mb-3" />
                                    <p className="text-zinc-500 text-xs font-mono max-w-xs">
                                        No structural post strings found. Click "Drop New Post" to seed database node.
                                    </p>
                                </div>
                            ) : (
                                filteredBlogs.map((blog) => (
                                    <BlogListItem
                                        key={blog._id}
                                        title={blog.title}
                                        date={new Date(blog.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        status={blog.status || "Published"}
                                        views={blog.views || 0}
                                        handleClick={() => handleEditPost(blog._id)}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </main>

            <BlogEditorModal
                isOpen={isModalOpen}
                onClose={() => { setIsModalOpen(false); handleClear(); }}
                blogData={blogData}
                setBlogData={setBlogData}
                handleClear={handleClear}
                handleSavePost={handleSavePost}
            />
        </div>
    );
};

/* Mini Helper Components */
const ApiCard = ({ label, value, icon, isMetric }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (isMetric) return;
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        toast.info("Endpoint dropped to clip package");
    };

    return (
        <div className="p-4 rounded-xl bg-zinc-950/50 border border-white/5 flex flex-col justify-between gap-2 hover:border-zinc-800 transition-all relative group">
            <div className="flex items-center justify-between">
                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.18em] flex items-center gap-2">
                    <span className="text-zinc-400">{icon}</span> {label}
                </span>
                {!isMetric && value !== "Not available" && (
                    <button onClick={handleCopy} className="text-zinc-600 hover:text-zinc-400 opacity-0 group-hover:opacity-100 transition-all duration-200">
                        {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                    </button>
                )}
            </div>
            {isMetric ? (
                <span className="text-2xl font-black text-white tracking-tight font-mono">{value}</span>
            ) : (
                <span className="text-xs font-mono text-blue-400/90 truncate bg-black/40 px-2.5 py-1.5 rounded-lg border border-white/5 select-all">{value}</span>
            )}
        </div>
    );
};

const BlogListItem = ({ title, date, status, views, handleClick }) => (
    <div
        onClick={handleClick}
        className="group flex items-center justify-between p-4 rounded-xl bg-zinc-900/10 border border-white/5 hover:border-blue-500/20 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer select-none active:scale-[0.99]"
    >
        <div className="flex items-center gap-4 min-w-0">
            <div className="relative flex shrink-0">
                <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-emerald-400 opacity-20"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
            </div>
            <div className="min-w-0">
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-blue-400 transition-colors truncate pr-2">
                    {title}
                </h3>
                <div className="flex items-center gap-3 mt-1.5">
                    <span className="text-[10px] text-zinc-500 font-mono font-medium">{date}</span>
                    <span className="text-zinc-800 text-xs">•</span>
                    <span className="text-[10px] text-zinc-500 font-mono font-medium">{views} read cycles</span>
                </div>
            </div>
        </div>
        <div className="flex items-center gap-3 shrink-0 ml-4">
            <span className="text-[9px] font-black px-2 py-0.5 rounded-md uppercase tracking-wider bg-emerald-500/5 text-emerald-400/90 border border-emerald-500/10 font-mono">
                {status}
            </span>
            <button className="p-2 rounded-lg text-zinc-600 hover:text-white hover:bg-white/5 transition-all">
                <Edit3 size={14} />
            </button>
        </div>
    </div>
);

export default Blogs;