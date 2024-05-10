// WebPageEditor.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { jwtDecode } from 'jwt-decode';

const WebPageEditor = ({ onSave, onCancel, initialData }) => {
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: initialData[0]
    
  });
  const reviews = []

  const handleSave = async (data) => {
    const token = localStorage.getItem('token');
    const decodedToken = jwtDecode(token);
  
    // Preparar el FormData con los campos del formulario y los archivos
    const formData = new FormData();
    formData.append('merchantId', decodedToken._id);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('city', data.city);
    formData.append('address', data.address);
    formData.append('commerceName', data.commerceName);
    formData.append('email', data.email);
    formData.append('phone', data.phone);
  
    // Añadir archivos a FormData
    if (data.photos.length > 0) {
      Array.from(data.photos).forEach((file) => {
        formData.append('images', file);
      });
    }
  
    // Configuración de la petición fetch para enviar los datos
    try {
      for (let [key, value] of formData.entries()) {
        console.log(key, value);
    }
      const response = await fetch('http://localhost:9000/api/webPage/upload-images', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}` // Si tu API requiere autenticación
        },
        body: formData
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const result = await response.json();
      onSave(result);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSubmit(handleSave)}>
      <div className="bg-slate-700 p-4 rounded shadow-md">
        <label className="block mb-2">
          Título:
          <input
            type="text"
            name="title"
            {...register("title")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Descripción:
          <textarea
            name="description"
            {...register("description")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Ciudad:
          <select
            name="city"
            {...register("city")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          >
            <option value="">Selecciona una ciudad</option>
            <option value="Madrid">Madrid</option>
            <option value="Alcalá de Henares">Alcalá de Henares</option>
            <option value="Las Rozas">Las Rozas</option>
            <option value="Alcobendas">Alcobendas</option>
            <option value="Fuenlabrada">Fuenlabrada</option>
            <option value="Getafe">Getafe</option>
            <option value="Leganes">Leganes</option>

          </select>
        </label>
        <label className="block mb-2">
          Fotos:
          <input
            type="file"
            name="photos"
            {...register("photos")}
            multiple
            className="w-full border rounded p-2 mt-1"
          />
          {errors.photos && <span className="text-red-500">{errors.photos.message}</span>} 
        </label>
        <label className="block mb-2">
          Dirección:
          <input
            type="text"
            name="address"
            {...register("address")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Nombre del Comercio:
          <input
            type="text"
            name="commerceName"
            {...register("commerceName")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Email:
          <input
            type="text"
            name="email"
            {...register("email")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>
        <label className="block mb-2">
          Teléfono:
          <input
            type="text"
            name="phone"
            {...register("phone")}
            className="w-full border rounded p-2 mt-1 text-slate-950"
          />
        </label>

        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            Guardar
          </button>
          <button
            type="button"
            onClick={handleCancel}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Cancelar
          </button>
        </div>
      </div>
    </form>
  );
};

export default WebPageEditor;
