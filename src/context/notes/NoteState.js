import NoteContext from './noteContext';
import { useState } from 'react';

const NoteState = (props) => {
    const noteInitial=[  
        {
        "_id": "616ea0a7fee927e822c676f8",
        "user": "616e54e6d1e5685b12570669",
        "title": "myself",
        "description": "hello my name is bikram",
        "tag": "personal",
        "date": "2021-10-19T10:40:39.592Z",
        "__v": 0
      },
      {
        "_id": "616ea0a8fee927e822c676fa",
        "user": "616e54e6d1e5685b12570669",
        "title": "asansol",
        "description": "welcome to asansol",
        "tag": "personal",
        "date": "2021-10-19T10:40:40.097Z",
        "__v": 0
      },
      {
        "_id": "616ea0a8fee927e822c676fa",
        "user": "616e54e6d1e5685b12570669",
        "title": "asansol",
        "description": "welcome to asansol",
        "tag": "personal",
        "date": "2021-10-19T10:40:40.097Z",
        "__v": 0
      },
      {
        "_id": "616ea0a8fee927e822c676fa",
        "user": "616e54e6d1e5685b12570669",
        "title": "asansol",
        "description": "welcome to asansol",
        "tag": "personal",
        "date": "2021-10-19T10:40:40.097Z",
        "__v": 0
      },
      {
        "_id": "616ea0a8fee927e822c676fa",
        "user": "616e54e6d1e5685b12570669",
        "title": "asansol",
        "description": "welcome to asansol",
        "tag": "personal",
        "date": "2021-10-19T10:40:40.097Z",
        "__v": 0
      },
      {
        "_id": "616ea0a8fee927e822c676fa",
        "user": "616e54e6d1e5685b12570669",
        "title": "asansol",
        "description": "welcome to asansol",
        "tag": "personal",
        "date": "2021-10-19T10:40:40.097Z",
        "__v": 0
      }
    ]
  const [notes, setNotes] = useState(noteInitial)
    return (
        <NoteContext.Provider value={{notes,setNotes}}>
            {props.children}
        </NoteContext.Provider>
    )
}
export default NoteState;