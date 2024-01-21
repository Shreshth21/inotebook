import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [notes, setNotes] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const onChange = (e) => {
        setNotes({ ...notes, [e.target.name]: e.target.value })
    }

    const handleClick = (e) => {
        e.preventDefault();
        addNote(notes.title, notes.description, notes.tag);
        setNotes({ title: "", description: "", tag: "" });
        props.showAlert("Note added successfully!", 'success');
    }

    return (
        <div>
            <div className="container">
                <h1>Add a note!</h1>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" value={notes.title} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea className="form-control" id="description" name="description" value={notes.description} rows="2" onChange={onChange}></textarea>
                </div>
                <button type="button" disabled={notes.title.length < 5 || notes.description.length < 5} className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </div>
        </div>
    )
}

export default AddNote
