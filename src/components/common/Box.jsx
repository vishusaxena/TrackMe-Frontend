// Box.jsx

import { Info } from "lucide-react";
import Tooltip from "./ToolTip";

const Box = ({
    title = "Add New Entry",
    onAdd,
    onReset,
    addText = "Add",
    resetText = "Reset",
    children,
    className = "",
    publicApi = null,
}) => {
    return (
        <div
            className={`bg-[#0a0a0a] border border-zinc-800/50 p-6 rounded-2xl shadow-sm ${className}`}
        >
            <h2 className="text-sm font-semibold text-zinc-400 uppercase tracking-wider mb-6 flex justify-between">
                {title} <Tooltip text="This is a public API endpoint you can use to interact with the data." position="left">
                    {publicApi && (
                        <a href={publicApi} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm text-zinc-500 hover:text-zinc-300 transition-colors">
                            <Info size={14} /> Public API
                        </a>
                    )}
                </Tooltip>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
                {children}

                <div className="flex gap-2">
                    <button
                        type="button"
                        onClick={onReset}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                        {resetText}
                    </button>

                    <button
                        type="button"
                        onClick={onAdd}
                        className="flex-1 bg-violet-600 hover:bg-violet-700 py-2.5 rounded-lg text-sm font-medium transition-colors"
                    >
                        {addText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Box;