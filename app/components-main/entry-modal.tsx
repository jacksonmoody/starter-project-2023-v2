/* eslint-disable no-console */
import { Icons } from "@/components/icons";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Database } from "@/lib/schema";
import { useSupabaseClient, useUser } from "@supabase/auth-helpers-react";
import { useState } from "react";
type Entry = Database["public"]["Tables"]["Entries"]["Insert"];

interface EntryModalProps {
  entry: Entry;
  type: string;
  setEntries: React.Dispatch<React.SetStateAction<Entry[] | null>>;
}

export default function EntryModal({ entry, type, setEntries }: EntryModalProps) {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(entry.name);
  const [link, setLink] = useState(entry.link);
  const [description, setDescription] = useState(entry.description);
  const [category, setCategory] = useState(entry.category);

  const handleClickOpen = () => {
    if (type === "add") {
      setIsEditing(true);
    }
    setName(entry.name);
    setLink(entry.link);
    setDescription(entry.description);
    setCategory(entry.category);
  };

  const handleClose = () => {
    getUpdatedEntries().then(
      () => {
        setIsEditing(false);
      },
      (error) => {
        console.log(error);
      },
    );
  };

  const handleEdit = () => {
    void supabase
      .from("Entries")
      .update({
        name: name,
        description: description,
        category: category,
        user: user?.user_metadata.name as string,
        user_id: user?.id as string,
        link: link,
      })
      .eq("id", entry.id)
      .then(() => {
        handleClose();
      });
  };

  const handleAdd = () => {
    void supabase
      .from("Entries")
      .insert({
        name: name,
        description: description,
        category: category,
        user: user?.user_metadata.name as string,
        user_id: user?.id as string,
        link: link,
      })
      .then(() => {
        handleClose();
      });
  };

  const handleDelete = () => {
    void supabase
      .from("Entries")
      .delete()
      .eq("id", entry.id)
      .then(() => {
        handleClose();
      });
  };

  async function getUpdatedEntries() {
    const { data } = await supabase.from("Entries").select("*").eq("user_id", user?.id);
    setEntries(data);
  }

  const openButton =
    type === "edit" ? (
      <Button variant="ghost" onClick={handleClickOpen}>
        <Icons.page />
      </Button>
    ) : type === "add" ? (
      <Button onClick={handleClickOpen}>Add Entry</Button>
    ) : null;

  const actionButtons =
    type === "edit" ? (
      <div>
        <DialogClose asChild>
          <Button variant="secondary" className="m-2" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </DialogClose>
        <AlertDialog>
          <AlertDialogTrigger>
            <Button variant="destructive" className="m-2">
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure you want to delete?</AlertDialogTitle>
              <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <DialogClose asChild>
                <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
              </DialogClose>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {isEditing && (
          <DialogClose asChild>
            <Button className="m-2" onClick={handleEdit}>
              Confirm
            </Button>
          </DialogClose>
        )}
        {!isEditing && (
          <Button className="m-2" onClick={() => setIsEditing(true)}>
            Edit
          </Button>
        )}
      </div>
    ) : type === "add" ? (
      <div>
        <DialogClose asChild>
          <Button variant="secondary" className="m-2" onClick={() => setIsEditing(false)}>
            Cancel
          </Button>
        </DialogClose>
        <DialogClose asChild>
          <Button className="m-2" onClick={handleAdd}>
            Add Entry
          </Button>
        </DialogClose>
      </div>
    ) : null;

  const categories = ["Default", "Startup", "Nonprofit", "Miscellaneous"];

  return (
    <Dialog>
      <DialogTrigger asChild>{openButton}</DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-center font-bold">{type === "edit" ? name : "Add Entry"}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="dark: text-right text-slate-900">
              Name
            </Label>
            <Input
              id="name"
              className="col-span-3"
              placeholder={entry?.name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="dark: text-right text-slate-900">
              Link
            </Label>
            <Input
              id="link"
              className="col-span-3"
              placeholder={entry?.link}
              onChange={(e) => setLink(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="dark: text-right text-slate-900">
              Description
            </Label>
            <Textarea
              id="description"
              className="col-span-3"
              placeholder={entry?.description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="dark: text-right text-slate-900">
              Category
            </Label>
            <Select onValueChange={(value) => setCategory(value)}>
              <SelectTrigger disabled={!isEditing} className="col-span-3">
                <SelectValue placeholder={category == null ? "Select a Category" : category} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>{actionButtons}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
