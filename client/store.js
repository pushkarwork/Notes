// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../slices/authSlice';
import authReducer from "./src/features/user/authSlice"
import NotesReducer from './src/features/notes/noteSlice'
// import noteSlice from './src/features/notes/noteSlice';
const store = configureStore({
    reducer: {
        auth: authReducer,
        notes: NotesReducer
    },
});

export default store;
