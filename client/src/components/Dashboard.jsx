import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getNotes } from '../features/notes/noteSlice';

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

    const handleLogout = () => {
        localStorage.removeItem("auth"); // Clear token from localStorage
        nav("/login"); // Redirect to login
    };

    return (
        <div>
            <h1>This is the dashboard.</h1>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
            {notesStatus === 'loading' && <p>Loading notes...</p>}
            {notesStatus === 'succeeded' && (
                <div>
                    {allNotes.length > 0 ? (
                        <ul>
                            {allNotes.map(note => (
                                <div>
                                    <p>{note.title}</p>
                                    <p>{note.description}</p>
                                </div>
                            ))}
                        </ul>
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
