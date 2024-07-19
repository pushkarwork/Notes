import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getNotes, deleteNote } from '../features/notes/noteSlice';

const Dashboard = () => {
    const nav = useNavigate();
    const dispatch = useDispatch();
    const tokenRedux = useSelector((state) => state.auth.token);
    const allNotes = useSelector((state) => state.notes.allNotes);
    const notesStatus = useSelector((state) => state.notes.status);
    const error = useSelector((state) => state.notes.error);

    useEffect(() => {
        const token = localStorage.getItem("auth");
        // Redirect to login if no token is found in localStorage or Redux state
        if (!token && !tokenRedux) {
            nav("/login");
        } else {
            dispatch(getNotes(token || tokenRedux)); // Use the token from localStorage or Redux
        }
    }, [tokenRedux, nav, dispatch]);

    const handleDeleteNote = (noteId) => {
        dispatch(deleteNote(noteId));
    };

    return (
        <div>
            <h1>This is the dashboard.</h1>
            <br></br>

            {notesStatus === 'loading' && <p>Loading notes...</p>}
            {notesStatus === 'succeeded' && (
                <div>
                    {allNotes.length > 0 ? (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', justifyContent: 'space-around' }}>
                            {allNotes.map(note => (
                                <div key={note._id} className="card" style={{ width: '19rem' }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{note.title}</h5>
                                        <p className="card-text">{note.description}</p>
                                        <Link to={`/note/${note._id}`} className="btn btn-primary">Go somewhere</Link>
                                        <Link to={`/note/edit/${note._id}`} className='btn btn-info ms-2'>Edit</Link>
                                        <button onClick={() => handleDeleteNote(note._id)} className='btn btn-danger ms-2'>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No notes found.</p>
                    )}
                </div>
            )}
            {notesStatus === 'failed' && <p>Error: {error}</p>}
        </div>
    );
};

export default Dashboard;
