import ProfileCard from "@/components/profile/ProfileCard";
import SettingsList from "@/components/profile/SettingsList";
import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await supabaseServer();
  const { data: totalLinks } = await supabase.from("bookmarks").select("*");

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user) redirect("/");
  const name =
    user.user_metadata?.full_name || user.user_metadata?.name || "User";

  const email = user.email || "no email";

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">👤 User Profile</h1>

      <ProfileCard
        name={name}
        email={email}
        totalLinks={totalLinks?.length || 0}
        src={user.user_metadata?.avatar_url}
      />

      <SettingsList />
    </main>
  );
}
