
"use client";

import { useEffect, useState } from 'react';
import Commerces from "@/app/components/Commerce/commerce"
import SearchBar from '@/app/components/SearchBar';
import toast from 'react-hot-toast';

const getCommerces = async () => {
    try {
        const response = await fetch("http://localhost:9000/api/commerce/getCommerces", {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}` // Ensure you are passing the token
            }
        });
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        toast.error("Failed to fetch commerces: " + error.message);
        return []; 
    }
};

export default function CommercePage() {
    const [commerces, setCommerces] = useState([]);
    const [filterText, setFilterText] = useState("");

    useEffect(() => {
        const fetchCommercesData = async () => {
            const commerceData = await getCommerces();
            setCommerces(commerceData);
        };

        fetchCommercesData();
    }, []);


    const handleSearch = (text) => {
        setFilterText(text)
    }

    const filtrada = commerces.filter((filtered) =>
        filtered.email.toLowerCase().includes(filterText.toLowerCase()) ||
        filtered._id.toLowerCase().includes(filterText.toLowerCase()) ||
        filtered.commerceName.toLowerCase().includes(filterText.toLowerCase())

    );
    return (
        <div className="flex">
            {console.log(" filtrada : ", filtrada)}
            <div className="w-3/4 p-3 ">
                <Commerces commerces={filtrada} />
            </div>
            <div className=" mt-10 w-1/4  h-screen p-3 bg-gradient-to-r from-slate-500 to-blue-500">
                <h2 className="text-xl font-semibold text-white mb-4">Buscar Usuario</h2>
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>

    )
}