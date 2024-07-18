import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

const SingleNote = () => {
    const { _id } = useParams()

    // alert(_id)

    const allnotes = useSelector((state) => state.notes.allNotes)
    console.log(allnotes)
    const note = allnotes.find(note => note._id === _id)

    return (
        <div>
            {note ? (
                <div>
                    <h2>{note.title}</h2>
                    <p>{note.description}</p>
                </div>
            ) : (
                <p>Note not found</p>
            )}
        </div>
    )
}

export default SingleNote
