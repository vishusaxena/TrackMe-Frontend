import React, { useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Image, MessageSquare, Layout, X, Save, Upload } from 'lucide-react'; // Using lucide-react for icons
import { handleFileUpload } from '../utils/Hooks';

const BlogEditorModal = ({ isOpen, onClose, blogData, setBlogData, handleClear, handleSavePost }) => {
    const fileInputRef = useRef(null);

    if (!isOpen) return null;

    // Handle simple text inputs (Title)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setBlogData((prev) => ({ ...prev, [name]: value }));
    };

    // Toggle Settings (Comments, Layout)
    const toggleSetting = (setting) => {
        setBlogData((prev) => ({ ...prev, [setting]: !prev[setting] }));
    };



    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-0 sm:p-4">
            <div className="bg-zinc-950 w-full max-w-7xl h-full sm:h-[95vh] border border-zinc-800 shadow-2xl flex flex-col overflow-hidden">

                {/* --- HEADER --- */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center gap-4 flex-1">
                        <input
                            type="text"
                            name="title"
                            placeholder="Post Title..."
                            value={blogData.title}
                            onChange={handleChange}
                            className="bg-transparent text-xl font-bold text-white outline-none w-full max-w-md border-b border-transparent focus:border-indigo-500 pb-1 transition-all"
                        />
                    </div>
                    <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
                        <X size={24} />
                    </button>
                </div>

                {/* --- SETTINGS BAR --- */}
                <div className="flex items-center gap-6 px-6 py-2 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400 font-medium">
                    {/* Image Upload Trigger */}
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="flex items-center gap-2 hover:text-indigo-400 transition"
                    >
                        <Image size={14} /> {blogData.imageName ? "Change Image" : "Add Image"}
                    </button>
                    <input type="file" ref={fileInputRef} onChange={(e) => handleFileUpload(e, setBlogData)} className="hidden" accept="image/*" />

                    {/* Toggle Comments */}
                    <button
                        onClick={() => toggleSetting('allowComments')}
                        className={`flex items-center gap-2 transition ${blogData.allowComments ? 'text-indigo-400' : 'text-zinc-500'}`}
                    >
                        <MessageSquare size={14} /> {blogData.allowComments ? "Comments On" : "Comments Off"}
                    </button>

                    {/* Toggle Layout (Wide/Narrow) */}
                    <button
                        onClick={() => toggleSetting('fullWidth')}
                        className={`flex items-center gap-2 transition ${blogData.fullWidth ? 'text-indigo-400' : 'text-zinc-500'}`}
                    >
                        <Layout size={14} /> {blogData.fullWidth ? "Full Width" : "Centered"}
                    </button>
                </div>

                {/* --- MAIN EDITOR --- */}
                <div className="flex flex-1 overflow-hidden">
                    {/* Editor Area */}
                    <textarea
                        className="flex-1 p-8 resize-none bg-zinc-950 text-zinc-300 font-mono text-[15px] leading-relaxed focus:outline-none border-r border-zinc-800"
                        value={blogData.content}
                        onChange={(e) => setBlogData(prev => ({ ...prev, content: e.target.value }))}
                        placeholder="Tell your story in Markdown..."
                    />

                    {/* Live Preview Area */}
                    <div className="flex-1 p-8 overflow-y-auto bg-zinc-950">
                        <div className={`${blogData.fullWidth ? 'w-full' : 'max-w-2xl mx-auto'} transition-all duration-300`}>
                            {blogData.imageBase64 && (
                                <img src={blogData.imageBase64 && `data:image/${blogData.imageExtension};base64,${blogData.imageBase64}`} alt="Cover" className="w-full h-48 object-cover rounded-lg mb-8 shadow-xl" />
                            )}
                            <h1 className="text-4xl font-black text-white mb-4">{blogData.title || "Untitled Post"}</h1>
                            <div className="prose prose-invert prose-indigo max-w-none">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {blogData.content}
                                </ReactMarkdown>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- FOOTER --- */}
                <div className="px-6 py-4 border-t border-zinc-800 bg-zinc-900 flex justify-end items-center gap-4">
                    <span className="text-xs text-zinc-500 mr-auto italic">Markdown supports GFM (tables, lists, etc.)</span>
                    <button onClick={handleClear} className="text-zinc-400 hover:text-white px-4 py-2 text-sm">Discard</button>
                    <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2 rounded-lg font-semibold transition shadow-lg shadow-indigo-500/20 text-sm" onClick={handleSavePost}>
                        <Save size={16} /> Publish Post
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogEditorModal;