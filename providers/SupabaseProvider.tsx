"use client";

import { type Database } from "@/lib/schema";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { useState } from "react";

export default function SupabaseProvider({ children }: { children: React.ReactNode }) {
  // Create a new supabase client on every first-render only
  const [supabaseClient] = useState(() => createClientComponentClient<Database>());

  return <SessionContextProvider supabaseClient={supabaseClient}>{children}</SessionContextProvider>;
}
