"use client"
import React from "react";


export default function UserPage({ commerce, click }) {
  return (
    <div className="flex flex-wrap justify-center mt-40 gap-4">
      {commerce && commerce.length > 0 ? (
        commerce.map((singleCommerce) => (
          <div
            key={singleCommerce._id}
            className="w-1/2 md:w-1/3 p-8 bg-slate-300 rounded-lg mb-4 cursor-pointer hover:bg-slate-400"
            onClick={() => click(singleCommerce._id)}
          >
            <img
              src={`https://picsum.photos/300/200?unique=${singleCommerce._id}`}
              className="w-full h-40 object-cover object-center"
            />
            <p className="text-2xl text-slate-950 mb-2">{singleCommerce.commerceName}</p>
            <hr className="my-6 border-1 border-gray-500" />
            <p className="font-bold text-slate-950">+34 {singleCommerce.phone}</p>
            <p className="font-bold text-slate-950">{singleCommerce.email}</p>
            <p className="font-bold text-slate-950">{singleCommerce.address}</p>
          </div>
        ))
      ) : (
        <p>No hay comercios disponibles</p>
      )}
    </div>
  );
}


