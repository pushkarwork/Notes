import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import "../../public/singleNote.css";
import { getNotes, deleteNote } from '../features/notes/noteSlice'; // Ensure deleteNote is imported

const SingleNote = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const { _id } = useParams();
    const tokenRedux = useSelector((state) => state.auth.token);

    useEffect(() => {
        const token = localStorage.getItem("auth");
        // Redirect to login if no token is found in localStorage or Redux state
        if (!token && !tokenRedux) {
            nav("/login");
        } else {
            dispatch(getNotes(token || tokenRedux)); // Fetch notes if token is present
        }
    }, [tokenRedux, nav, dispatch]);

    const allNotes = useSelector((state) => state.notes.allNotes);
    const notesStatus = useSelector((state) => state.notes.status);
    const note = allNotes.find(note => note._id === _id);

    const handleEdit = () => {
        nav(`/note/edit/${_id}`);
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            dispatch(deleteNote(_id));
            nav("/dashboard"); // Redirect after deletion
        }
    };

    return (
        <div className="single-note-container">
            {notesStatus === 'loading' && <p>Loading...</p>}
            {note ? (
                <div>
                    <div className="note-content">
                        <h2 className="note-title">{note.title}</h2>
                        <p className="note-description">{note.description}</p>
                    </div>
                    <div className='button-group'>
                        <button onClick={handleEdit} className="btn btn-info me-2">Edit</button>
                        <button onClick={handleDelete} className="btn btn-danger">Delete</button>
                    </div>
                </div>
            ) : (
                <p>Note not found</p>
            )}
            {notesStatus === 'failed' && <p>Error fetching note</p>}
        </div>
    );
};

export default SingleNote;
