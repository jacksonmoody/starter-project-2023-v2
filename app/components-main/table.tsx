import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Database } from "@/lib/schema";
import EntryModal from "./entry-modal";
type Entry = Database["public"]["Tables"]["Entries"]["Row"];

export default function BasicTable({
  entries,
  setEntries,
}: {
  entries: Entry[] | null;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[350px]">Name</TableHead>
          <TableHead className="w-[350px]">Link</TableHead>
          <TableHead>User</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Open</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {entries?.map((entry) => (
          <TableRow key={entry.id}>
            <TableCell className="font-medium">{entry.name}</TableCell>
            <TableCell>
              <a href={"https://" + entry.link} target="_blank" className="text-blue-600 hover:underline">
                {entry.link}
              </a>
            </TableCell>
            <TableCell>{entry.user}</TableCell>
            <TableCell>{entry.category}</TableCell>
            <TableCell>{<EntryModal entry={entry} type="edit" setEntries={setEntries} />}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
