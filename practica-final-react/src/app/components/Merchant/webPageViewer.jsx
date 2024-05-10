// WebPageViewer.jsx
import React, { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { jwtDecode } from 'jwt-decode';

const WebPageViewer = ({ webPageData }) => {
  const { commerceName, title, description, city, photos, address, likes, dislikes, reviews, _id } = webPageData;
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  console.log('datos pagina web', webPageData)


  const obtainDataUser = () => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
    return decodedToken;
  }
  const handleLike = async () => {

    try {
      const requestBody = { likes: +1 };
      //const requestID = webPageData.id
      console.log('Request Body:', requestBody);

      const response = await fetch(`http://localhost:3000/api/webPage/${webPageData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Verificar si la respuesta es un JSON válido antes de intentar analizarla
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          console.log('Response:', result); // Agrega este log para verificar la respuesta del servidor
          setLiked(true);
          setDisliked(false);
          console.log('+1');
        } else {
          console.error('La respuesta no es un JSON válido:', response);
        }
      } else {
        console.error('Error al actualizar los likes');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    } finally {
      window.location.reload()
    }

  };

  const handleDislike = async () => {

    try {
      const requestBody = { dislikes: +1 };
      //const requestID = webPageData.id

      console.log('Request Body:', requestBody);

      const response = await fetch(`http://localhost:3000/api/dislike/${webPageData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        // Verificar si la respuesta es un JSON válido antes de intentar analizarla
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          const result = await response.json();
          console.log('Response:', result); // Agrega este log para verificar la respuesta del servidor
          setDisliked(true);
          setLiked(false);
          console.log('+1');
        } else {
          console.error('La respuesta no es un JSON válido:', response);
        }
      } else {
        console.error('Error al actualizar los dislikes');
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    } finally {
      window.location.reload()
    }

  };

  const handleReview = async () => {
    if (obtainDataUser().role !== 'usuario') {
      toast.error("Solo usuarios pueden comentar");
      return;
    }
    const prompText = window.prompt('Introduzca su reseña: ');

    try {
      const userId = obtainDataUser()._id;
      const requestBody = { userId, comment: prompText };

      const response = await fetch(`http://localhost:9000/api/webPage/review/${webPageData._id}`, {
        method: 'PUT',
        headers: {
          "Authorization": `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      if (response.ok) {
        toast.success('reseña enviada')
      } else {
        if (response.status === 400) {
          const errorData = await response.json();
          alert(errorData.message);
        } else {
          console.error('Error al actualizar las reseñas');
        }
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    } finally {
      window.location.reload();
    }
};


  return (
    <div className="bg-gray-900 text-white p-8 rounded-lg shadow-lg">
      <h1 className="text-4xl font-extrabold text-gray-300 mb-4">
        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
          {commerceName}
        </span>
      </h1>

      <div className="bg-gray-800 p-8 rounded-lg shadow-lg">
        <p className="text-gray-300 mb-4">
          Encuéntranos:{" "}
          <a
            href={`https://www.google.com/maps/place/${encodeURIComponent(address)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            {address}
          </a>
        </p>

        <h2 className="text-3xl font-semibold mb-4">{title}</h2>
        <p className="text-gray-300 mb-4">{description}</p>
        <p className="text-gray-300 mb-4">Ciudad: {city}</p>

        <hr className="border-t-2 border-gray-700 my-6" />

        {photos && photos.length > 0 && (
          <div className="flex flex-wrap justify-center mb-8">
            {photos.map((photo, index) => (
              <img
                key={index}
                src={photo.url} // Asegúrate de tener la URL o cadena base64 correcta
                alt={`Photo ${index + 1}`}
                className="w-32 h-32 object-cover rounded mb-4 mx-4"
              />
            ))}
          </div>
        )}

        <div className="mb-8">
          <div className="flex space-x-4 mb-4">
            <div>
              <span className="text-green-500">{likes}</span> Likes
            </div>
            <div>
              <span className="text-red-500">{dislikes}</span> Dislikes
            </div>
          </div>

          <div className="flex space-x-4">
            <div className="flex flex-col items-center mt-4">
              <button
                onClick={handleLike}
                className={`text-green-500 focus:outline-none ${liked ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                👍 Me gusta
              </button>

            </div>
            <div className="flex flex-col items-center mt-4">
              <button
                onClick={handleDislike}
                className={`text-red-500 focus:outline-none ${disliked ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                👎 No me gusta
              </button>

            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center ">

        <button
          onClick={handleReview}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex-col flex items-center w-2/3 mt-8 "
        >
          <span className="text-2xl">+</span>
        </button>
      </div>
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg mt-8">
        <h3 className="text-3xl font-semibold mb-4">Reseñas</h3>
        {reviews && reviews.length > 0 ? (
          <div className="text-left mb-4">
            {reviews.map((review, index) => (
              <div key={index} className="mb-5 border border-white rounded-full p-2 flex flex-col items-center">
                <p className="text-gray-300 mb-2">{review.userId}</p>
                <p className="text-gray-300">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-300">Aún no se han creado reseñas.</p>
        )}
      </div>
    </div>
  );
};

export default WebPageViewer;
