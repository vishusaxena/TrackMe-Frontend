import { Pencil, Trash, Trash2 } from 'lucide-react';
import React, { useEffect } from 'react';


const DataTable = ({ fields, data, itemsPerPage = 10, totalRecords = 0, onEdit, onDelete }) => {

    useEffect(() => {
        console.log("DataTable Rendered with data:", data);
    }, [data]);
    return (
        <div className="bg-[#0a0a0a] border border-zinc-800/50 rounded-2xl overflow-hidden shadow-sm">
            {/* Table Toolbar */}
            <div className="p-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/30">
                <div className="flex items-center gap-3 w-1/3">
                    <input
                        type="text"
                        placeholder="Filter records..."
                        className="w-full bg-zinc-900/50 border border-zinc-800 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-violet-500"
                    />
                </div>
                <div className="flex gap-2 items-center text-xs text-zinc-500">
                    <span>Showing 1-{data?.length} of {totalRecords}</span>
                    <div className="flex gap-1 ml-4">
                        <button className="p-1.5 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors">Prev</button>
                        <button className="p-1.5 hover:bg-zinc-800 rounded border border-zinc-800 transition-colors">Next</button>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-zinc-900/20 text-zinc-500 text-[11px] uppercase tracking-widest">
                            <th className="px-6 py-4 font-semibold">Actions</th>
                            {fields?.map((field) => (
                                <th key={field} className="px-6 py-4 font-semibold">
                                    {field}
                                </th>
                            ))}

                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-900/50">
                        {data?.map((row, idx) => (
                            <tr key={idx} className="hover:bg-zinc-900/30 transition-colors group">
                                <td className="px-6 py-4 text-xs text-zinc-500 flex gap-2">
                                    <button onClick={() => onEdit(row["Skill ID"] || row._id)}>
                                        <Pencil size={16} />
                                    </button>
                                    <button onClick={() => onDelete(row["Skill ID"] || row._id)}>
                                        <Trash2 size={16} />
                                    </button>
                                </td>
                                {fields.map((field) => (
                                    <td key={field} className="px-6 py-4 text-sm text-zinc-300">
                                        {field === "fileUrl" ? (
                                            <a href={row[field]} target="_blank" rel="noopener noreferrer" className="text-violet-500 hover:underline">
                                                View File
                                            </a>
                                        ) : (
                                            row[field] || "—"
                                        )}
                                    </td>
                                ))}

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DataTable;