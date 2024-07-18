import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const nav = useNavigate();
    const tokenRedux = useSelector((state) => state.auth.token);

    useEffect(() => {
        const token = localStorage.getItem("auth");

        // Redirect to login if no token is found in localStorage or Redux state
        if (!token && !tokenRedux) {
            nav("/login");
        }
    }, [tokenRedux, nav]);

    const handleLogout = () => {
        localStorage.removeItem("auth"); // Clear token from localStorage
        nav("/login"); // Redirect to login
    };

    return (
        <div>
            <h1>This is the dashboard.</h1>
            <button onClick={handleLogout} className="btn btn-danger">Logout</button>
        </div>
    );
};

export default Dashboard;
