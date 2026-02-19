"use client";
import { useState, useEffect } from "react";
import AddBookmarkForm from "@/components/dashboard/AddBookmarkForm";
import BookmarkCard from "@/components/dashboard/BookmarkCard";
import EmptyState from "@/components/dashboard/EmptyState";
import { motion } from "motion/react";
import axios from "axios";
import toast from "react-hot-toast";
import { supabaseBrowser } from "@/lib/supabase/client";

export type Bookmark = {
  id: string;
  user_id: string;
  title: string;
  url: string;
  created_at: string;
};

export default function DashboardPage() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);

  const fetchBookmarks = async () => {
    try {
      const res = await axios.get("/api/bookmark");
      setBookmarks(res.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch bookmarks");
    }
  };

  const deleteBookmark = async (id: string) => {
    try {
      const res = await axios.delete(`/api/bookmark/${id}`);
      if (res) {
        toast.success("Bookmark deleted");
      }
      setBookmarks((prev) => prev.filter((b) => b.id !== id));
    } catch {
      toast.error("Delete failed");
    }
  };

  useEffect(() => {
    fetchBookmarks();

    const supabase = supabaseBrowser();

    let channel: any;

    async function setupRealtime() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) return;

      channel = supabase
        .channel("bookmark-changes")
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table: "bookmarks",
            filter: `user_id=eq.${user.id}`,
          },
          (payload) => {
            console.log("Realtime Method:", payload.eventType);
            console.log("Realtime:", payload);

            if (payload.eventType === "INSERT") {
              setBookmarks((prev) => [payload.new as Bookmark, ...prev]);
            }

            if (payload.eventType === "DELETE") {
              setBookmarks((prev) =>
                prev.filter((b) => b.id !== payload.old.id),
              );
            }
          },
        )
        .subscribe();
    }

    setupRealtime();

    return () => {
      if (channel) supabase.removeChannel(channel);
    };
  }, []);
  return (
    <main className="px-6 mt-4 md:mt-6 w-full flex-1">
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-700">
          Your Bookmarks
        </h1>
        <p className="text-gray-500 mt-2">
          Add, manage and access your saved links instantly.
        </p>
      </motion.div>

      <AddBookmarkForm />

      <div className="space-y-4 mt-8">
        {bookmarks?.length === 0 && <EmptyState />}

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ">
          {bookmarks?.map((bookmark, i) => (
            <BookmarkCard
              key={bookmark.id}
              bookmark={bookmark}
              index={i}
              deleteBookmark={deleteBookmark}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
