import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
  const host = 'http://localhost:5000';
  const noteInitial = []
  const [notes, setNotes] = useState(noteInitial);
  // get all note function
  const getNotes = async () => {
    //Api call
    const response = await fetch(`${host}/api/notes/fetchnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json);
  }
  // Add note function
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const note = await response.json();
    setNotes(notes.concat(note));
  }

  //edit note function 
  const editNote = async (id, title, description, tag) => {
    //api call 
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log(json);
    let newNotes=JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        newNotes[index].description = description;
        break;
      }
    }
    console.log(newNotes);
    setNotes(newNotes);
  }
  //delete note function
  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json)
    const newNote = notes.filter((note) => { return note._id !== id })
    setNotes(newNote);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, editNote, deleteNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;