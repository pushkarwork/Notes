import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../slices/authSlice'; // Update the path as needed
import { login } from '../features/user/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const dispatch = useDispatch();
    const status = useSelector((state) => state.auth.status)
    const error = useSelector((state) => state.auth.error)
    const nav = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };



    const handleSubmit = async (e) => {
        e.preventDefault();
        dispatch(login(formData));
        console.log("try ligin")


        setFormData({
            email: '',
            password: ''
        });
    };

    useEffect(() => {
        if (status === 'succeeded') {
            console.log("login success");
            nav('/dashboard'); // Navigate on success
        } else if (status === 'failed') {
            console.error("Login failed:", error);
            window.alert(error);
        }
    }, [status, error, nav]);


    return (
        <div style={styles.container}>
            <form onSubmit={handleSubmit} style={styles.form}>
                <h2 className="mb-4">Login</h2>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </form>
        </div>
    );
};


const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    form: {
        width: '100%',
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: '#3b4854',
        borderRadius: '8px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
};

export default Login;
