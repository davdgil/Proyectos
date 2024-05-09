"use client"
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

const deleteUser = async (userID) => {
    const confirmDelete = window.confirm("¿Estás seguro de querer eliminar este usuario?");
    if (!confirmDelete) {
        toast("Operación cancelada", { icon: 'info' });
        return;
    }

    try {
        const response = await fetch(`http://localhost:9000/api/user/deleteUserById/${userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Asegúrate de estar enviando el token
            },
        });

        if (!response.ok) {
            throw new Error('No se pudo eliminar el usuario. Código de estado: ' + response.status);
        }

        const result = await response.json();
        toast.success("Usuario eliminado correctamente");
    } catch (error) {
        toast.error("Error al eliminar el usuario: " + error.message);
    } finally {
        setTimeout(() => {
            window.location.reload(); 
        }, 2000);
    }
}


export default function UserList({ userFilter }) {

    return (
        <div className="max-w-4xl mx-auto my-8">
            <h2 className="text-3xl text-gray-300 font-bold mb-4">Lista de Usuarios</h2>
            {userFilter && userFilter.length > 0 ? (
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userFilter.map((user, index) => (
                        <li key={index} className="bg-white rounded-md overflow-hidden shadow-md">
                            <img
                                src={`https://picsum.photos/300/200?unique=${user._id}`}
                                className="w-full h-40 object-cover object-center"
                            />
                            <div className="p-4  h-full ">
                                <h4 className="text-sky-950 text-lg font-bold mb-2">{user.email}</h4>
                                <p className="text-gray-900 font-bold">ID: <span className=" text-gray-500  ">{user._id}</span></p>
                                <p className="text-gray-900 font-bold">Email: <span className=" text-gray-500  ">{user.email || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">Fecha:<span className=" text-gray-500  "> {user.date || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">Usuario: <span className=" text-gray-500  ">{user.role || 'No disponible'}</span></p>
                                <p className="text-gray-900 font-bold">Ciudad: <span className=" text-gray-500  ">{user.city || 'No disponible'}</span></p>
                                <div className="mt-4 flex justify-end ">
                                    <button
                                        className="text-blue-500 hover:text-blue-700 font-medium focus:outline-none relative"
                                        onClick={() => deleteUser(user._id)}
                                    >
                                        Eliminar usuario
                                    </button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No hay usuarios disponibles</p>
            )}
        </div>
    );
}