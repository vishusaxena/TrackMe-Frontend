import React, { useEffect, useState } from 'react';
import Sidebar from "../components/Sidebar";
import {
    Edit3, Eye, Globe, Lock,
    MoreVertical, Plus, Search,
    Terminal, Code2, BookOpen
} from 'lucide-react';
import BlogEditorModal from '../components/MarkdownModal';
import { ApiCall } from '../utils/Hooks';
import { toast } from 'react-toastify';

const Blogs = () => {
    const [view, setView] = useState('all'); // 'all' or 'editor'
    const [isModalOpen, setIsModalOpen] = useState(false);
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
        }
        else {
            console.error("Failed to fetch blogs:", res.message);
        }
    }

    const GetApiInfo = async () => {
        const res = await ApiCall("/api/blog/public/info")
        if (res.status === "success") {
            setApiInfo(res.endpoints);
        }
        else {
            console.error("Failed to fetch API info:", res.message);
        }
    }

    useEffect(() => {
        GetBlogs();
        GetApiInfo();

    }, []);

    return (
        <div className="flex-1 min-h-screen bg-black text-white selection:bg-blue-500/30">

            <main className="flex-1 flex flex-col relative overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-125 h-125 bg-blue-600/5 rounded-full blur-[120px]" />
                </div>

                <div className="relative z-10 p-8 flex flex-col h-full">

                    {/* Header Section */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                        <div>
                            <h1 className="text-3xl font-black tracking-tight flex items-center gap-3">
                                <BookOpen className="text-blue-500" />
                                Engineering Blog
                            </h1>
                            <p className="text-zinc-500 text-sm mt-1 font-medium">
                                Write in Markdown, ship via Public API.
                            </p>
                        </div>

                        <div className="flex items-center gap-3">
                            <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-bold text-zinc-400 hover:bg-white/10 transition-all">
                                <Terminal size={16} />
                                API Settings
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-xl text-sm font-bold text-white transition-all shadow-lg shadow-blue-600/20" onClick={() => { handleClear(); setIsModalOpen(true); }}>
                                <Plus size={18} />
                                New Post
                            </button>
                        </div>
                    </div>

                    {/* Stats/API Integration Bar */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                        <ApiCard label="GET all posts endpoint" value={apiInfo.getAllPublic || "Not available"} icon={<Globe size={14} />} />
                        <ApiCard label="GET post details endpoint" value={apiInfo.getPublicById || "Not available"} icon={<Globe size={14} />} />
                        <ApiCard label="Published Posts" value={apiInfo.totalPosts || 0} icon={<Edit3 size={14} />} />
                    </div>

                    {/* Main Content Area */}
                    <div className="flex-1 bg-white/2 border border-white/5 rounded-3xl overflow-hidden flex flex-col">

                        {/* Search & Filter Toolbar */}
                        <div className="p-4 border-b border-white/5 flex items-center justify-between bg-white/1">
                            <div className="relative w-full max-w-xs">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                                <input
                                    type="text"
                                    placeholder="Search articles..."
                                    className="w-full bg-black/40 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-blue-500/50 transition-all"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <button className="p-2 text-zinc-500 hover:text-white transition-colors" onClick={() => { handleClear(); setIsModalOpen(true); }}><Code2 size={20} /></button>
                                <button className="p-2 text-zinc-500 hover:text-white transition-colors"><MoreVertical size={20} /></button>
                            </div>
                        </div>

                        {/* Blog List Placeholder */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {blogs.length === 0 ? (
                                <div className="text-center text-zinc-500 italic">
                                    No blog posts found. Click "New Post" to create your first article!
                                </div>
                            ) : (
                                blogs.map((blog) => (
                                    <BlogListItem
                                        key={blog._id}
                                        title={blog.title}
                                        date={new Date(blog.createdAt).toLocaleDateString()}
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

/* Helper Components */
const ApiCard = ({ label, value, icon }) => (
    <div className="p-4 rounded-2xl bg-white/3 border border-white/5 flex flex-col gap-1">
        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            {icon} {label}
        </span>
        <span className="text-sm font-mono text-blue-400 truncate">{value}</span>
    </div>
);

const BlogListItem = ({ title, date, status, views, handleClick }) => (
    <div className="group flex items-center justify-between p-4 rounded-2xl bg-white/1 border border-white/5 hover:bg-white/3 hover:border-white/10 transition-all cursor-pointer">
        <div className="flex items-center gap-4">
            <div className={`w-2 h-2 rounded-full ${status === 'Published' ? 'bg-emerald-500 shadow-[0_0_8px_#10b981]' : 'bg-zinc-600'}`} />
            <div>
                <h3 className="text-sm font-bold text-zinc-200 group-hover:text-blue-400 transition-colors">{title}</h3>
                <p className="text-[11px] text-zinc-500 mt-1 uppercase tracking-wider font-bold">{date} • {views} views</p>
            </div>
        </div>
        <div className="flex items-center gap-3">
            <span className={`text-[10px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${status === 'Published' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-zinc-500/10 text-zinc-500'}`}>
                {status}
            </span>
            <button className="p-2 text-zinc-600 hover:text-white transition-all"><Edit3 size={16} onClick={handleClick} /></button>
        </div>
    </div>
);

export default Blogs;