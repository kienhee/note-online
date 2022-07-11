import React from "react";
import EditorMain from "../EditorMain";
import NoteList from "../NoteList";
export default function Home() {
  return (
    <div className="container mx-auto flex justify-between flex-col  lg:flex-row p-4 gap-4">
      <EditorMain />
      <NoteList />
      
    </div>
  );
}
