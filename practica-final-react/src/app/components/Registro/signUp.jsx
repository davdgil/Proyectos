"use client"
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';

const saveUser = async (user) => {
  try {
    const response = await fetch('http://localhost:9000/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    if (!response.ok) {
      toast.error("Error al añadir un nuevo usuario")
      console.error('Error en la función POST. Código de estado:', response.status);
      return;  // Salir de la función si hay un error en la respuesta
    } else {

      console.log('Usuario añadido con exito');
      toast.success("Usuario añádido con éxito")

    }

  } catch (error) {
    console.error('Error en la función POST:', error);
    toast.error("Error en el servidor")
  }
}


function SignUp() {
  const router = useRouter();
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const adminMode = watch('adminMode', false);

  const onSubmit = (data) => {
    console.log(data)
    const { adminMode, ...userData } = data;

    const newUser = {
      ...(adminMode && { role: 'admin' }) ,
      ...userData
      
    }
    console.log(newUser)
    saveUser(newUser)

  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
      <div className="w-full bg-gray-950 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <fieldset>
            <legend><h1 className="text-xl font-bold leading-tight tracking-tight text-gray-300 md:text-2xl dark:text-white">
              Registro de Usuario
              <input
                type="checkbox"
                id="adminMode"
                className="text-black bg-slate-900 hover:bg-red-700 ml-10 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg "
                {...register('adminMode')}
              />
              <label htmlFor="adminMode" className="ml-2 text-gray-300 text-sm font-medium">
                Modo Admin
              </label>
            </h1></legend>
          </fieldset>

          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label htmlFor="city" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Ciudad</label>
                <select
                  id="city"
                  {...register('city', {
                    required: 'This field is required',
                  })}
                  className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="" disabled defaultValue>
                    Selecciona una ciudad
                  </option>
                  <option value="">Selecciona una ciudad</option>
                  <option value="Madrid">Madrid</option>
                  <option value="Alcalá de Henares">Alcalá de Henares</option>
                  <option value="Las Rozas">Las Rozas</option>
                  <option value="Alcobendas">Alcobendas</option>
                  <option value="Fuenlabrada">Fuenlabrada</option>
                  <option value="Getafe">Getafe</option>
                  <option value="Leganes">Leganes</option>

                </select>
                {errors.city && <span className="text-red-500 text-sm">{errors.city.message}</span>}
              </div>

              <div>
                <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Fecha de nacimiento</label>

                <input
                  type="date"
                  {...register('date', {
                    required: true,
                    min: '1930-01-01',
                    max: '2015-12-31',
                  })}
                  id="date"
                  className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                />
                {errors.date && <span className="text-red-500 text-sm">Fecha no válida</span>}

              </div>

              <div>
                <label htmlFor="interests" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Interests</label>
                <select
                  id="interests"
                  {...register('interests', {
                    required: 'This field is required',
                  })}
                  className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option value="" disabled>Seleccion tus intereses</option>
                  <option value="hamburgers">Hamburgesas</option>
                  <option value="pizza">Pizza</option>
                  <option value="pasta">Pasta</option>
                  {/* Add more options as needed */}
                </select>
                {errors.interests && <span className="text-red-500 text-sm">{errors.interests.message}</span>}
              </div>

              <div>
                <label htmlFor="offers" className="flex items-center text-sm font-medium text-gray-300 dark:text-white">
                  <input
                    type="checkbox"
                    id="offers"
                    {...register('offers')}
                    className="text-black bg-slate-900 hover:bg-red-700 mr-2 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg"
                  />
                  Permito recibir ofertas
                </label>
              </div>
            </div>

            <hr className="my-6 border-1 border-gray-500" />

            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">E-mail</label>
              <input
                type="email"
                {...register('email', {
                  required: 'This field is required',
                  pattern: {
                    value: /^\S+@\S+$/i,
                    message: 'Direccion de correo no válida',
                  },
                })}
                id="email"
                className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300 dark:text-white">Contraseña</label>
              <input
                type="text"
                {...register('password', {
                  required: 'This field is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters',
                  },
                })}
                id="password"
                placeholder="••••••••"
                className="bg-gray-50 border border-gray-300 text-zinc-950 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
            </div>

            <button
              type="submit"
              className="w-full text-black bg-red-600  hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Registrarse
            </button>

            <p className="text-sm font-light text-gray-300 dark:text-gray-300">
              ¿Ya tienes una cuenta? <Link href="/" className="font-medium text-white hover:underline dark:text-primary-500">Iniciar sesión</Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );





};

export default SignUp
