"use client"
// pages/UserPages.jsx
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import UserPage from "../components/User/userPage";
import SearchBar from "../components/SearchBar";
import toast from "react-hot-toast";



export default function UserPages() {
    const router = useRouter(null)
    const [commerces, setCommerces] = useState([]);
    const [filteredCommerces, setFilteredCommerces] = useState([]);
    const [searchText, setSearchText] = useState('');
    

    useEffect(() => {
        const fetchCommerces = async () => {
            try {
                const response = await fetch("http://localhost:9000/api/commerce/getCommerces", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you are passing the token
                    }
                });
                if (!response.ok) {
                    throw new Error('Error en al buscar comercios');
                }
                const data = await response.json();
                console.log(data)
                if (data.length === 0) {
                    toast.error('Comercios no encontrados');
                } else {
                    setCommerces(data);
                    setFilteredCommerces(data);
                }
            } catch (error) {
                toast.error("Error fetching commerces: " + error.message);
            }
        };

        fetchCommerces();
    }, []);

    const handleSearch = (text) => {
        setSearchText(text);

    };

    const filtrada = commerces.filter((filtered) =>
        filtered.commerceName.toLowerCase().startsWith(searchText.toLowerCase()) ||
        filtered.phone.toLowerCase().startsWith(searchText.toLowerCase()) ||
        filtered.address.toLowerCase().startsWith(searchText.toLowerCase())

    );

    const handleClick = (id) => {
    
        console.log("id", id)
        router.push(`/user/${id}`)
        
    }
    
    return (
        <div className="flex">
            {console.log("Comercios: ", commerces)}
            <div className="w-3/4 p-3 ">
                <UserPage commerce={filtrada} click ={handleClick} />
            </div>


            <div className=" mt-10 w-1/4  h-screen p-3 bg-gradient-to-r from-slate-500 to-blue-500">
                <h2 className="text-xl font-semibold text-white mb-4">Buscar Comercio</h2>
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>


    );
}
