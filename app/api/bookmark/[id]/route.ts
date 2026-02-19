import { NextResponse } from "next/server";
import { supabaseServer, getUser } from "@/lib/supabase/server";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } },
) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = await supabaseServer();

  const { error } = await supabase
    .from("bookmarks")
    .delete()
    .eq("id", id)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
