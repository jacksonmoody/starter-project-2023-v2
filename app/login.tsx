"use client";
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { TypographyH3, TypographyH4 } from "@/components/ui/typography";
import { type Database } from "@/lib/schema";
import { useSessionContext, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Login() {
  // Obtain session from context provider
  const router = useRouter();
  const { session } = useSessionContext();

  // Refresh route on session status (login) change
  useEffect(() => {
    if (session) {
      router.refresh();
    }
  }, [session, router]);

  // Obtain supabase client from context provider and pass to imported Auth UI
  const supabaseClient = useSupabaseClient<Database>();

  return (
    <>
      <TypographyH3>Welcome to Links For Climate Good!</TypographyH3>
      <TypographyH4>Sign in with your GitHub account below to get started:</TypographyH4>
      <div className="flex flex-col items-center justify-center pt-3">
        <Button size="lg" onClick={() => supabaseClient.auth.signInWithOAuth({ provider: "github" })}>
          <Icons.gitHub className="mr-3 h-5 w-5" /> Sign In With GitHub
        </Button>
      </div>
    </>
  );
}
