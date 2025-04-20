"use client";

import { prisma } from "@/db/prisma";

type Note = Awaited<ReturnType<typeof prisma.note.findFirst>>;

type Props = {
  notes: Note[];
};

function SidebarGroupContent({ notes }: Props) {
  console.log(notes);
  return <div>Your notes here</div>;
}

export default SidebarGroupContent;
