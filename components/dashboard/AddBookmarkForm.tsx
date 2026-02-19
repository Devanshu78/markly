"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/Button";
import AddIcon from "@/components/icons/AddIcon";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddBookmarkForm() {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !url) return;

    setLoading(true);

    try {
      const res = await axios.post(
        "/api/bookmark",
        { url, title },
        {
          withCredentials: true,
        },
      );
      if (!res.data.success || res.data.error) {
        toast.error("Failed to add bookmark");
        return;
      }
      toast.success("Bookmark added");
    } catch (err) {
      toast.error("Failed to add bookmark");
    }
    setLoading(false);
    setTitle("");
    setUrl("");
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="
        bg-gray-100 border border-dashed border-gray-100 rounded-2xl p-6 shadow-sm
        flex flex-col md:flex-row gap-4
      "
    >
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none focus:border-none"
      />

      <input
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="https://example.com"
        className="flex-1 px-4 py-3 rounded-xl border focus:ring-2 focus:ring-indigo-500 outline-none focus:border-none"
      />

      <Button type="submit" disabled={loading}>
        <AddIcon className="fill-white" /> {loading ? "Adding..." : "Add"}
      </Button>
    </motion.form>
  );
}
