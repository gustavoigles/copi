import React, {useState, useEffect} from 'react';
import './App.css';
import Formulario from './components/Formulario';
import Copia from './components/Copia'
import Terminado from './components/Terminado'
import clienteAxios from "./config/axios";

function App() {

 const [urlReact, guardarUrlReact] = useState('');
 const [copiaSave, guardarCopiaSave] = useState(false);
  

  useEffect(() => {
         dynoWake();
         const url = window.location.pathname.split('/');
         guardarUrlReact(url[1]);
  }, [urlReact]);

  const dynoWake = async () => {
    const respuesta = await clienteAxios.get("/api/copias");
  }

  if(copiaSave) {
    return <Terminado urlReact={urlReact}/>;
  }
 
  if (urlReact == "") {
    return <Formulario guardarUrlReact={guardarUrlReact}/>;
  }
    return <Copia urlReact={urlReact}  guardarCopiaSave={guardarCopiaSave}/>;
  }




export default App;
