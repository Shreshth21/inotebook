import { useState } from "react";
import NoteContext from "./noteContext";


const NoteState = (props) => {

    const host = "https://inotebook-2tjk.onrender.com/";

    let json = {};

    const fetchAllNotes = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        };
        const url = host + "api/notes/fetchallnotes";
        const response = await fetch(url, requestOptions);
        json = await response.json();
        setNotes(json);
    }

    const initialNotes = []

    const [notes, setNotes] = useState(initialNotes);

    const addNote = async (title, description, tag) => {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        };
        const url = host + "api/notes/addnote";
        const response = await fetch(url, requestOptions);
        json = await response.json();
        setNotes(notes.concat(json));
    };

    const editNote = async (id, title, description, tag) => {

        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        };
        const url = host + "api/notes/updatenote/"+id;
        const response = await fetch(url, requestOptions);
        json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));
        for (let i = 0; i < newNotes.length; i++) {
            const element = newNotes[i];
            if (element._id === id) {
                newNotes[i].title = title;
                newNotes[i].description = description;
                newNotes[i].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    };

    const deleteNote = async (id) => {

        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        };
        const url = host + "api/notes/deletenote/" + id;
        const response = await fetch(url, requestOptions);
        json = await response.json();

        const newNotes = notes.filter((note) => {
            return note._id !== id;
        });
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, fetchAllNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
