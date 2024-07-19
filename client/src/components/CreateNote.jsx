import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createNote } from '../features/notes/noteSlice';
import { useNavigate } from 'react-router-dom';

const CreateNote = () => {
    const nav = useNavigate()
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
            nav("/login")
        }
    }, [token])

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
            nav("/dashboard")
        }
        setFormData({
            title: "",
            description: ""
        })
    };

    return (
        <div>
            <h1>Create a New Note</h1>
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
                <button type="submit">Add Note</button>
            </form>
            {notesStatus === 'loading' && <p>Adding note...</p>}
            {notesStatus === 'failed' && <p>Error: {error}</p>}
        </div>
    );
};

export default CreateNote;
