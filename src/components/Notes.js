import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext';
import NoteItem from './NoteItem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom'

const Notes = (props) => {
    const context = useContext(noteContext);
    const { notes, fetchAllNotes, editNote } = context;
    let navigate = useNavigate();
    useEffect(() => {
        if(localStorage.getItem('token')){
            fetchAllNotes();
        }else{
            navigate("/login")
        }
        
    }, [])

    const [note, setNote] = useState({
        id: "",
        title: "",
        description: "",
        tag: ""
    })
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        refClose.current.click();
        editNote(note._id, note.title, note.description, note.tag);
        e.preventDefault();
    }

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote(currentNote);
    }

    const ref = useRef(null);
    const refClose = useRef(null);

    return (
        <>
            <AddNote showAlert={props.showAlert}/>
            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <div className="container">
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="title" name="title" value={note.title} onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <textarea className="form-control" id="description" value={note.description} name="description" rows="2" onChange={onChange}></textarea>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">

                <h2>Your notes</h2>
                <div className="container mx-2">
                {notes.length===0 && 'New notes will display here'}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert} />
                })}
            </div>
        </>
    )
}

export default Notes