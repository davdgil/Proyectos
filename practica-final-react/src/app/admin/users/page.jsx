"use client"
import UserList from "@/app/components/Admin/userList";
import SearchBar from "@/app/components/SearchBar";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

const getUsers = async () => {
    try {
        const response = await fetch("http://localhost:9000/api/user/getAllUsers", {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        });
        if (!response.ok) {
            throw new Error('Error del servidor');
        }
        const data = await response.json();
        return data; 
    } catch (error) {
        toast.error("Error en el fetch " + error.message);
        return []; 
    }
};


export default function UserListShow() {

    const [users, setUsers] = useState([])
    const [filterText, setFilterText] = useState("")

    useEffect(() => {
        const fetchUsersData = async () => {
            const userData = await getUsers();
            setUsers(userData);
            console.log(userData)
        };

        fetchUsersData();
    }, []);


    const handleSearch = (text) => {
        setFilterText(text)
    }

    const filtrada = users.filter((filtered) =>
        filtered.email.toLowerCase().includes(filterText.toLowerCase()) || 
        filtered.id.toLowerCase().includes(filterText.toLowerCase()) ||
        filtered.userType.toLowerCase().includes(filterText.toLowerCase())

    );

    return (
        <div className="flex">
            {console.log(" filtrada : ", filtrada)}
            <div className="w-3/4 p-3 ">
                <UserList userFilter={filtrada} />
            </div>
            <div className=" mt-10 w-1/4  h-screen p-3 bg-gradient-to-r from-slate-500 to-blue-500">
                <h2 className="text-xl font-semibold text-white mb-4">Buscar Usuario</h2>
                <SearchBar onSearch={handleSearch} />
            </div>
        </div>
    )

}