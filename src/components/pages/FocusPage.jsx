import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function FocusPage() {
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState("work");
  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const [history, setHistory] = useState([]);

  // fetch available tasks
  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase.from("tasks").select("id, title");
      if (!error) setTasks(data || []);
    };
    fetchTasks();
  }, []);

  // fetch today’s focus history
  const fetchHistory = async () => {
    const { data: user } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from("focus_sessions")
      .select("*")
      .eq("user_id", user.user.id)
      .gte("created_at", new Date().toISOString().split("T")[0]); // today only
    if (!error) setHistory(data || []);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleSessionEnd();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const handleSessionEnd = async () => {
    const { data: user } = await supabase.auth.getUser();
    await supabase.from("focus_sessions").insert({
      user_id: user.user.id,
      task_id: taskId || null,
      duration_seconds: mode === "work" ? 25 * 60 : 5 * 60,
      kind: mode,
    });

    // refresh history
    fetchHistory();

    // switch mode
    const nextMode = mode === "work" ? "break" : "work";
    setMode(nextMode);
    setTime(nextMode === "work" ? 25 * 60 : 5 * 60);
    setIsRunning(false);
  };

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // count work & break sessions
  const workCount = history.filter((h) => h.kind === "work").length;
  const breakCount = history.filter((h) => h.kind === "break").length;

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6">Focus Mode (Pomodoro)</h1>

      {/* Top Controls */}
      <div className="flex justify-between items-center mb-4">
        <div className="space-x-2">
          <button
            onClick={() => {
              setMode("work");
              setTime(25 * 60);
            }}
            className={`px-3 py-1 rounded border ${
              mode === "work"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-black border-gray-400"
            }`}
          >
            Work
          </button>
          <button
            onClick={() => {
              setMode("break");
              setTime(5 * 60);
            }}
            className={`px-3 py-1 rounded border ${
              mode === "break"
                ? "bg-green-600 text-white border-green-600"
                : "bg-white text-black border-gray-400"
            }`}
          >
            Break
          </button>
        </div>

        {/* Task Dropdown */}
        <select
          value={taskId || ""}
          onChange={(e) => setTaskId(e.target.value)}
          className="px-3 py-1 rounded border border-gray-400 bg-white"
        >
          <option value="">Attach to task</option>
          {tasks.map((t) => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {/* Timer Card */}
      <div className="bg-white border rounded-lg shadow p-8 flex flex-col items-center mb-8">
        <div className="text-6xl font-bold mb-6">{formatTime(time)}</div>

        <div className="space-x-4">
          <button
            onClick={() => setIsRunning(true)}
            className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
          >
            Start
          </button>
          <button
            onClick={() => {
              setIsRunning(false);
              setTime(mode === "work" ? 25 * 60 : 5 * 60);
            }}
            className="px-4 py-2 rounded bg-gray-300 text-black hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Today’s History */}
      <div className="bg-white border rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Today’s Focus History</h2>
        <p className="mb-4 text-gray-700">
          {workCount} Work session{workCount !== 1 && "s"},{" "}
          {breakCount} Break session{breakCount !== 1 && "s"}
        </p>

        {history.length === 0 ? (
          <p className="text-gray-500">No sessions yet.</p>
        ) : (
          <ul className="space-y-2">
            {history.map((h) => (
              <li
                key={h.id}
                className="border-b pb-2 text-gray-700 flex justify-between"
              >
                <span>
                  {h.kind === "work" ? "🟢 Work" : "🟡 Break"} —{" "}
                  {Math.floor(h.duration_seconds / 60)} min
                </span>
                <span className="text-sm text-gray-500">
                  {new Date(h.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
