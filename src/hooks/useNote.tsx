"use client";

import { useContext } from "react";
import { NoteProviderContext } from "@/providers/NoteProvider";


function useNote() {
  const context = useContext(NoteProviderContext);

  if (!context) {
    throw new Error("useNote must be used within a NoteProvider");
  }

  return context;
}

export default useNote;
