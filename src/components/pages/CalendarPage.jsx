import React, { useEffect, useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { supabase } from "../../supabaseClient"; // adjust path if needed

export default function CalendarPage() {
  const [events, setEvents] = useState([]);

  // 🔹 Priority colors (Tailwind 200 shades)
  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Priority & Important":
        return "#fecaca"; // red-200
      case "Not Priority & Important":
        return "#bfdbfe"; // blue-200
      case "Priority & Not Important":
        return "#fef08a"; // yellow-200
      case "Not Priority & Not Important":
        return "#e5e7eb"; // gray-200
      default:
        return "#99f6e4"; // teal-200 fallback
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const { data, error } = await supabase
        .from("tasks")
        .select("id, title, start_date, end_date, priority, labels");

      if (!error && data) {
        const mapped = data.map((t) => ({
          id: t.id,
          title: t.title,
          start: t.start_date,
          end: t.end_date,
          allDay: !t.start_date?.includes("T"),
          backgroundColor: getPriorityColor(t.priority), // ✅ soft colors
          borderColor: getPriorityColor(t.priority),
          textColor: "black", // text stays readable on light background
          extendedProps: {
            priority: t.priority,
            labels: t.labels,
          },
        }));
        setEvents(mapped);
      }
    };
    fetchTasks();
  }, []);

  const handleEventClick = (info) => {
    const task = info.event;
    alert(
      `Task: ${task.title}\nPriority: ${task.extendedProps.priority}\nLabels: ${task.extendedProps.labels?.join(
        ", "
      )}`
    );
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Task Calendar</h2>

      <div className="bg-white shadow rounded-lg p-4">
        <FullCalendar
          plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,timeGridWeek,timeGridDay",
          }}
          events={events}
          eventClick={handleEventClick}
          height="80vh"
        />
      </div>
    </div>
  );
}
