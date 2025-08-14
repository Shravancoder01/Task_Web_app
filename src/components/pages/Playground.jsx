import React, { useState, useEffect, useMemo } from "react";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import AddNewTaskModal from "./AddNewTaskModal";
import { UserAuth } from "../../context/AuthContext";
import { fetchTasks, createTask, deleteTask, markComplete } from "../../utils/taskService";

const Playground = () => {
  const [tasks, setTasks] = useState([]);
  const [activeLabel, setActiveLabel] = useState(null);
  const [sortMode, setSortMode] = useState("default");
  const { session } = UserAuth();
  const userId = session?.user?.id;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Load tasks from DB
  useEffect(() => {
    if (!userId) return;
    (async () => {
      try {
        setLoading(true);
        const data = await fetchTasks(userId);
        setTasks(data);
      } catch (e) {
        setError(e.message || "Failed to Load the Tasks");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // Create Task
  const handleCreate = async (payload) => {
    try {
      await createTask(userId, payload);
      const data = await fetchTasks(userId);
      setTasks(data);
    } catch (e) {
      setError(e.message || "Failed to Create a Task");
    }
  };

  // Handle Task Actions
  const handleTaskAction = async (action, id) => {
    const prev = [...tasks];
    if (action === "delete") {
      const confirmed = window.confirm("Delete this task?");
      if (!confirmed) return;
      setTasks((curr) => curr.filter((t) => t.id !== id));
      try {
        await deleteTask(id);
      } catch (e) {
        setTasks(prev);
        setError(e.message || "Failed to Delete the Task");
      }
    } else if (action === "complete") {
      setTasks((curr) => curr.filter((t) => t.id !== id));
      try {
        await markComplete(id);
      } catch (e) {
        setTasks(prev);
        setError(e.message || "Failed to Mark Task as Complete");
      }
    }
  };

  // Unique Labels
  const uniqueLabels = useMemo(
    () => Array.from(new Set(tasks.flatMap((task) => task.labels || []))),
    [tasks]
  );

  // Filter + Sort
  const FilteredTasks = useMemo(() => {
    let list = [...tasks];

    if (activeLabel) {
      list = list.filter((t) => (t.labels || []).includes(activeLabel));
    }

    if (sortMode === "stack") {
      list.sort(
        (a, b) =>
          new Date(b.stack?.date || b.created_at || 0) -
          new Date(a.stack?.date || a.created_at || 0)
      );
    } else if (sortMode === "deadline") {
      list.sort(
        (a, b) =>
          new Date(a.end_date || "2100-01-01") -
          new Date(b.end_date || "2100-01-01")
      );
    }

    return list;
  }, [tasks, activeLabel, sortMode]);

  return (
    
      <div className="max-h-screen-xl mx-auto px-4 pt-28 pb-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <div>
          <h1 className="text-2xl font-semibold text-gray-900">Playground</h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Create and manage your tasks here.
          </p>
          </div>
        
        <button
        onClick={() => setOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-blue-700
        text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <FaPlus className="text-sm" />
          New Task
        </button>
        <AddNewTaskModal 
        open={open} onClose={() => setOpen(false)} onCreate={handleCreate}/>
        

        </div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          onClick={() => {
            setActiveLabel(null);
            setSortMode("default");
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border 
        ${
          !activeLabel && sortMode === "default"
            ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800"
            : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-00"
        }`}
        >
          All
        </button>
        {uniqueLabels.map((label) => (
          <button
            key={label}
            onClick={() => {
              setActiveLabel((prev) => (prev === label ? null : label));
              setSortMode("default");
            }}
            className={`px-3 py-1.5 rounded-md text-sm font-medium border
            ${
              activeLabel === label
                ? "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-200 dark:border-blue-800"
                : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-00"
            }`}
          >
            {label}
          </button>
        ))}


        <button
          onClick={() => {
            setActiveLabel(null);
            setSortMode("stack");
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border
          ${
            sortMode === "stack"
              ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/30 dark:text-purple-200 dark:border-purple-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-00"
          }`}
        >
          Stack
        </button>

        

        <button
          onClick={() => {
            setActiveLabel(null);
            setSortMode("deadline");
          }}
          className={`px-3 py-1.5 rounded-md text-sm font-medium border
          ${
            sortMode === "deadline"
              ? "bg-red-50 text-red-700 border-red-200 dark:bg-red-900/30 dark:text-red-200 dark:border-red-800"
              : "text-gray-700 border-gray-200 hover:bg-gray-50 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-00"
          }`}
        >
          Deadline
        </button>
      </div>
      </div>
  );
};

export default Playground;
