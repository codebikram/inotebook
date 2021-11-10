import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';


function AddNote() {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "Default" })

    const handleAddClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
    }

    const onChangeText = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className="my-3">
            <h2>Add a Note</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name='title'
                        placeholder="Enter title here" onChange={onChangeText} />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag'
                        placeholder="Enter tag here" onChange={onChangeText} />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="form-control"
                        name="description" rows="4" cols="50" onChange={onChangeText} placeholder="Enter description here" />
                </div>
                <button type="submit" className="btn btn-dark" onClick={handleAddClick}>Add</button>
            </form>
        </div>
    )
}

export default AddNote
