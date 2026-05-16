import React, { useState, useRef } from 'react';

export const CompactFileUploader = ({
    label = "Upload File",
    accept = "*",
    maxSizeMB = 5,
    onChange
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [fileName, setFileName] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const validateAndProcessFile = (file) => {
        if (!file) return;

        if (file.size > maxSizeMB * 1024 * 1024) {
            setError(`Max ${maxSizeMB}MB.`);
            setFileName("");
            if (onChange) onChange(null);
            return;
        }

        setError("");
        setFileName(file.name);
        if (onChange) onChange(file);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
        else if (e.type === "dragleave") setDragActive(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            validateAndProcessFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            validateAndProcessFile(e.target.files[0]);
        }
    };

    const clearFile = (e) => {
        e.stopPropagation();
        setFileName("");
        setError("");
        if (inputRef.current) inputRef.current.value = "";
        if (onChange) onChange(null);
    };

    return (
        <div className="flex flex-col w-full max-w-sm select-none">
            {/* Label matching your specific typography */}
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-2 ml-1">
                {label}
            </span>

            {/* Drag & Drop Box - Height matches your Input field exactly */}
            <div
                onDragEnter={handleDrag}
                onDragOver={handleDrag}
                onDragLeave={handleDrag}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
                className={`
          relative flex items-center justify-between w-full h-11 px-4 
          border rounded-xl cursor-pointer transition-all duration-200
          ${dragActive
                        ? 'border-purple-500 bg-purple-500/5'
                        : 'border-zinc-900 bg-[#09090a] hover:border-zinc-700'}
        `}
            >
                <input
                    ref={inputRef}
                    type="file"
                    className="hidden"
                    accept={accept}
                    onChange={handleChange}
                />

                {fileName ? (
                    <div className="flex items-center justify-between w-full">
                        <span className="text-sm font-medium text-purple-400 truncate max-w-55">
                            {fileName}
                        </span>
                        <button
                            onClick={clearFile}
                            className="text-zinc-500 hover:text-red-400 p-1 transition"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                ) : (
                    <div className="flex items-center justify-between w-full text-zinc-700">
                        <span className="text-sm transition-colors duration-200 group-hover:text-zinc-500">
                            {dragActive ? "Drop file here..." : "Choose or drag file"}
                        </span>
                        {/* Minimal upload icon */}
                        <svg className="w-4 h-4 text-zinc-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                        </svg>
                    </div>
                )}
            </div>

            {/* Inline compact error validation */}
            {error && (
                <span className="mt-1.5 text-xs text-red-400 ml-1">
                    {error}
                </span>
            )}
        </div>
    );
};

export default CompactFileUploader;