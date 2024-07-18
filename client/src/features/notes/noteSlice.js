import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

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
    // console.log(data)
    return data;
})

const noteSlice = createSlice({
    name: "notes",
    initialState: {
        allNotes: [],
        status: "idle",
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getNotes.pending, (state) => {
                state.status = "loading"
            })
            .addCase(getNotes.fulfilled, (state, action) => {
                state.status = "succeeded";
                state.allNotes = action.payload;
            })
            .addCase(getNotes.rejected, (state, action) => {
                state.status = "failed",
                    state.error = action.error.message
            })
    }
})


// export const { } = noteSlice.reducer
export default noteSlice.reducer