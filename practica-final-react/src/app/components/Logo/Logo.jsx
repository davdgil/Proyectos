// Archivo: Imagen.js

import React from 'react';

function Imagen() {
  const rutaImagen = '/comerce.jpg';

  return (
    <div className=" flex items-center justify-right p-8" >
    <img src={rutaImagen} className="object-contain h-60 w-100 " />
  </div>
  );
}

export default Imagen;
