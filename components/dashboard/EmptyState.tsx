"use client";

import { motion } from "motion/react";

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center py-16 border border-dashed border-gray-100 rounded-4xl bg-gray-50"
    >
      <p className="text-gray-500 text-shadow-2xs">
        No bookmarks yet. Add your first one.
      </p>
    </motion.div>
  );
}
