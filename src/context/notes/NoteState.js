// notecontext.js
import React, { createContext, useState } from 'react';

const NoteContext = createContext();

const NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "65d36bbcf03fc217fd5166d5",
      "user": "65d343416280aa155ff10d72",
      "title": "My title",
      "description": "My description",
      "tag": "General",
      "date": "2024-02-19T14:54:52.553Z",
      "__v": 0
    },
    {
      "_id": "65d36eb0f03fc217fd5d166d7",
      "user": "65d343416280aa155ff10d72",
      "title": "My title",
      "description": "My description",
      "tag": "General",
      "date": "2024-02-19T15:07:28.590Z",
      "__v": 0
    },
    {
      "_id": "65d36eb0f03fc217fd516f6d7",
      "user": "65d343416280aa155ff10d72",
      "title": "My title",
      "description": "My description",
      "tag": "General",
      "date": "2024-02-19T15:07:28.590Z",
      "__v": 0
    },
    {
      "_id": "65d36eb0f03fc217fd5166dg7",
      "user": "65d343416280aa155ff10d72",
      "title": "My title",
      "description": "My description",
      "tag": "General",
      "date": "2024-02-19T15:07:28.590Z",
      "__v": 0
    },
    {
      "_id": "65d36eb0f03fc217fd5166fd7",
      "user": "65d343416280aa155ff10d72",
      "title": "My title",
      "description": "My description",
      "tag": "General",
      "date": "2024-02-19T15:07:28.590Z",
      "__v": 0
    }
  ];

  const [notes, setNotes] = useState(notesInitial);


  // Add Note
const addNote =(title,description,tag)=>{
  // TODO api call
  const note={
    "_id": "65d36eb0f03fc217fd5166fd7",
    "user": "65d343416280aa155ff10d72",
    "title": title,
    "description": description,
    "tag": tag,
    "date": "2024-02-19T15:07:28.590Z",
    "__v": 0
  };
setNotes(notes.concat(note))
}

  // Delete Note 

const  DeleteNote=(id)=>{
console.log("delete"+id)
 }

// Update Note
const UpdateNote=()=>{

  }


  return (
    <NoteContext.Provider value={{ notes,addNote,DeleteNote,UpdateNote }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export { NoteContext, NoteState };
