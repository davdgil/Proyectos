"use client"
// MerchantPage.js
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import Merch from '../components/Merchant/merchantCommerce';

export default function MerchantPage() {

  const [userData, setUserData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');

    const decodedToken = jwtDecode(token);
    const userEmail = decodedToken.email;

    setUserData(userEmail);
  }, [userData]); // El array vacío asegura que este efecto se ejecute solo una vez, después del montaje inicial

  console.log("desde michigan", userData);

  const handleCommercesClick = (commerce) => {

    router.push(`/merchant/${commerce._id}`)

  };

  return (
    <Merch user={userData} onClick={handleCommercesClick}></Merch>
  );

}
