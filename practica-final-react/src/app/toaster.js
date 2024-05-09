"use client"
import dynamic from "next/dynamic";


//llama desde el layout
export const Toaster =  dynamic (async () => {
    const {Toaster} = await import("react-hot-toast")
    return Toaster
},
{
    ssr: false, //no funciona con codigo de server 
}
);