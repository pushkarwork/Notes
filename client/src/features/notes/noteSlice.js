import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunk to fetch notes for a user
export const getNotes = createAsyncThunk("notes/all", async (token) => {
    const response = await fetch('http://localhost:5000/notes/user', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the token to the Authorization header
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
})

// Async thunk to create a new note
export const createNote = createAsyncThunk("notes/create", async ({ token, newNote }) => {
    const response = await fetch('http://localhost:5000/notes/newNote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Add the token to the Authorization header
        },
        body: JSON.stringify(newNote)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
})

// Thunk to fetch a single note by ID
export const fetchNote = createAsyncThunk("notes/fetchNote", async (id) => {
    const response = await fetch(`http://localhost:5000/notes/Note/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
});


// Thunk to update a note
export const updateNote = createAsyncThunk("notes/updateNote", async ({ id, updatedNote }) => {
    const response = await fetch(`http://localhost:5000/notes/Note/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedNote)
    });

    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data;
});

// New deleteNote thunk
export const deleteNote = createAsyncThunk('notes/deleteNote', async (noteId, { rejectWithValue }) => {
    try {
        const response = await fetch(`http://localhost:5000/notes/Note/${noteId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return noteId;
    } catch (err) {
        return rejectWithValue(err.message);
    }
});

const noteSlice = createSlice({
    name: "notes",
    initialState: {
        allNotes: [],
        status: "idle",
        error: null,
        currentNote: {}
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handling getNotes states
            .addCase(getNotes.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allNotes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // Handling createNote states
            .addCase(createNote.pending, (state) => {
                state.status = "loading"
            })
            .addCase(createNote.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allNotes.push(action.payload); // Add the new note to the state
            })
            .addCase(createNote.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(fetchNote.pending, (state) => {
                state.status = "loading";
            })
            .addCase(fetchNote.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.currentNote = action.payload;
            })
            .addCase(fetchNote.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            // Update a note
            .addCase(updateNote.pending, (state) => {
                state.status = "loading";
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.status = "succeeded";
                const updatedNote = action.payload;
                const existingNoteIndex = state.allNotes.findIndex(note => note._id === updatedNote._id);
                if (existingNoteIndex >= 0) {
                    state.allNotes[existingNoteIndex] = updatedNote;
                }
                // Update currentNote if it's the same note
                if (state.currentNote && state.currentNote._id === updatedNote._id) {
                    state.currentNote = updatedNote;
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            })
            .addCase(deleteNote.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.allNotes = state.allNotes.filter(note => note._id !== action.payload);
            })
            .addCase(deleteNote.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload;
            });
    }
})

export default noteSlice.reducer
