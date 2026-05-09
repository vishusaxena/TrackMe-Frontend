import React, { use, useEffect, useRef, useState } from 'react';
import { MoreVertical, Plus, Clock, CheckCircle2, Circle, Zap, Mail, Eye, Edit, Trash } from 'lucide-react';
import Modal from '../components/common/Modal';
import Input from '../components/common/Input';
import Select from '../components/common/SelectInput';
import DateBox from '../components/common/DateBox';
import TextArea from '../components/common/TextAreaInput';
import { ApiCall } from '../utils/Hooks';
import { toast } from 'react-toastify';
import { useDebounce } from '../utils/CustomHooks';
import ConfirmModal from '../components/common/ConfirmModal';


const priorities = [
  { title: "High Priority", count: 3, gradient: "from-rose-500/80 to-rose-600", tasks: "Immediate action", value: "high" },
  { title: "Medium Priority", count: 5, gradient: "from-amber-500/80 to-orange-600", tasks: "Due this week", value: "medium" },
  { title: "Low Priority", count: 8, gradient: "from-emerald-500/80 to-teal-600", tasks: "Ongoing tasks", value: "low" },
  { title: "Backlog", count: 2, gradient: "from-zinc-700 to-zinc-800", tasks: "Future ideas", value: "backlog" },
];
const techOptions = [
  { label: "High Priority", value: "high" },
  { label: "Medium Priority", value: "medium" },
  { label: "Low Priority", value: "low" },
  { label: "Backlog", value: "backlog" },
];

