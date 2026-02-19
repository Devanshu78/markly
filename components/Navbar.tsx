"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Button from "@/components/Button";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { supabaseBrowser } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const links = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
];

const container = {
  hidden: { opacity: 0, y: -20, scale: 0.95 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.25,
      when: "beforeChildren",
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.95,
    transition: { duration: 0.2 },
  },
};

const item = {
  hidden: { opacity: 0, x: 40 },
  show: { opacity: 1, x: 0, transition: { duration: 0.25 } },
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const supabase = supabaseBrowser();

  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };

    getUser();

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      },
    );

    return () => listener.subscription.unsubscribe();
  }, []);

  return (
    <nav className="relative border border-dashed border-gray-200 bg-slate-100 rounded-2xl mt-4 p-4 flex justify-between items-center shadow-sm">
      <Link href="/">
        <h1 className="text-2xl md:text-3xl bg-linear-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent font-bold">
          MARKLY
        </h1>
      </Link>

      <ul className="hidden md:flex gap-6">
        {links.map((link) => (
          <li key={link.label}>
            <Link href={link.href} className="hover:text-indigo-600">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="hidden md:block">
        {user ? (
          <img
            src={user.user_metadata?.avatar_url}
            alt="avatar"
            onClick={() => router.push("/profile")}
            className="w-10 h-10 rounded-full cursor-pointer border hover:scale-105 transition"
          />
        ) : (
          <Button onClick={login} variant="outline">
            <GoogleIcon className="size-6" />
            Login
          </Button>
        )}
      </div>

      <button className="md:hidden" onClick={() => setOpen((prev) => !prev)}>
        {open ? <X size={28} /> : <Menu size={28} />}
      </button>

      <AnimatePresence>
        {open && (
          <>
            <div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-40"
            />

            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              exit="exit"
              className="absolute right-4 top-20 z-50 w-64 rounded-2xl border border-dashed border-gray-100 bg-white shadow-xl p-6 flex flex-col gap-5"
            >
              {links.map((link) => (
                <motion.div variants={item} key={link.label}>
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block text-lg hover:text-indigo-600"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div variants={item}>
                {user ? (
                  <div
                    onClick={() => {
                      router.push("/profile");
                      setOpen(false);
                    }}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <img
                      src={user.user_metadata?.avatar_url}
                      className="w-10 h-10 rounded-full"
                    />
                    <span>Profile</span>
                  </div>
                ) : (
                  <Button onClick={login} variant="outline" className="w-full">
                    <GoogleIcon className="size-6" />
                    Login
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
