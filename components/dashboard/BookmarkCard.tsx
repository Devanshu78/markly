"use client";

import { motion } from "motion/react";
import { useState } from "react";
import Button from "@/components/Button";
import CopyIcon from "@/components/icons/CopyIcon";
import DeleteIcon from "@/components/icons/DeleteIcon";
import { Bookmark } from "@/app/dashboard/page";

type Props = {
  bookmark: Bookmark;
  index: number;
  deleteBookmark: (id: string) => void;
};

export default function BookmarkCard({
  bookmark,
  index,
  deleteBookmark,
}: Props) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    await navigator.clipboard.writeText(bookmark.url);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="
        flex flex-col gap-4
        bg-gray-50 rounded-2xl p-6
        shadow-sm hover:shadow-md transition
        border border-dashed border-gray-100
      "
    >
      {/* Title + URL */}
      <div>
        <h3 className="text-xl font-semibold">{bookmark.title}</h3>

        <a
          href={bookmark.url}
          target="_blank"
          className="
            text-sm text-indigo-600
            hover:underline break-all
          "
        >
          {bookmark.url}
        </a>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={handleCopy}
          className="flex items-center gap-2"
        >
          <CopyIcon className="size-4" />
          {copied ? "Copied!" : "Copy"}
        </Button>

        <Button
          type="button"
          variant="destructive"
          onClick={() => deleteBookmark(bookmark.id)}
          className="flex items-center gap-2 text-white"
        >
          <DeleteIcon className="size-4" />
          Delete
        </Button>
      </div>
    </motion.div>
  );
}
