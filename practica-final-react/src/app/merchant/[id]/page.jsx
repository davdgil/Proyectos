"use client"
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import WebPageEditor from "@/app/components/Merchant/webPageEditor";
import WebPageViewer from "@/app/components/Merchant/webPageViewer";
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';

export default function WebPage() {
  const [webPage, setWebPage] = useState({});
  const [page, setPage] = useState({});
  const [editing, setEditing] = useState(false);
  const [existPage, setExistPage] = useState(false);
  const [commerceId, setCommerceId] = useState(null);
  const [commerce, setCommerce] = useState([]);
  const [id, setId] = useState([]);

  useEffect(() => {
    const fetchCommerceData = async () => {
      if (!commerceId) return;
      const token = localStorage.getItem('token');
      const decodedToken = jwtDecode(token);
      const userEmail = decodedToken.email;

      try {
        const response = await fetch(`http://localhost:9000/api/commerce/getCommerceByEmail/${userEmail}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setWebPage(data.commerces);
        console.log("Comercios encontrados para el usuario:", data);
      } catch (error) {
        console.error("Error al obtener información del comercio:", error);
        toast.error("Error al realizar la búsqueda de la página web");
      }
    };
    fetchCommerceData();
  }, [commerceId]);
  
  useEffect(() => {
    console.log("webPage actualizado:", webPage);
  }, [webPage]);
  

  useEffect(() => {
    if (typeof window !== "undefined") {
      const url = window.location.pathname;
      const id = url.substring(url.lastIndexOf('/') + 1);
      setCommerceId(id);
    }
  }, []);

  useEffect(() => {
    if (!commerceId) return; // Si no hay commerceId, no se ejecuta la búsqueda
   
    const getWebPages = async () => {
      try {
        const token = localStorage.getItem('token');
        const decodedToken = jwtDecode(token);
        const userID = decodedToken._id
  
        console.log('id:',userID)
        
        const response = await fetch(`http://localhost:9000/api/webPage/getWebPage/${userID}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        if (data.page) {
          setExistPage(true);
          setPage(data.page);
        } else {
          setExistPage(false);
          setPage([]);
        }
      } catch (error) {
        console.error("Error al obtener datos de la webPage:", error);
        toast.error("Error al realizar la busqueda de la página web");
      }
    };

    getWebPages();
  }, [commerceId]);

  const handleEditClick = () => {
    setEditing(true);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleSave = async (data) => {
    console.log('dataaaaaaaaaaaaaaaaaaaaaaaaaaaaa',data)
    setEditing(false); 
    setExistPage(true);

    try {
      const response = await fetch("http://localhost:9000/api/webPage/upload-images", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        toast.error("Error al crear la página web");
        console.error("Error en la función POST. Código de estado:", response.status);
        return;
      }

      console.log("Página web añadida con éxito");
      toast.success("Página web añadida con éxito");
    } catch (error) {
      console.error("Error en la función POST:", error);
      toast.error("Error en el servidor");
    }finally{
      window.location.reload()
    }
  };

  const handleDeleteClick = async () => {
    try {
      console.log(id)
      const token = localStorage.getItem('token'); // Asumiendo que el token se guarda en localStorage
      const decodedToken = jwtDecode(token);
        const userID = decodedToken._id
      const response = await fetch(`http://localhost:9000/api/webPage/delete/${userID}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`  // Incluye el token en el header Authorization
        }
      });

      if (response.ok) {
        console.log("Página web eliminada con éxito");
        setExistPage(false);
        // Opcionalmente puedes redirigir al usuario o recargar componentes/data aquí
      } else {
        console.error("Error al eliminar la página web:", response.statusText);
        alert("No se pudo eliminar la página web."); // Informar al usuario si hay un error
      }
    } catch (error) {
      console.error("Error al enviar la solicitud al servidor:", error);
      alert("Error al conectar con el servidor."); // Informar al usuario de problemas de conexión
    }
};

  return (
    <div>
      {editing ? (
        <WebPageEditor onSave={handleSave} onCancel={handleCancel} initialData={webPage} />
      ) : (
        <div>
          {existPage ? (
            <>
              <WebPageViewer webPageData={page} />
              <div className="flex gap-4 mt-4">
                <button
                  className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  onClick={handleEditClick}
                >
                  Editar
                </button>
                <button
                  className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                  onClick={handleDeleteClick}
                >
                  Borrar
                </button>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-40">
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleEditClick}
            >
              Crear Nueva Página Web
            </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}


