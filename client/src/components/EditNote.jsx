import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchNote, updateNote } from '../features/notes/noteSlice';

const EditNote = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const token = useSelector((state) => state.auth.token);
    const note = useSelector((state) => state.notes.currentNote);
    const notesStatus = useSelector((state) => state.notes.status);
    const error = useSelector((state) => state.notes.error);

    useEffect(() => {
        if (!token) {
            navigate('/login');
        } else {
            dispatch(fetchNote(_id));
        }
    }, [_id, dispatch, token, navigate]);

    useEffect(() => {
        if (note) {
            setFormData({
                title: note.title,
                description: note.description
            });
        }
    }, [note]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateNote({
            id: _id,
            updatedNote: formData
        }));
        navigate('/dashboard'); // Redirect to dashboard or any other page after updating
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 className="mb-4">Edit Note</h2>
                {notesStatus === 'loading' && <p>Loading...</p>}
                {notesStatus === 'failed' && <p style={styles.errorText}>Error: {error}</p>}
                {notesStatus === 'succeeded' && (
                    <>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="description" className="form-label">Description</label>
                            <textarea
                                className="form-control"
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Update Note</button>
                    </>
                )}
            </form>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: '#3b4854', // Same background color as Login and CreateNote pages
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    errorText: {
        color: 'red',
        marginTop: '10px',
    },
};

export default EditNote;
