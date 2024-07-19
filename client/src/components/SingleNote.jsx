import React from 'react'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import "../../public/singleNote.css"
const SingleNote = () => {
    const nav = useNavigate()
    // useEffect
    const { _id } = useParams()
    const tokenRedux = useSelector((state) => state.auth.token);

    useEffect(() => {
        const token = localStorage.getItem("auth");
        // Redirect to login if no token is found in localStorage or Redux state
        if (!token && !tokenRedux) {
            nav("/login");
        }
    }, [tokenRedux, nav]);

    const allnotes = useSelector((state) => state.notes.allNotes)
    console.log(allnotes)
    const note = allnotes.find(note => note._id === _id)


    return (
        <div className="single-note-container">
            {note ? (
                <div className="note-content">
                    <h2 className="note-title">{note.title}</h2>
                    <p className="note-description">{note.description}</p>
                </div>
            ) : (
                <p>Note not found</p>
            )}
        </div>

    )
}

export default SingleNote
