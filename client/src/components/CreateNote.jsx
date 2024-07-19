import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../features/notes/noteSlice';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const notesStatus = useSelector((state) => state.notes.status);
    const error = useSelector((state) => state.notes.error);

    useEffect(() => {
        if (!token) {
            nav("/login");
        }
    }, [token, nav]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(createNote({ token, newNote: formData }));
        if (notesStatus === "succeeded") {
            nav("/dashboard");
        }
        setFormData({
            title: "",
            description: ""
        });
    };

    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 className="mb-4">Create a New Note</h2>
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
                <button type="submit" className="btn btn-primary">Add Note</button>
                {notesStatus === 'loading' && <p>Adding note...</p>}
                {notesStatus === 'failed' && <p style={styles.errorText}>Error: {error}</p>}
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
        backgroundColor: '#3b4854', // Same background color as Login page
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    errorText: {
        color: 'red',
        marginTop: '10px',
    },
};

export default CreateNote;
