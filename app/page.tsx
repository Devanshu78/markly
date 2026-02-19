"use client";
import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Button from "@/components/Button";
import GoogleIcon from "@/components/icons/GoogleIcon";
import { supabaseBrowser } from "@/lib/supabase/client";
import AddIcon from "@/components/icons/AddIcon";

const headline = "Save your links. Access anywhere.";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);
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
  }, []);

  console.log("user", user);

  return (
    <main className="flex items-center justify-center flex-1">
      <section className="text-center max-w-3xl">
        <h1
          className="
            text-3xl md:text-5xl tracking-tight
            font-bold
            leading-tight text-gray-800
          "
        >
          {headline.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                delay: i * 0.03,
                type: "spring",
                stiffness: 400,
                damping: 18,
              }}
              className="inline-block"
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="mt-6 text-lg text-gray-500"
        >
          Private. Fast. Real-time.
        </motion.p>

        <motion.div
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1, type: "spring" }}
          className="mt-10 flex justify-center"
        >
          {user ? (
            <Button variant="outline">
              <AddIcon className="fill-pink-600" />
              Add Your Bookmark
            </Button>
          ) : (
            <Button onClick={login} variant="outline">
              <GoogleIcon className="size-5" />
              Login with Google
            </Button>
          )}
        </motion.div>

        <motion.p
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-sm text-gray-400 border border-gray-200 px-4 py-2 rounded-full inline-block"
        >
          ⭐ 4.8/5 trusted by 2k+ users
        </motion.p>
      </section>
    </main>
  );
}
