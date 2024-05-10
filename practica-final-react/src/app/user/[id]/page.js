"use client"
// pages/UserPages.jsx
import WebPageViewer from "@/app/components/Merchant/webPageViewer";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function Page() {
    const params = useParams();
    const [webPage, setWebPage] = useState([]);
    const [idCommerce, setIdCommerce] = useState('');


    useEffect(() => {
        const fetchMerchant = async () => {
            try {
                const res = await fetch(`http://localhost:9000/api/commerce/getMerchant/${idCommerce}`, {
                    headers: {
                        "Authorization": `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!res.ok) {
                    throw new Error('Failed to fetch merchant');
                }
        
                const data = await res.json();
                if (data) {
                    console.log("Merchant ID:", data.merchantId);
                    fetchWebPage(data.merchantId)
                } else {
                    console.error("No merchant associated with this commerce");
                    toast.error("No hay comerciante asociado a este comercio");
                }
        
            } catch (error) {
                console.error("Error al obtener el comerciante asociado:", error);
                toast.error("Error al realizar la búsqueda del comerciante");
            }
        };

        if (idCommerce && localStorage.getItem('token')) {
            fetchMerchant();
        }
    }, [idCommerce]);

    useEffect(() => {
        const path = window.location.pathname;
        setIdCommerce(path.substring(path.lastIndexOf('/') + 1));
    }, [params]);

 
    const fetchWebPage = async (id) => {

        try {
            const res = await fetch(`http://localhost:9000/api/webPage/getWebPage/${id}`, {
                headers: {
                    "Authorization": `Bearer ${localStorage.getItem('token')}`
                }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch merchant');
            }
    
            const data = await res.json();
            if (data) {
                console.log("Merchant ID:", data);
                setWebPage(data.page)
            } else {
                console.error("No hay pagina web asociada a este comercio");
                toast.error("No hay pagina web asociada a este comercio");
            }
    
        } catch (error) {
            console.error("Error al obtener el comerciante asociado:", error);
            toast.error("Error al realizar la búsqueda del comerciante");
        }
    }

    return (
        <div>
            <WebPageViewer webPageData={webPage} />
        </div>
    );
}
