import ProfileCard from "@/components/profile/ProfileCard";
import SettingsList from "@/components/profile/SettingsList";
import { getUser } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function ProfilePage() {
  const user = await getUser();

  if (!user) {
    return redirect("/");
  }

  const name =
    user?.user_metadata?.full_name || user?.user_metadata?.name || "User";

  const email = user?.email || "no email";

  // Replace later with real DB count
  const totalLinks = 11;

  return (
    <main className="max-w-5xl mx-auto px-4 py-10 space-y-8">
      <h1 className="text-3xl font-bold">👤 User Profile</h1>

      <ProfileCard
        name={name}
        email={email}
        totalLinks={totalLinks}
        src={user?.user_metadata?.avatar_url}
      />

      <SettingsList />
    </main>
  );
}
