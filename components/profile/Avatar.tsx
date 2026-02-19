"use client";

import { motion } from "motion/react";

export default function Avatar({
  name,
  src,
}: {
  name: string;
  src?: string | null;
}) {
  const initials = name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (src) {
    return (
      <motion.img
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3 }}
        src={src}
        alt={name}
        className="w-32 h-32 rounded-full object-cover shadow-lg"
      />
    );
  }

  return (
    <motion.div
      initial={{ scale: 0, rotate: -40 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 12 }}
      className="w-32 h-32 rounded-full bg-linear-to-r from-indigo-500 to-pink-500 flex items-center justify-center text-white text-4xl font-bold shadow-lg"
    >
      {initials || "U"}
    </motion.div>
  );
}
