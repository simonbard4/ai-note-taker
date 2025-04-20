"use client";

import { prisma } from "@/db/prisma";
import useNote from "@/hooks/useNote";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SidebarMenuButton } from "./ui/sidebar";
import Link from "next/link";

type Note = Awaited<ReturnType<typeof prisma.note.findFirst>>;

type Props = {
  note: Note;
};

function SelectNoteButton({ note }: Props) {
  const noteId = useSearchParams().get("noteId") || "";

  const { noteText: selectedNoteText } = useNote();
  const [shouldBeGlobalNoteText, setShouldBeGlobalNoteText] = useState(false);
  const [localNoteText, setLocalNoteText] = useState(note!.text);

  useEffect(() => {
    if (noteId === note!.id) {
      setShouldBeGlobalNoteText(true);
    } else {
      setShouldBeGlobalNoteText(false);
    }
  }, [noteId, note!.id]);

  useEffect(() => {
    if (shouldBeGlobalNoteText) {
      setLocalNoteText(selectedNoteText);
    }
  }, [selectedNoteText, shouldBeGlobalNoteText]);

  const blankNoteText = "EMPTY NOTE";
  let noteText = localNoteText || blankNoteText;

  if (shouldBeGlobalNoteText) {
    noteText = selectedNoteText || blankNoteText;
  }

  // Format date on the client side only
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    setFormattedDate(note!.updatedAt.toLocaleDateString());
  }, [note!.updatedAt]);

  return (
    <SidebarMenuButton
      asChild
      className={`items-start gap-0 pr-12 ${noteId === note!.id && "bg-sidebar-accent/50"}`}
    >
      <Link href={`/?noteId=${note!.id}`} className="flex h-fit flex-col">
        <p className="w-full truncate overflow-hidden text-ellipsis whitespace-nowrap">
          {noteText}
        </p>
        <p className="text-muted-foreground text-xs">{formattedDate}</p>
      </Link>
    </SidebarMenuButton>
  );
}

export default SelectNoteButton;
