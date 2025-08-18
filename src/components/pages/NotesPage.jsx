import React, { useState, useEffect } from "react";
import { supabase } from "../../supabaseClient";

export default function NotesPage() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: "", labels: "", content: "" });
  const [search, setSearch] = useState("");

  // fetch notes
  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const { data, error } = await supabase
      .from("notes")
      .select("*")
      .order("pinned", { ascending: false })
      .order("updated_at", { ascending: false });
    if (!error) setNotes(data || []);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addNote = async () => {
    if (!form.title.trim() && !form.content.trim()) return;
    const { data: user } = await supabase.auth.getUser();
    await supabase.from("notes").insert({
      user_id: user.user.id,
      title: form.title,
      content: form.content,
      labels: form.labels
        ? form.labels.split(",").map((l) => l.trim())
        : [],
    });
    setForm({ title: "", labels: "", content: "" });
    fetchNotes();
  };

  const filteredNotes = notes.filter(
    (n) =>
      n.title.toLowerCase().includes(search.toLowerCase()) ||
      n.content.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-xl font-bold mb-6">Notes / Scratchpad</h1>

      {/* Note Input */}
      <div className="bg-white border rounded-lg shadow p-4 mb-6">
        <div className="flex gap-2 mb-2">
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-1/3 px-3 py-2 border rounded"
          />
          <input
            type="text"
            name="labels"
            value={form.labels}
            onChange={handleChange}
            placeholder="Labels (comma)"
            className="flex-1 px-3 py-2 border rounded"
          />
        </div>
        <textarea
          name="content"
          value={form.content}
          onChange={handleChange}
          placeholder="Write something..."
          className="w-full px-3 py-2 border rounded mb-2"
          rows="3"
        />
        <button
          onClick={addNote}
          className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
        >
          Add Note
        </button>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search notes..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 border rounded mb-4"
      />

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <p className="text-gray-500">No notes yet.</p>
      ) : (
        <div className="space-y-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className="bg-white border rounded-lg shadow p-4"
            >
              <h2 className="font-semibold">{note.title}</h2>
              {note.labels?.length > 0 && (
                <div className="flex gap-2 mt-1 mb-2">
                  {note.labels.map((l, i) => (
                    <span
                      key={i}
                      className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800"
                    >
                      {l}
                    </span>
                  ))}
                </div>
              )}
              <p className="text-gray-700">{note.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
