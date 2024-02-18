import React, { useState } from 'react';
import axios from 'axios';

export default function ServiceProviderLogin() {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:7373/serviceprovider/login', formData);
            setMessage(response.data); // Set the message received from the server
        } catch (error) {
            console.error('Error:', error);
            setMessage('An error occurred. Please try again later.'); // Set a generic error message
        }
    };

    return (
        <div style={{ width: '300px', margin: 'auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
        <h2>Login</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
            <label style={{ marginBottom: '10px' }}>
                Username:
                <input type="text" name="username" value={formData.username} onChange={handleChange} style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />
            </label>
            <label style={{ marginBottom: '10px' }}>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleChange} style={{ marginBottom: '10px', padding: '5px', border: '1px solid #ccc', borderRadius: '5px' }} />
            </label>
            <button type="submit" style={{ padding: '10px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>Login</button>
        </form>
        {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>} {/* Render the message if it exists */}
    </div>
    );
}
