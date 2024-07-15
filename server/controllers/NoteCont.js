// controllers/notesController.js
const Note = require('../models/noteModel');

// Create a new note
const createNote = async (req, res) => {
    const { title, description } = req.body;

    try {
        const newNote = new Note({
            title,
            description
        });

        const savedNote = await newNote.save();
        res.status(201).json({ savedNote });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get all notes
const getNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        if (notes.length === 0) {
            return res.status(200).json({ message: 'No notes to show' });
        }
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single note by ID
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: "no Note found" });
    }
};

// Update a note by ID
const updateNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        note.title = req.body.title || note.title;
        note.description = req.body.description || note.description;

        const updatedNote = await note.save();
        res.status(201).json(updatedNote);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete a note by ID
const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        await Note.findByIdAndDelete(req.params.id);
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
module.exports = {
    createNote,
    getNotes,
    getNoteById,
    updateNote,
    deleteNote
};
