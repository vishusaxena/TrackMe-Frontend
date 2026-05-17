import React, { useEffect, useState } from 'react';
import DataTable from '../components/common/DataTable';
import Input from '../components/common/Input';
import { ArrowLeft, Trash2, GripVertical, Plus, Info } from 'lucide-react';
import Box from '../components/common/Box';
import Select from '../components/common/SelectInput';
import DarkModeSwitch from '../components/common/Switch';
import { toast } from 'react-toastify';
import DarkModeFileUploader, { CompactFileUploader } from '../components/common/FileUploader';
import MultiSelect from '../components/common/MultiSelect';
import { ApiCall } from '../utils/Hooks';
import DateBox from '../components/common/DateBox';

const mapper = {
    "text": "Input",
    "select": "Select",
    "Date": "DateBox",
}

const ComponentMapper = {
    "Input:": Input,
    "Select": Select,
    "DateBox": DateBox,
}

const MasterPage = () => {
    const [dataMap, setDataMap] = useState({});
    const [activeTab, setActiveTab] = useState('Skills Master');
    const [showBuilder, setShowBuilder] = useState(false);
    const [fileKey, setFileKey] = useState(0);
    const [filters, setFilters] = useState([]);
    const [master, setMaster] = useState({
        masterId: "",
        masterName: "",
        masterConfig: [],
    });
    const [fieldBind, setFieldBind] = useState([]);
    const [draggingIdx, setDraggingIdx] = useState(null);
    const [publicApis, setPublicApi] = useState({
        skills: "",
        certificates: "",
    });
    const [skill, setSkill] = useState({
        skillId: "",
        skillName: "",
        level: "",
        category: "",
        isActive: true,
    })
    const [certificate, setCertificate] = useState({
        certificateId: "",
        certificateName: "",
        issuer: "",
        issueDate: "",
        file: {},
        fileUrl: "",
        skillsCovered: [],
        isActive: true,
    })
    const [skillSet, setSkillSet] = useState([]);
    const [certificateSet, setCertificateSet] = useState([]);
    // masters mein data mat rakho
    const mastersMock = [
        { name: 'Skills Master', fields: ['Skill Name', 'Level', 'Category', 'Active'] },
        { name: 'Certificate Master', fields: ['certificateName', 'issuer', 'issueDate', 'fileUrl', 'isActive'] },
    ];

    const [masters, setMasters] = useState(mastersMock);

    const activeIdx = masters.findIndex(
        (master) => master.name === activeTab
    );

    const skillOptions = skillSet.map((skill) => { return skill["Skill Name"] });

    const GetSkills = async () => {
        try {
            const res = await ApiCall("/api/masters/skills/GetSkills");
            if (res.status === "success") {
                const formattedSkills = res.data.map((s) => ({
                    "Skill ID": s._id,
                    "Skill Name": s.skillName,
                    "Level": s.level,
                    "Category": s.category,
                    "Active": s.isActive ? "Yes" : "No"
                }));
                setSkillSet(formattedSkills);
                setDataMap(prev => ({ ...prev, "Skills Master": formattedSkills }));

                setPublicApi(prev => ({ ...prev, skills: res.publicApi }));
                setFilters(res.filterFields);
            } else {
                toast.error(res.message || "Failed to fetch skills");
            }
        } catch (error) {
            toast.error("An error occurred while fetching skills");
        }

    }

    const GetCertificates = async () => {
        try {
            const res = await ApiCall("/api/masters/certificates/GetCertificates");
            if (res.status === "success") {
                const formattedCertificates = res.data.map((c) => ({
                    "CertificateId": c._id,
                    "certificateName": c.certificateName,
                    "issuer": c.issuer,
                    "issueDate": c.issueDate,
                    "fileUrl": c.fileUrl,
                    "isActive": c.isActive ? "Yes" : "No"
                }));
                setCertificateSet(formattedCertificates);
                setDataMap(prev => ({ ...prev, "Certificate Master": formattedCertificates }));
                setPublicApi(prev => ({ ...prev, certificates: res.publicApi }));
            } else {
                toast.error(res.message || "Failed to fetch certificates");
            }
        } catch (error) {
            toast.error("An error occurred while fetching certificates");
        }
    }

    const GetMasters = async () => {
        try {
            const res = await ApiCall("/api/masters/master/GetMasters");
            if (res.status === "success") {
                const updatedData = res.data.map((master) => ({
                    name: master.masterName,
                    fields: master.masterConfig.map((field) => field.fieldName),
                }));

                setMasters((prev) => [...prev, ...updatedData]);

                // ✅ Har master ka data alag map karo
                const newDataMap = {};
                res.data.forEach((master) => {
                    newDataMap[master.masterName] = master.records || []; // jo bhi data field ho backend se
                });
                setDataMap(prev => ({ ...prev, ...newDataMap }));
                setFieldBind(res.data);
            } else {
                toast.error(res.message || "Failed to fetch masters");
            }
        } catch (error) {
            toast.error("An error occurred while fetching masters");
        }
    }

    const handleSkillAdd = async () => {
        if (!skill.skillName || !skill.level || !skill.category) {
            toast.error("Please fill all skill fields");
            return;
        }
        try {
            const res = await ApiCall("/api/masters/skills/InsertUpdateSkill", skill);
            console.log(res);
            if (res.status === "success") {
                toast.success(res.message);

                GetSkills();
                handleSkillReset();
            } else {
                toast.error(res.message || "Failed to add skill");
            }
        }
        catch (error) {
            toast.error("An error occurred while adding the skill");
            return;
        }
    }

    const GetSkillById = async (id) => {
        console.log("Fetching skill with ID:", id);
        try {
            const res = await ApiCall(`/api/masters/skills/GetSkillById`, { skillId: id });
            if (res.status === "success") {
                setSkill({
                    skillId: res.data._id,
                    skillName: res.data.skillName,
                    level: res.data.level,
                    category: res.data.category,
                    isActive: res.data.isActive,
                })
            }
        } catch (error) {
            toast.error("An error occurred while fetching skill details");
        }
    }
    const handleCertificateAdd = async () => {
        if (!certificate.certificateName || !certificate.issuer || certificate.skillsCovered.length === 0) {
            toast.error("Please fill all certificate fields");
            return;
        }

        // ✅ Add file validation
        if (!certificate.file) {
            toast.error("Please upload a certificate file");
            return;
        }

        try {
            const res = await ApiCall("/api/masters/certificates/InsertUpdateCertificate", certificate);
            console.log(res);
            if (res.status === "success") {
                toast.success(res.message);
                GetCertificates();
                handleCertificateReset();

            } else {
                toast.error(res.message || "Failed to add certificate");
            }
        }
        catch (error) {
            toast.error("An error occurred while adding the skill");
            return;
        }



    };
    const handleCertificateReset = () => {
        setCertificate({
            certificateId: "",
            certificateName: "",
            issuer: "",
            issueDate: "",
            file: "",
            fileUrl: "",
            skillsCovered: [],
            isActive: true,
        })
        setFileKey((prev) => prev + 1);
    }

    const handleSkillReset = () => {
        setSkill({
            skillId: "",
            skillName: "",
            level: "",
            category: "",
            isActive: true,
        })
    }

    const handleDragStart = (e, idx) => {
        setDraggingIdx(idx);
    };
    const handleDrop = (idx) => {
        const updatedMaster = [...master.masterConfig];
        const draggedItem = updatedMaster[draggingIdx];
        updatedMaster.splice(draggingIdx, 1);
        updatedMaster.splice(idx, 0, draggedItem);
        setMaster({ ...master, masterConfig: updatedMaster });
        setDraggingIdx(null);
    };

    const handleFieldAdd = () => {
        console.log("Adding new field");
        const newField = {
            fieldId: master.masterConfig.length + 1, // simple incremental ID
            fieldName: "",
            fieldType: "text",
            isRequired: false,
            fieldComponent: "",
        };
        setMaster((prev) => ({
            ...prev,
            masterConfig: [...prev.masterConfig, newField],
        }));
    };

    const handleSaveMaster = async () => {
        if (!master.masterName) {
            toast.error("Master name is required");
            return;
        }
        if (master.masterConfig.length === 0) {
            toast.error("Please add at least one field to the master");
            return;
        }

        const updatedMaster = {
            ...master,
            masterConfig: master.masterConfig.map((field) => ({
                ...field,
                fieldComponent: mapper[field.fieldType] || Input
            }))
        };
        try {
            const res = await ApiCall("/api/masters/master/InsertUpdateMaster", updatedMaster);
            if (res.status === "success") {
                toast.success(res.message);
                GetMasters();
            } else {
                toast.error(res.message || "Failed to save master");
            }
        } catch (error) {
            toast.error("An error occurred while saving the master");
        }
    };

    useEffect(() => {
        GetSkills();
        GetCertificates();
        GetMasters();
    }, []);

    return (
        <div className="flex-1 h-screen flex flex-col bg-[#030303] text-zinc-100 overflow-hidden font-sans">

            {/* TOP HEADER */}
            <div className="flex justify-between items-end p-8 pb-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">
                        Configuration <span className="text-violet-500">Masters</span>
                    </h1>
                    <p className="text-zinc-500 text-sm mt-1">Manage dynamic data structures and records.</p>
                </div>

                {!showBuilder && (
                    <button
                        onClick={() => setShowBuilder(true)}
                        className="bg-violet-600 hover:bg-violet-700 text-white px-6 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-violet-600/20 active:scale-95"
                    >
                        + Add New Master
                    </button>
                )}
            </div>

            {/* MAIN TOGGLE LOGIC */}
            {!showBuilder ? (
                <>
                    {/* TABS SYSTEM */}
                    <div className="px-8 flex gap-8 border-b border-zinc-900 overflow-x-auto no-scrollbar">
                        {masters.map((m) => (
                            <button
                                key={m.name}
                                onClick={() => setActiveTab(m.name)}
                                className={`pb-4 text-sm font-medium whitespace-nowrap transition-all relative ${activeTab === m.name ? 'text-violet-500' : 'text-zinc-500 hover:text-zinc-300'}`}
                            >
                                {m.name}
                                {activeTab === m.name && (
                                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-violet-500 shadow-[0_-4px_10px_rgba(139,92,246,0.5)]" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* VIEW: DATA TABLE */}
                    <div className="flex-1 overflow-y-auto p-8 space-y-6">
                        {activeTab === "Skills Master" && <Box onAdd={handleSkillAdd} onReset={handleSkillReset} title={`Add New ${activeTab === 'Skills Master' ? 'Skill' : 'Certificate'}`} publicApi={publicApis.skills}>
                            <Input label="Skill Name" onChange={(e) => setSkill({ ...skill, skillName: e.target.value })} value={skill.skillName} placeholder="Skill Name" />
                            <Select label="Level" options={[{ label: 'Beginner', value: 'beginner' }, { label: 'Intermediate', value: 'intermediate' }, { label: 'Advanced', value: 'advanced' }, { label: 'Expert', value: 'expert' }]} onChange={(val) => setSkill({ ...skill, level: val })} value={skill.level} />
                            <Select label="Category" options={[{ label: 'Frontend', value: 'frontend' }, { label: 'Backend', value: 'backend' }, { label: 'DevOps', value: 'devops' }, { label: 'Mobile', value: 'mobile' }, { label: 'Database', value: 'database' }]} onChange={(val) => setSkill({ ...skill, category: val })} value={skill.category} />

                            <DarkModeSwitch label="Active" checked={skill.isActive} onChange={(val) => setSkill({ ...skill, isActive: val })} />
                        </Box>}

                        {activeTab === "Certificate Master" && <Box onAdd={handleCertificateAdd} onReset={handleCertificateReset} title={`Add New ${activeTab === 'Skills Master' ? 'Skill' : 'Certificate'}`} publicApi={publicApis.certificates}>
                            <Input
                                label="Certificate Name"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setCertificate((prev) => ({ ...prev, certificateName: val }));
                                }}
                                value={certificate.certificateName}
                                placeholder="Certificate Name"
                            />

                            <Input
                                label="Issuer"
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setCertificate((prev) => ({ ...prev, issuer: val }));
                                }}
                                value={certificate.issuer}
                                placeholder="Issuer"
                            />
                            <DateBox label="Issue Date" value={certificate.issueDate}
                                onChange={(e) => setCertificate((prev) => ({ ...prev, issueDate: e.target.value }))} />

                            <MultiSelect
                                label="Skills"
                                options={skillOptions}
                                selectedValues={certificate.skillsCovered}
                                onChange={(val) =>
                                    setCertificate((prev) => ({ ...prev, skillsCovered: val }))
                                }
                            />
                            <CompactFileUploader
                                key={fileKey}
                                onUploaded={(uploadedFile) => {

                                    setCertificate((prev) => ({
                                        ...prev,

                                        // store full uploaded object
                                        file: uploadedFile,

                                        // real cloudinary url
                                        fileUrl: uploadedFile?.url || "",
                                    }));

                                }}
                            />
                            <DarkModeSwitch label="Active" checked={certificate.isActive} onChange={(val) => setCertificate((prev) => ({ ...prev, isActive: val }))} />
                        </Box>}

                        {
                            fieldBind.length > 0 && fieldBind.map((master) => (
                                master.masterName === activeTab && <Box key={master.masterName} title={`${master.masterName} Configuration`}>
                                    {master.masterConfig.map((field) => {
                                        const Component = ComponentMapper[mapper[field.fieldType]] || Input;
                                        return (
                                            <div key={field.fieldId} className="mb-4">
                                                <Component
                                                    label={field.fieldName}
                                                    placeholder={`Enter ${field.fieldName}`}
                                                    onChange={(e) => {
                                                        const val = e.target ? e.target.value : e;
                                                        setMaster((prev) => ({
                                                            ...prev,
                                                            masterConfig: prev.masterConfig.map((f) =>
                                                                f.fieldId === field.fieldId ? { ...f, fieldValue: val } : f
                                                            ),
                                                        }));
                                                    }}

                                                    value={master.masterConfig.find((f) => f.fieldId === field.fieldId)?.fieldValue || ""}
                                                />
                                            </div>
                                        );
                                    })}
                                </Box>
                            ))




                        }
                        <DataTable
                            fields={masters[activeIdx]?.fields}
                            data={dataMap[activeTab] || []}
                            totalRecords={dataMap[activeTab]?.length || 0}
                            onEdit={(id) => activeTab === "Skills Master" ? GetSkillById(id) : null}
                            onDelete={(id) => activeTab === "Skills Master" ? DeleteSkill(id) : null}
                            filters={filters}
                        />
                    </div>
                </>
            ) : (
                /* VIEW: MASTER BUILDER (The UI from the image) */
                <div className="flex-1 flex flex-col overflow-hidden bg-[#030303]">
                    {/* Builder Sub-Header */}
                    <div className="px-8 py-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-950/30">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setShowBuilder(false)}
                                className="p-2 hover:bg-zinc-800 rounded-full transition-colors text-zinc-400 hover:text-white"
                            >
                                <ArrowLeft size={20} />
                            </button>
                            <div>
                                <h2 className="text-lg font-semibold">Create New Master</h2>
                                <p className="text-xs text-zinc-500">Define fields and data types for your new collection</p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => setShowBuilder(false)} className="px-5 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">Cancel</button>
                            <button className="bg-violet-600 hover:bg-violet-700 px-6 py-2 rounded-xl text-sm font-semibold shadow-lg shadow-violet-600/20" onClick={handleSaveMaster}>
                                Save Master
                            </button>
                        </div>
                    </div>

                    {/* Builder Content Area */}
                    <div className="flex-1 flex overflow-hidden p-8 gap-8">

                        {/* LEFT: Field Configuration */}
                        <div className="flex-1 overflow-y-auto pr-4 space-y-10 no-scrollbar">
                            <section>
                                <div className="flex items-center gap-4 mb-6">
                                    <span className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 flex items-center justify-center font-bold border border-violet-500/30">1</span>
                                    <h3 className="text-xl font-semibold">Master Details</h3>
                                </div>
                                <div className="ml-12 max-w-2xl">
                                    <label className="block text-sm font-medium text-zinc-400 mb-2">Master Name <span className="text-red-500">*</span></label>
                                    <input className="w-full bg-zinc-900 border border-zinc-800 rounded-xl p-3 focus:border-violet-500 outline-none text-white transition-all" placeholder="e.g. Employee Master" onChange={(e) => setMaster({ ...master, masterName: e.target.value })} value={master.masterName} />
                                </div>
                            </section>

                            <section>
                                <div className="flex justify-between items-center mb-6">
                                    <div className="flex items-center gap-4">
                                        <span className="w-8 h-8 rounded-full bg-violet-600/20 text-violet-500 flex items-center justify-center font-bold border border-violet-500/30">2</span>
                                        <h3 className="text-xl font-semibold">Define Fields</h3>
                                    </div>
                                    <button className="flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 px-4 py-2 rounded-xl text-sm transition-all" onClick={handleFieldAdd}>
                                        <Plus size={16} /> Add Field
                                    </button>
                                </div>

                                <div className="ml-12 border border-zinc-800 rounded-2xl overflow-hidden bg-[#0a0a0a]">
                                    <table className="w-full text-left">
                                        <thead className="bg-zinc-900/50 border-b border-zinc-800">
                                            <tr className="text-zinc-500 text-xs uppercase tracking-wider">
                                                <th className="p-4 font-semibold">#</th>
                                                <th className="p-4 font-semibold">Field Label</th>
                                                <th className="p-4 font-semibold">Type</th>
                                                <th className="p-4 font-semibold text-center">Required</th>
                                                <th className="p-4 font-semibold text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-800/50 text-sm">
                                            {master.masterConfig.map((item, idx) => (
                                                <tr key={item.fieldId} className="group hover:bg-zinc-900/40" onDragStart={(e) => handleDragStart(e, idx)} onDragOver={(e) => { e.preventDefault(); console.log('Drag over', e); }} onDrop={() => handleDrop(idx)} draggable>
                                                    <td className="p-4">
                                                        <div className="flex items-center gap-3 text-zinc-600">
                                                            <GripVertical size={14} className="cursor-grab" />
                                                            {item.fieldId || idx + 1}
                                                        </div>
                                                    </td>
                                                    <td className="p-3">
                                                        <input className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 focus:border-violet-500 outline-none transition-all" defaultValue={item === 1 ? "Employee Name" : ""} onChange={(e) => setMaster((prev) => ({
                                                            ...prev,
                                                            masterConfig: prev.masterConfig.map((f, i) => f.fieldId === item.fieldId ? { ...f, fieldName: e.target.value } : f)
                                                        }))} value={item.fieldName} />
                                                    </td>
                                                    <td className="p-3">
                                                        <select className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-2 outline-none" value={item.fieldType} onChange={(e) => setMaster((prev) => ({
                                                            ...prev,
                                                            masterConfig: prev.masterConfig.map((f, i) => f.fieldId === item.fieldId ? { ...f, fieldType: e.target.value } : f)
                                                        }))} value={item.fieldType}>
                                                            <option>Text</option>
                                                            <option>Number</option>
                                                            <option>Date</option>
                                                        </select>
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <input type="checkbox" className="w-4 h-4 accent-violet-600" onChange={(e) => setMaster((prev) => ({
                                                            ...prev,
                                                            masterConfig: prev.masterConfig.map((f, i) => f.fieldId === item.fieldId ? { ...f, isRequired: e.target.checked } : f)
                                                        }))} checked={item.isRequired} />
                                                    </td>
                                                    <td className="p-3 text-center">
                                                        <button className="p-2 text-zinc-600 hover:text-red-500 transition-colors">
                                                            <Trash2 size={16} />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <div className="p-4 bg-violet-950/10 border-t border-zinc-800 flex items-center gap-3 text-xs text-violet-400">
                                        <Info size={14} />
                                        <span>Fields can be reordered by dragging the handle on the left side.</span>
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* RIGHT: Field Picker */}
                        <div className="w-72 bg-zinc-900/20 border border-zinc-800 rounded-3xl p-6 hidden xl:block">
                            <h4 className="font-bold text-zinc-200 mb-1">Field Types</h4>
                            <p className="text-[11px] text-zinc-500 mb-6 uppercase tracking-widest">Click to append</p>
                            <div className="space-y-3 overflow-y-auto h-[calc(100vh-350px)] pr-2 no-scrollbar">
                                {[
                                    { label: 'Text', icon: 'T', desc: 'Single line text' },
                                    { label: 'Textarea', icon: '¶', desc: 'Multi-line text' },
                                    { label: 'Number', icon: '123', desc: 'Numeric values' },
                                    { label: 'Dropdown', icon: '▼', desc: 'Selection list' },
                                    { label: 'Checkbox', icon: '☑', desc: 'True or false' },
                                    { label: 'File Upload', icon: '↑', desc: 'Images or docs' }
                                ].map((type) => (
                                    <div key={type.label} className="bg-zinc-900/80 border border-zinc-800 p-3 rounded-2xl hover:border-violet-500/50 hover:bg-zinc-800 cursor-pointer transition-all group" draggable>
                                        <div className="flex gap-4 items-center">
                                            <div className="w-10 h-10 bg-zinc-800 group-hover:bg-violet-600/20 flex items-center justify-center rounded-xl font-bold text-zinc-400 group-hover:text-violet-400 transition-colors">
                                                {type.icon}
                                            </div>
                                            <div>
                                                <p className="text-sm font-semibold text-zinc-300">{type.label}</p>
                                                <p className="text-[10px] text-zinc-500">{type.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    );
};

export default MasterPage;