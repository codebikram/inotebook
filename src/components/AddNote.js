import React, { useContext, useState } from 'react';
import noteContext from '../context/notes/noteContext';


function AddNote(props) {
    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })

    const handleAddClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" });
        props.showAlert('Added successfully', 'success')
    }

    const onChangeText = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <>
            <h2>Add a Note</h2>
            <form className="my-2">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" name='title' value={note.title}
                        placeholder="Enter title here" onChange={onChangeText} required />
                </div>
                <div className="form-group">
                    <label htmlFor="tag">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag' value={note.tag}
                        placeholder="Enter tag here" onChange={onChangeText} required />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Description</label>
                    <textarea id="description" className="form-control"
                        name="description" rows="4" cols="50" onChange={onChangeText} required value={note.description} placeholder="Enter description here" />
                </div>
                <button type="submit" disabled={note.title.length < 3 || note.description.length < 5} className="btn btn-dark" onClick={handleAddClick}>Add</button>
            </form>
        </>
    )
}

export default AddNote
