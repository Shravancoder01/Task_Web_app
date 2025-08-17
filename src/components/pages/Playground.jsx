import React, { useState, useEffect, useMemo } from "react";
import { FaCheckCircle, FaPlus, FaTrashAlt } from "react-icons/fa";
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
          open={open}
          onClose={() => setOpen(false)}
          onCreate={handleCreate}
        />
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

      {/* error */}
      {error && (
        <p
          className="mb-4 text-center text-sm font-medium text-red-700 bg-red-100 border-red-300 rounded-md px-4 py-3 shadow-sm"
        >
          {error}
        </p>
      )}

      {/* task */}
      {loading ? (
        <div className="text-center text-gray-600 py-16 ">
          Loading Tasks ...
        </div>
      ) : FilteredTasks.length === 0 ? (
        <div
          className="text-center py-16 border-2 border-dashed rounded-xl border-gray-200
  dark:border-gray-700"
        >
          <p className="text-gray-700 dark:text-gray-200 font-medium">
            No Tasks Found
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Try Changing the Filter or Sort
          </p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {FilteredTasks.map((task) => (
            <div
              className="relative rounded-xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition dark:bg-gray-900
    dark:border-gray-700"
              key={task.id}
            >
              {/* action */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => handleTaskAction("complete", task.id)}
                  title="Mark as Complete"
                  className="text-gray-400 hover:text-green-500 transition"
                >
                  <FaCheckCircle />
                </button>
                <button
                  onClick={() => handleTaskAction("delete", task.id)}
                  title="Delete Task"
                  className="text-gray-400 hover:text-red-500 transition"
                >
                  <FaTrashAlt />
                </button>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {task.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {task.description}
              </p>
              {(task.labels || []).length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {task.labels.map((label, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-semibold px-2 py-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
                    >
                      {label}
                    </span>
                  ))}
                </div>
              )}

              {task.priority && (
                <span
                  className={`inline-block mt-2 px-2 text-xs font-medium rounded-full
                ${
                  task.priority === "Priority & Important"
                    ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200"
                    : task.priority === "Not Priority & Important"
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200"
                    : task.priority === "Priority & Not Important"
                    ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-200"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-200"
                }`}
                >
                  {task.priority}
                </span>
              )}

              <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <div>
                  <strong>Start :</strong>{" "}
                  {task.start_date
                    ? new Date(task.start_date).toLocaleString()
                    : "-"}
                </div>
                <div>
                  <strong>End :</strong>{" "}
                  {task.end_date
                    ? new Date(task.end_date).toLocaleString()
                    : "-"}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Playground;
