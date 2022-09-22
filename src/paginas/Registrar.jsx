import { Link } from "react-router-dom";
import { useState } from 'react';
import Alerta from '../components/Alerta';
import clienteAxios from "../config/axios";

const Registrar = () => {
  const [ nombre, setNombre ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ repetirPassword, setRepetirPassword ] = useState('');

  const [ alerta, setAlerta] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    
    if([nombre, email, password, repetirPassword].includes('')) {
      setAlerta({ msg: 'Hay campos vacios', error: true });
      return;
    }

    if(password !== repetirPassword) {
      setAlerta({ msg: 'Los passwords no son iguales', error: true });
      return;
    }

    if(password.length < 6) {
      setAlerta({ msg: 'El password es muy corto, debe contener al menos 6 caracteres', error: true });
      return;
    }

    setAlerta({});

    // Crear usuario en la API

    try {
      await clienteAxios.post('/veterinarios', { nombre, email, password })
      setAlerta({
        msg: 'Creado correctamente, revisa tu email',
        error: false
      })
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true
      })
    }


  }

  const { msg } =  alerta;

  return (
    <>
    <div>
      <h1 className="text-indigo-600 font-black text-6xl">Crea tu Cuenta y Administra {""} <span className="text-black">tus Pacientes.</span></h1>
    </div>

    <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>

      {msg &&  <Alerta
          alerta={alerta}
        />
      } 
        <form 
        onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Nombre
            </label>
            <input 
              type="text" 
              placeholder="Tu Nombre"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={nombre}
              onChange={e => setNombre(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Email de Registro
            </label>
            <input type="email" 
              placeholder="email@email.com"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label 
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Password
            </label>
            <input type="password" 
              placeholder="ingresa password"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="my-5">
            <label htmlFor=""
              className="uppercase text-gray-600 block text-xl font-bold"
            >
              Confirma tu Password
            </label>
            <input type="password" 
              placeholder="confirma tu password"
              className="border w-full p-2 mt-3 bg-gray-50 rounded-xl"
              value={repetirPassword}
              onChange={e => setRepetirPassword(e.target.value)}
            />
          </div>
          <input 
            type="submit"
            value="Registrarse"
            className="bg-indigo-700 w-full py-3 rounded-xl text-white uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-800 md:w-auto px-10"
          />
        </form>

        <nav className='mt-10 lg:flex lg:justify-between'>
          <Link 
            className='block text-center my-5 text-gray-500'
            to="/">Ya tienes una cuenta? Inicia Sesión</Link>
          <Link  
            className='block text-center my-5 text-gray-500'
            to="/olvide-password">Olvide mi Password</Link>
        </nav>
      </div>
    </>
  )
}

export default Registrar;