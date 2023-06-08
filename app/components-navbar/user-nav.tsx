"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { type Database } from "@/lib/schema";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function UserNav() {
  const supabaseClient = useSupabaseClient<Database>();
  const user = useUser();

  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      return;
    }
    router.refresh();
  };

  if (!user) {
    return null;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.user_metadata.avatar_url as string} alt="@shadcn" />
            <AvatarFallback>{user.email?.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User Name</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {/* Mark promise as purposefully dangling for clarity: https://github.com/typescript-eslint/typescript-eslint/issues/4619 */}
        <DropdownMenuItem
          onClick={() => {
            void handleSignOut();
          }}
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
