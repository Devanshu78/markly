"use client";

import { motion } from "motion/react";
import Avatar from "./Avatar";

type Props = {
  name: string;
  email: string;
  totalLinks: number;
  src: string;
};

export default function ProfileCard({ name, email, totalLinks, src }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row items-center gap-6"
    >
      <Avatar name={name} src={src} />

      <div className="text-center md:text-left space-y-2">
        <p className="text-lg">
          <span className="font-semibold">Name:</span> {name}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Email:</span> {email}
        </p>

        <p className="text-lg">
          <span className="font-semibold">Total Links Saved:</span> {totalLinks}
        </p>
      </div>
    </motion.div>
  );
}
