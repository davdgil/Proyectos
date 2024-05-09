"use client"
// pages/UserPages.jsx
import WebPageViewer from "@/app/components/Merchant/webPageViewer";
import { useParams } from "next/navigation";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";


export default function Page() {
    const params = useParams();
    const [webPage, setWebPage] = useState([]);
    const router = useRouter(null)

    useEffect(() => {
        const fetchWebPage = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/webPage`);
                const data = await res.json();
                console.log("pagins web:", data);

                const page = data.webPage.find((u) => u.id === params.id);
                if (page) {
                    console.log("pagina", page);
                    setWebPage(page);
                }else{
                    
                    toast.error("No hay pagina web asociada al comercio")

                    router.push('/user')
                }

            } catch (error) {
                console.error("Error al obtener la página web:", error);
            }
        };

        fetchWebPage(); 

    }, [params]); 

    return (
        <div>
            <WebPageViewer webPageData={webPage} />
        </div>
    );
}
