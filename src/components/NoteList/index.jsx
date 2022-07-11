import React from "react";
import Note from "../Note";
import { useSelector } from "react-redux";
export default function NoteList() {
  const noteList = useSelector((state) => state.dataLocal.dataFromLocalStorage);
  return (
    <div className="container  note-list  ">
      <p className="text-2xl font-semibold note-heading p-2">Note List 📌</p>
      <div className="container p-2">
        {noteList?.map((note) => (
          <Note
            title={note.title}
            content={note.content}
            key={note.id}
            id={note.id}
          />
        ))}
      </div>
    </div>
  );
}
