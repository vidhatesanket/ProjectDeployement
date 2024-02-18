import React, { useState } from 'react';
import axios from 'axios';

export default function ServiceProviderRegister() {
    const [formData, setFormData] = useState({
        namefirst: '',
        namelast: '',
        username: '',
        password: '',
        phonenumber: '',
        skills: '',
        wages: '',
        address: ''
    });
    
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
            const response = await axios.post('http://localhost:7373/serviceprovider/register', formData);
            console.log(response.data); // Handle response from server
            // Reset form after successful submission
            setFormData({
                namefirst: '',
                namelast: '',
                username: '',
                password: '',
                phonenumber: '',
                skills: '',
                wages: '',
                address: ''
            });
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div style={styles.registerContainer}>
            <form onSubmit={handleSubmit} style={styles.registerForm}>
                <label>
                    First Name:
                    <input type="text" name="namefirst" value={formData.namefirst} onChange={handleChange} style={styles.input} required/>
                </label>
                <label>
                    Last Name:
                    <input type="text" name="namelast" value={formData.namelast} onChange={handleChange} style={styles.input} required />
                </label>
                <label>
                    Username:
                    <input type="text" name="username" value={formData.username} onChange={handleChange} style={styles.input} required/>
                </label>
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} style={styles.input} required/>
                </label>
                <label>
                    Phone Number:
                    <input type="text" name="phonenumber" value={formData.phonenumber} onChange={handleChange} style={styles.input} required/>
                </label>
                <label>
                    Skills:
                    <input type="text" name="skills" value={formData.skills} onChange={handleChange} style={styles.input} required/>
                </label>
                <label>
                    Wages:
                    <input type="text" name="wages" value={formData.wages} onChange={handleChange} style={styles.input} required/>
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleChange} style={styles.input} required/>
                </label>
                <button type="submit" style={styles.button}>Register</button>
            </form>
        </div>
    );
}

const styles = {
    registerContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    registerForm: {
        maxWidth: '400px',
        padding: '20px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    },
    input: {
        width: 'calc(100% - 20px)',
        padding: '10px',
        marginBottom: '10px',
        border: '1px solid #ccc',
        borderRadius: '5px',
    },
    button: {
        width: '100%',
        padding: '10px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};
