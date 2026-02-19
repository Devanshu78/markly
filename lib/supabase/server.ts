import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function supabaseServer(response?: any) {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },

        set(name: string, value: string, options: any) {
          response?.cookies.set({
            name,
            value,
            ...options,
          });
        },

        remove(name: string, options: any) {
          response?.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );
}

export async function getUser() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getUser();

  return data.user;
}
