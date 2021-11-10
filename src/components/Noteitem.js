import React, { useContext } from 'react';
import noteContext from '../context/notes/noteContext';

function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { title, description, tag } = props.note;

    const handleEditClick=()=>{
        props.updateNote(props.note)
    }

    const handleDeleteClick=()=>{
        deleteNote(props.note._id)
    }
    return (
        <div className='col-md-4'>
            <div className="card my-2">
                <div className="card-body">
                    <div className="d-flex justify-content-between align-item-center">
                        <h5 className="card-title">{title}</h5>
                        <div>
                            <i className="far fa-edit mx-2 text-success" onClick={handleEditClick}></i>
                            <i className="far fa-trash-alt text-danger" onClick={handleDeleteClick}></i>
                        </div>
                    </div>
                    <p className="card-text">{description}</p>
                    <p className="card-text"><b>Tag : </b>{tag}</p>


                </div>
            </div>
        </div>
    )
}

export default Noteitem
