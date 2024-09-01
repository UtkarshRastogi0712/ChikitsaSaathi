import React, { useEffect, useState } from 'react';
import axios from 'axios';

const addPatient = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    age: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    } catch (error) {
      console.error("Failed to fetch users", error);
      setError('Failed to fetch users');
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`/api/users/${currentUserId}`, formData);
        setIsEditing(false);
        setCurrentUserId(null);
      } else {
        await axios.post('/api/users', formData);
      }
      setFormData({ name: '', email: '', age: '' });
      fetchUsers();
    } catch (error) {
      console.error("Failed to submit user data", error);
      setError('Failed to submit user data');
    }
  };

  const handleEdit = (user) => {
    setFormData(user);
    setIsEditing(true);
    setCurrentUserId(user._id);
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`/api/users/${userId}`);
      fetchUsers();
    } catch (error) {
      console.error("Failed to delete user", error);
      setError('Failed to delete user');
    }
  };

  return (
    <div className="patient-dashboard">
      <h1>Patient Dashboard</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleInputChange}
          required
        />
        <button type="submit">{isEditing ? 'Update' : 'Create'} User</button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.name} - {user.email} - {user.age} years old
            <button onClick={() => handleEdit(user)}>Edit</button>
            <button onClick={() => handleDelete(user._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default addPatient;
