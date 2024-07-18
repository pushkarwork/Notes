// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
// import authReducer from '../slices/authSlice';
import authReducer from "./src/features/user/authSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

export default store;