const Todo = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDetailModalOpen, setDetailModalOpen] = useState(false);
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [draggingIndex, setDraggingIndex] = useState(null);
  const [dropzoneStatus, setDropzoneStatus] = useState(null);
  const [todo, setTodo] = useState({
    todoId: "",
    taskName: "",
    description: "",
    status: "pending",
    priority: "medium",
    startDate: Date.now(),
    endDate: "",
    remarks: [
      {
        status: "",
        remark: "",
        date: ""
      }
    ],
  })
  const [todosList, setTodosList] = useState([]);
  const [prioritiesCount, setPrioritiesCount] = useState({
    high: 0,
    medium: 0,
    low: 0,
    backlog: 0,
  });
  const [statusCount, setStatusCount] = useState({
    pending: 0,
    inprogress: 0,
    completed: 0,
  });
  const debouncedTodos = useDebounce(todosList, 1000);
  const [isBulUpdating, setIsBulkUpdating] = useState(false);
  const [selectedTodoDetails, setSelectedTodoDetails] = useState({
    taskName: "",
    description: "",
    status: "",
    priority: "",
    startDate: "",
    endDate: "",
    remarks: []
  });

  const handleAddTask = async (id) => {
    console.log("i am here", id);
    console.log("Selected Todo Details with new remark:", todo);
    let data = {};
    if (id) {
      data = {
        todoId: id,
        ...selectedTodoDetails
      }
    }
    else {
      data = {
        ...todo
      }
    }

    try {
      // API call to add task
      const res = await ApiCall("/api/todo/InsertUpdateTodo", todo);
      if (res.status === "success") {
        toast.success(res.message);
        GetTodosData();
      }
      setModalOpen(false);
      handleClear();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  const EditTodo = async (id) => {
    try {
      const res = await ApiCall("/api/todo/EditTodo", { todoId: id });
      if (res.status === "success") {
        setTodo({
          todoId: id,
          ...res.data
        });
        setModalOpen(true);
      } else {
        console.error("Error fetching task details:", res.message);
      }
    }
    catch (error) {
      console.error("Error fetching task details:", error);
    }

  }

  const DeleteTodo = async (id) => {
    try {
      const res = await ApiCall("/api/todo/DeleteTodo", { todoId: id });
      if (res.status === "success") {
        toast.success(res.message);
        GetTodosData();
      } else {
        console.error("Error deleting task:", res.message);
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  }

  const BulkUpdateTodos = async () => {
    try {
      const res = await ApiCall("/api/todo/BulkUpdate", { todos: debouncedTodos });
      if (res.status === "success") {
        GetTodosData();
      } else {
        console.error("Error updating tasks:", res.message);
      }

    }
    catch (error) {
      console.error("Error updating tasks:", error);
      toast.error("Failed to update tasks");
    }
  }

  const GetTodosData = async () => {
    const res = await ApiCall("/api/todo/getTodos");
    if (res.status === "success") {
      console.log("Todos fetched:", res.data);
      setTodosList(res.data);
      setPrioritiesCount((prev) => ({
        ...prev,
        high: res.highPriorityCount,
        medium: res.mediumPriorityCount,
        low: res.lowPriorityCount,
        backlog: res.backlogPriorityCount,
      })
      );
      setStatusCount((prev) => ({
        ...prev,
        pending: res.pendingCount,
        inprogress: res.inProgressCount,
        completed: res.completedCount,
      }));
    } else {
      console.error("Error fetching todos:", res.message);
    }
  }
  const GetTodoDetailById = async (id) => {
    try {
      const res = await ApiCall("/api/todo/GetTodoById", { todoId: id });
      if (res.status === "success") {
        console.log("Todo details:", res.data);
        // You can set the details in state to show in the detail modal
        setSelectedTodoDetails(res.data);
        setDetailModalOpen(true);
      } else {
        console.error("Error fetching todo details:", res.message);
      }
    }
    catch (error) {
      console.error("Error fetching todo details:", error);
    }
  }

  const handleClear = () => {
    setTodo({
      todoId: "",
      taskName: "",
      description: "",
      status: "pending",
      priority: "medium",
      startDate: Date.now(),
      endDate: "",
    })
  }
  const draggedItemRef = useRef(null);
  const handleDragStart = (id) => {
    console.log("Dragging started for ID:", id);
    setDraggingIndex(id)
    draggedItemRef.current = id;
  }
  const handleDragEnd = () => {
    setDraggingIndex(null)
  }

  const handleDrop = (status) => {
    const draggedTodo = todosList.filter(todo => todo.status === status).find(todo => todo._id === draggingIndex);
    if (draggedTodo && draggedTodo.status === status) {
      setDraggingIndex(null);
      return;
    }
    if (status === "pending" || status === "inprogress" || status === "completed") {
      setConfirmModalOpen(true);
      setDropzoneStatus(status);
      return;
    }

  };


  useEffect(() => {
    if (debouncedTodos.length > 0 && isBulUpdating) {
      BulkUpdateTodos();
      setIsBulkUpdating(false);
    }
  }, [debouncedTodos]);


  useEffect(() => {
    GetTodosData();
  }, []);

  return (
    /* Main Container: Fixed height, no vertical scroll */
    <div className="flex-1 h-screen flex flex-col bg-[#09090b] overflow-hidden">

      {/* Header: Static */}
      <header className="flex justify-between items-center p-8 pb-4">
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Workspace</h1>
          <p className="text-zinc-500 text-[11px] tracking-wider uppercase font-medium">Task Overview</p>
        </div>
        <button className="bg-white text-black px-4 py-2 rounded-full text-xs font-bold hover:bg-zinc-200 transition-colors" onClick={() => { handleClear(); setModalOpen(true); }}>
          + NEW TASK
        </button>
      </header>

      {/* 1. Horizontal Scroll Area (The only part that scrolls sideways) */}
      <div className="px-8 py-4">
        <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar pb-2">
          {priorities.map((item, i) => (
            <div
              key={i}
              className={`snap-start shrink-0 w-64 h-32 rounded-2xl bg-linear-to-br ${item.gradient} p-5 flex flex-col justify-between shadow-lg shadow-black/20 transition-all hover:brightness-110 cursor-pointer`}
            >
              <span className="text-[10px] font-black tracking-[0.2em] text-white/60 uppercase">{item.title}</span>
              <div>
                <div className="text-3xl font-bold text-white leading-none">{prioritiesCount[item.value]}</div>
                <p className="text-white/50 text-[10px] mt-1 uppercase tracking-tighter">{item.tasks}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Kanban Board: Flexible but contained */}
      <div className="flex-1 grid grid-cols-3 gap-6 p-8 pt-4 overflow-hidden">
        {[
          { title: "PENDING", icon: <Circle size={14} />, color: "text-zinc-500", value: "pending" },
          { title: "IN PROCESS", icon: <Clock size={14} />, color: "text-violet-500", value: "inprogress" },
          { title: "COMPLETED", icon: <CheckCircle2 size={14} />, color: "text-emerald-500", value: "completed" }
        ].map((col, i) => (
          <div key={i} className="flex flex-col h-full bg-zinc-900/20 rounded-2xl border border-white/5 p-4">
            <div className={`flex items-center gap-2 mb-4 ${col.color}`}>
              {col.icon}
              <h2 className="text-[10px] font-black tracking-[0.3em] uppercase">{col.title}</h2>
              <span className="ml-auto text-[10px] font-bold text-white/50">{statusCount[col.value] ?? 0}</span>
            </div>

            <div className="flex-1 overflow-y-auto no-scrollbar max-h-75 snap-y snap-mandatory space-y-3" onDragOver={e => e.preventDefault()} onDrop={() => handleDrop(col.value)}>
              {
                todosList
                  .filter(todo => {
                    if (col.title === "PENDING") return todo.status === "pending";
                    if (col.title === "IN PROCESS") return todo.status === "inprogress";
                    if (col.title === "COMPLETED") return todo.status === "completed";
                    return false;
                  })
                  .map((todo, j) => (
                    <div
                      key={todo._id || j}
                      className="bg-zinc-900 border border-white/5 p-4 rounded-xl group transition-all hover:border-violet-500/50 shadow-lg"
                      draggable
                      onDragStart={() => handleDragStart(todo._id)}
                      onDragEnd={handleDragEnd}
                    >
                      {/* Priority Indicator & Actions Header */}
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex flex-col gap-1">
                          <h3 className="text-sm font-bold text-zinc-100 leading-none">
                            {todo.taskName}
                          </h3>
                          <span className={`text-[10px] uppercase tracking-wider font-bold ${todo.priority === 'High' ? 'text-rose-500' : 'text-amber-500'
                            }`}>
                            {todo.priority} Priority
                          </span>
                        </div>

                        {/* Actions: Eye, Edit, Delete (Visible on Hover for a cleaner look) */}
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-white transition-colors" onClick={() => GetTodoDetailById(todo._id)}>
                            <Eye size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-violet-400 transition-colors" onClick={() => EditTodo(todo._id)}>
                            <Edit size={14} />
                          </button>
                          <button className="p-1.5 hover:bg-zinc-800 rounded-md text-zinc-400 hover:text-rose-500 transition-colors" onClick={() => DeleteTodo(todo._id)}>
                            <Trash size={14} />
                          </button>
                        </div>
                      </div>

                      {/* Dates Section */}
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-white/5">
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-500 uppercase font-medium">Start Date</span>
                          <span className="text-xs text-zinc-300">{todo.startDate || 'N/A'}</span>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] text-zinc-500 uppercase font-medium">End Date</span>
                          <span className="text-xs text-zinc-300">{todo.endDate || 'N/A'}</span>
                        </div>
                      </div>
                    </div>
                  ))
              }
            </div>

          </div>
        ))}
      </div>

      <ConfirmModal
        isOpen={isConfirmModalOpen}
        onClose={() => setConfirmModalOpen(false)}
        showTextArea={true}
        prompPlaceholder="Add remarks for task"
        onConfirm={(remark) => {
          const todoId = draggedItemRef.current;

          const updatedTodos = todosList.map(todo => {
            if (todo._id === todoId) {
              return {
                ...todo,
                status: dropzoneStatus,
                remarks: [
                  ...(todo.remarks || []),
                  {
                    status: dropzoneStatus,
                    remark,
                    date: new Date().toISOString()
                  }
                ]
              };
            }
            return todo;
          });

          // 🔥 Update UI immediately
          setTodosList(updatedTodos);

          // 🔥 Update counts safely
          const draggedTodo = todosList.find(t => t._id === todoId);
          if (draggedTodo) {
            const previousStatus = draggedTodo.status;

            setStatusCount(prev => ({
              ...prev,
              [dropzoneStatus]: prev[dropzoneStatus] + 1,
              [previousStatus]: Math.max(prev[previousStatus] - 1, 0)
            }));
          }

          setConfirmModalOpen(false);
          setDraggingIndex(null);

          // 🔥 Now sync with backend
          setIsBulkUpdating(true);
        }}


      />

      <Modal
        isOpen={isModalOpen}
        onClose={() => { setModalOpen(false); handleClear(); }}
        title="Add Task"
        subtitle="Alpha-Phase Deployment"
        icon={Zap}
        handleButtonClick={handleAddTask}
      >
        {/* LANDSCAPE CONTENT GOES HERE */}
        <div className="grid grid-cols-2 gap-8">
          <Input
            label="Task Name"
            placeholder="Task Name"
            value={todo.taskName}
            onChange={(e) => setTodo({ ...todo, taskName: e.target.value })}
          />

          <Select
            label="Task Priority"
            placeholder="Task Priority"
            options={techOptions}
            value={todo.priority}
            onChange={(val) => setTodo({ ...todo, priority: val })}
          />
          <DateBox
            label="Start Date"
            value={todo.startDate}
            onChange={(e) => setTodo({ ...todo, startDate: e.target.value })}
          />
          <DateBox
            label="End Date"
            value={todo.endDate}
            onChange={(e) => setTodo({ ...todo, endDate: e.target.value })}
          />
          <TextArea label="Task Description" value={todo.description} onChange={(e) => setTodo({ ...todo, description: e.target.value })} />
        </div>
      </Modal>

      {/*Modal for todo Details*/}
      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => { setDetailModalOpen(false); }}
        title="Task Details">
        <div className="flex flex-col h-full w-full bg-zinc-950 text-white p-6">
          {/* Modal Header */}

          {/* Main Side-by-Side Container */}
          <div className="flex flex-col md:flex-row gap-8 flex-1 min-h-0">

            {/* LEFT SIDE: Task Information */}
            <div className="flex-1 space-y-8 ">
              <div>
                <h3 className="text-xl font-semibold text-zinc-100">{selectedTodoDetails.taskName}</h3>
                <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
                  {selectedTodoDetails.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Priority</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-md w-fit ${selectedTodoDetails.priority === 'High' ? 'bg-rose-500/10 text-rose-500' : 'bg-amber-500/10 text-amber-500'
                    }`}>
                    {selectedTodoDetails.priority}
                  </span>
                </div>

                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Status</span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-md w-fit capitalize ${selectedTodoDetails.status === 'pending' ? 'bg-zinc-800 text-zinc-400' :
                    selectedTodoDetails.status === 'inprogress' ? 'bg-violet-500/10 text-violet-400' :
                      'bg-emerald-500/10 text-emerald-400'
                    }`}>
                    {selectedTodoDetails.status}
                  </span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">Start Date</span>
                  <span className="text-xs text-zinc-300">{selectedTodoDetails.startDate || 'N/A'}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-widest">End Date</span>
                  <span className="text-xs text-zinc-300">{selectedTodoDetails.endDate || 'N/A'}</span>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE: Activity Timeline */}
            <div className="flex-1 flex flex-col min-h-0 bg-zinc-900/30 rounded-xl border border-zinc-800 p-5">
              <h4 className="text-[11px] text-zinc-500 uppercase font-bold tracking-[0.2em] mb-6">
                Activity Timeline
              </h4>

              {/* Scrollable Area */}
              <div className="overflow-y-auto pr-2 flex-1 no-scrollbar scrollbar-thin scrollbar-thumb-zinc-700">
                <div className="relative space-y-6">
                  {/* Vertical Line */}
                  <div className="absolute left-1.75 top-2 bottom-2 w-px bg-zinc-800" />

                  {selectedTodoDetails?.remarks?.map((item, index) => (
                    <div key={index} className="relative pl-7 group">
                      {/* Dot */}
                      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-zinc-950 border-2 border-zinc-700 group-first:border-violet-500" />

                      <div className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-zinc-200">{item.status}</span>
                          <span className="text-[10px] text-zinc-500">{item.date}</span>
                        </div>
                        <p className="text-xs text-zinc-400 italic">"{item.remark}"</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>

      </Modal>
      {/* CSS for hiding scrollbars */}
      <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
    </div>
  );
};

export default Todo;