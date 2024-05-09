"use client";
import './form.css'


import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast';

async function onSubmit(commerce, reset) {
    console.log(commerce);
    const token = localStorage.getItem('token');

    const newCommerce = {
        ...commerce, 
    }

    console.log("Datos del comercio ", newCommerce);
    try {
        const response = await fetch('http://localhost:9000/api/commerce/createCommerce', {  
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(newCommerce),
        });

        if (!response.ok) {
            toast.error("Error al añadir un nuevo comercio")
            console.error('Error en la función POST. Código de estado:', response.status);
            return;  
        } else {
            reset()
            console.log('Comercio añadido con éxito');
            toast.success("Comercio añadido con éxito")
        }

    } catch (error) {
        console.error('Error en la función POST:', error);
        toast.error("Error en el servidor")
    }
}


function Form() {

    const { handleSubmit, reset, register, formState: { errors } } = useForm();

    return (
        <div className="flex items-center justify-center flex-col ">
            <div className='title text-center my-8'>
                <h1 className="text-3xl font-bold text-gray-300 ">DAR DE ALTA UN COMERCIO</h1>
                <p className="text-lg text-red-300 mt-2">Completa el formulario para registrar un nuevo comercio.</p>
            </div>

            <form className="w-full max-w-lg rounded mt-8 adminForm" onSubmit={handleSubmit((data) => onSubmit(data, reset))}>

                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="commerceName">
                            Nombre del comercio
                            {errors.commerceName && (
                                <span className="text-red-500 text-xs italic"> *</span>
                            )}
                        </label>
                        <input
                            {...register("commerceName", { required: true })}
                            className="appearance-none block w-full  text-black border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                            id="commerceName"
                            type="text"
                        />


                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="email">
                            E-mail
                            {errors.email && (
                                <span className="text-red-500 text-xs italic"> *</span>
                            )}
                        </label>
                        <input
                            {...register("email", { required: true })}
                            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded mb-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="email"
                            type="email"
                        />


                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-5">
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="phone">
                            Telefono de contacto
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded mb-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            {...register('phone', {
                                required: true,
                                pattern: /^[0-9]{9}$/,
                            })}
                            type="tel"
                            id="phone"
                            maxLength="9"
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-xs italic">Formato incorrecto</p>
                        )}

                    </div>
                    <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="cif">
                            CIF
                        </label>
                        <input className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded mb-3 py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            {...register("cif", {
                                required: true,
                                pattern: /\d{8}[a-zA-Z]/,
                            })}

                            id="cif"
                            type="text"
                            maxLength="9"
                        />
                        <p></p>
                        {errors.cif && (

                            <p className="text-red-500 text-xs italic">Formato incorrecto</p>
                        )}

                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block uppercase tracking-wide text-gray-300 text-xs font-bold mb-2" htmlFor="address">
                            Dirección
                            {errors.address && (
                                <span className="text-red-500 text-xs italic"> *</span>
                            )}
                        </label>

                        <input
                            {...register("address", { required: true })}
                            className="appearance-none block w-full bg-gray-200 text-black border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                            id="address"
                            type="search"
                        />
                        <p className="text-gray-400 text-xs italic">direccion del establecimiento</p>
                    </div>
                </div>
                <div className="flex items-center justify-end">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Añadir Comercio
                    </button>
                </div>
            </form>

            {Object.keys(errors).length > 0 && (
                <p className="text-red-500 text-xs italic">Por favor, corrige los errores en el formulario.</p>
            )}
        </div>
    );
}

export default Form;
