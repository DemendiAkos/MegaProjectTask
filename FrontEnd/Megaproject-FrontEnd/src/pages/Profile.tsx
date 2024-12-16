import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile: React.FC = () => {
  const [username, setUsername] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsername(response.data.username);
      } catch (err: any) {
        setError('Failed to fetch profile');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:3000/profile',
      );
      setSuccess('Profile updated successfully');
    } catch (err: any) {
      setError('Failed to update profile');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-96 p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center">Profile</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}
        <p className="mb-2  text-2xl font-bold text-center">Username: {username}</p>
       
       
      </div>
    </div>
  );
};

export default Profile;
