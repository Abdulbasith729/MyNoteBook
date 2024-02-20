import React, { useContext } from 'react';
import { NoteContext } from '../context/notes/NoteState';
import NoteItem from './NoteItem';
import AddNote from './AddNote'; // Correct import for AddNote

const Notes = () => {
    const { notes } = useContext(NoteContext);

    if (!Array.isArray(notes)) {
        console.error('Context value is not an array:', notes);
        return (
            <div>
                <AddNote />
                <div>Error: Notes data is not available.</div>
            </div>
        );
    }

    return (
        <div>
            <AddNote />
            <div className='row my-3'>
                <h2>Your Notes</h2>
                {notes.map(note => (
                    <NoteItem key={note._id} note={note} />
                ))}
            </div>
        </div>
    );
}

export default Notes;
