"use client";

import { motion } from "motion/react";
import Button from "@/components/Button";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const items = [
  { label: "Change Password", icon: "🔒" },
  { label: "Notification Preferences", icon: "🔔" },
];

export default function SettingsList() {
  const router = useRouter();
  const logout = async () => {
    const supabase = supabaseBrowser();
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-white rounded-2xl shadow-lg p-6 space-y-3"
    >
      <h2 className="text-xl font-semibold">Account Settings</h2>

      {items.map((item, i) => (
        <motion.div
          key={item.label}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.1 }}
          className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition"
        >
          {item.icon} {item.label}
        </motion.div>
      ))}

      <div className="pt-4">
        <Button variant="destructive" onClick={logout}>
          Logout
        </Button>
      </div>
    </motion.div>
  );
}
