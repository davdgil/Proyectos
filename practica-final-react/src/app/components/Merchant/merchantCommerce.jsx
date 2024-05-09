"use client";

import { useState, useEffect } from "react";
import { jwtDecode } from 'jwt-decode';

function Merch({ onClick }) {
    const [commerces, setCommerces] = useState([]);

    useEffect(() => {
        const fetchCommerces = async (email, token) => {
            try {
                console.log("Usuario logueado: ", email);
                const response = await fetch(`http://localhost:9000/api/commerce/getCommerceByEmail/${email}`, {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });               
               if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();
                setCommerces(data.commerces);  // Asegúrate de que el servidor responda con un objeto que tenga una clave 'commerces'
                console.log("Comercios encontrados para el usuario:", data.commerces);
            } catch (error) {
                console.error("Error al obtener información del comercio:", error);
            }
        };

        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            fetchCommerces(decodedToken.email, token); 
        }
    }, []); 

    return (
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl mb-10">
            <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400 ">
              Comercios
            </span>
          </h1>
          {commerces.map((commerce) => (
            <div
              key={commerce._id}  // Cambiado de id a _id para consistencia con MongoDB
              className="w-1/2 p-8 bg-slate-300 rounded-lg mb-4 cursor-pointer hover:bg-slate-400"
              onClick={() => onClick(commerce)}
            >
              <p className="text-2xl text-slate-950 mb-2">{commerce.commerceName}</p>
              <hr className="my-6 border-1 border-gray-500" />
              <p className="font-bold text-slate-950">ID: {commerce._id}</p>
              <p className="font-bold text-slate-950">Email: {commerce.email}</p>
            </div>
          ))}
        </div>
    );
}

export default Merch;
