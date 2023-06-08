"use client";

import { Card, CardContent } from "@/components/ui/card";
import type { Database } from "@/lib/schema";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import EntryModal from "./components-main/entry-modal";
import BasicTable from "./components-main/table";
type Entry = Database["public"]["Tables"]["Entries"]["Row"];
type NewEntry = Database["public"]["Tables"]["Entries"]["Insert"];

export default function Home() {
  const [entries, setEntries] = useState<Entry[] | null>(null);
  const supabase = useSupabaseClient<Database>();
  const user = useUser();

  useEffect(() => {
    const getData = async () => {
      if (user) {
        const { data } = await supabase.from("Entries").select("*").eq("user_id", user?.id);
        setEntries(data);
      }
    };
    void getData();
  }, [supabase, user]);

  const emptyEntry: NewEntry = {
    name: "",
    link: "",
    description: "",
    user: "",
    user_id: "",
    id: "",
  };

  return (
    <main>
      <EntryModal entry={emptyEntry} type="add" setEntries={setEntries} />
      {entries && (
        <Card className="mt-7">
          <CardContent>
            <BasicTable entries={entries} setEntries={setEntries} />
          </CardContent>
        </Card>
      )}
    </main>
  );
}
