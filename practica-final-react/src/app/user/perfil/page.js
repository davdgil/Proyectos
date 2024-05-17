"use client";
import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const UpdateUserForm = () => {
  const [user, setUser] = useState({
    email: '',
    role: 'usuario',
    city: '',
    interests: '',
    offers: false,
    isActive: true,
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;

    fetch(`http://localhost:9000/api/user/getUserById/${userId}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching user data');
      }
      return response.json();
    })
    .then(data => {
      setUser(data);
    })
    .catch(error => {
      console.error('Error fetching user data:', error);
    });
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUser({
      ...user,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    fetch(`http://localhost:9000/api/user/updateUserById/${user._id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error updating user');
      }
      return response.json();
    })
    .then(data => {
      console.log('User updated:', data);
    })
    .catch(error => {
      console.error('Error updating user:', error);
    });
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6">Actualizar Información del Usuario</h2>
        <div className="mb-4">
          <label htmlFor="email" className="block text-white mb-1">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="city" className="block text-white mb-1">Ciudad</label>
          <input
            type="text"
            id="city"
            name="city"
            value={user.city}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="interests" className="block text-white mb-1">Intereses</label>
          <input
            type="text"
            id="interests"
            name="interests"
            value={user.interests}
            onChange={handleChange}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="offers" className="block text-white mb-1">Ofertas</label>
          <input
            type="checkbox"
            id="offers"
            name="offers"
            checked={user.offers}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-white">Recibir ofertas</span>
        </div>
        <div className="mb-4">
          <label htmlFor="isActive" className="block text-white mb-1">Activo</label>
          <input
            type="checkbox"
            id="isActive"
            name="isActive"
            checked={user.isActive}
            onChange={handleChange}
            className="mr-2"
          />
          <span className="text-white">Cuenta activa</span>
        </div>
        <button
          type="submit"
          className="w-full p-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
        >
          Actualizar
        </button>
      </form>
    </div>
  );
};

export default UpdateUserForm;
