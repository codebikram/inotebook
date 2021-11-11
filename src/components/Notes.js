import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import AddNote from './AddNote';
import Noteitem from './Noteitem'

function Notes() {
    const context = useContext(noteContext);
    const { notes, getNotes, editNote } = context;
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "Default" })
    const ref = useRef(null);
    const refClose = useRef(null);
    useEffect(() => {
        getNotes()
        // eslint-disable-next-line
    }, [])
    const handleUpdateClick = () => {
        editNote(note.id, note.etitle, note.edescription, note.etag);
        refClose.current.click();

    }
    const onChangeText = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({ id: currentNote._id, etitle: currentNote.title, etag: currentNote.tag, edescription: currentNote.description });

    }
    return (
        <>
            <AddNote />
            <button type="button" style={{ display: "none" }} className="btn btn-primary" data-toggle="modal" ref={ref} data-target="#exampleModal">
                Launch demo modal
            </button>


            <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group">
                                    <label htmlFor="etitle">Title</label>
                                    <input type="text" className="form-control" id="etitle" name='etitle' value={note.etitle}
                                        placeholder="Enter title here" onChange={onChangeText} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="etag">Tag</label>
                                    <input type="text" className="form-control" id="etag" name='etag'
                                        value={note.etag} placeholder="Enter tag here" onChange={onChangeText} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="edescription">Description</label>
                                    <textarea id="edescription" className="form-control"
                                        value={note.edescription} name="edescription" rows="4" cols="50" onChange={onChangeText} placeholder="Enter description here" />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={refClose} className="btn btn-secondary" data-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 3 || note.edescription.length < 5} className="btn btn-primary" onClick={handleUpdateClick}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
            <h2 className='my-3'>Your Notes</h2>
            <div className='row my-1'>
                <div className="container ml-1">
              
                    {notes.length === 0 && 'No notes to display !!'}
              
                </div>
                {notes.map((note) => {
                    return <Noteitem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
