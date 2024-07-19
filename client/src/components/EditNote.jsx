import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchNote, updateNote } from '../features/notes/noteSlice'; // Assuming these thunks are defined in noteSlice




const EditNote = () => {
    const { _id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });
    const token = useSelector((state) => state.auth.token)
    const note = useSelector((state) => state.notes.currentNote);
    const notesStatus = useSelector((state) => state.notes.status);
    const error = useSelector((state) => state.notes.error);

    useEffect(() => {
        if (!token) {
            navigate('/login')
        }

        dispatch(fetchNote(_id));
    }, [_id, dispatch]);

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
        navigate('/dashboard'); // Redirect to home or any other page after updating
    };

    return (
        <div>
            <h1>Edit Note</h1>
            {notesStatus === 'loading' && <p>Loading...</p>}
            {notesStatus === 'failed' && <p>Error: {error}</p>}
            {notesStatus === 'succeeded' && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit">Update Note</button>
                </form>
            )}
        </div>
    );
};

export default EditNote;
