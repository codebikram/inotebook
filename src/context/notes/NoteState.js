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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTU0ZTZkMWU1Njg1YjEyNTcwNjY5In0sImlhdCI6MTYzNDYyMTcxMX0.-4jxzl2v6wUcWKz1H0eOFu33MfBVzAQOcEL5I4_7lY4"
      },
    });
    const json = await response.json();
    console.log(json);
    setNotes(json);
  }
  // Add note function
  const addNote = async (title, description, tag) => {
    //Api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTU0ZTZkMWU1Njg1YjEyNTcwNjY5In0sImlhdCI6MTYzNDYyMTcxMX0.-4jxzl2v6wUcWKz1H0eOFu33MfBVzAQOcEL5I4_7lY4"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = await response.json();
    console.log("adding a note" + json)
    let note = {
      "_id": "616ea0a8fee927e822c676fa",
      "user": "616e54e6d1e5685b12570669",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-10-19T10:40:40.097Z",
      "__v": 0
    };
    setNotes(notes.concat(note));
  }

  //edit note function 
  const editNote = async (id, title, description, tag) => {
    //api call 
    console.log(id);
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTU0ZTZkMWU1Njg1YjEyNTcwNjY5In0sImlhdCI6MTYzNDYyMTcxMX0.-4jxzl2v6wUcWKz1H0eOFu33MfBVzAQOcEL5I4_7lY4"
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
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE2ZTU0ZTZkMWU1Njg1YjEyNTcwNjY5In0sImlhdCI6MTYzNDYyMTcxMX0.-4jxzl2v6wUcWKz1H0eOFu33MfBVzAQOcEL5I4_7lY4"
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