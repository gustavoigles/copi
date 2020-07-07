import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { CopyToClipboard } from "react-copy-to-clipboard";

import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import styled from 'styled-components'
import { keyframes } from "styled-components";

const useStyles = makeStyles({
  textPadding: {
    marginBottom: "40px",
    fontWeight: "500",
  },
});



const Copia = ({ urlReact, guardarCopiaSave }) => {
  const [copia, guardarCopia] = useState("");
  const [usuarioNuevo, guardarUsuario] = useState(true);
  const [usuarioExistente, guardarUsuarioExistente] = useState({});
  const [age, setAge] = React.useState("");
  const [time, guardarTime] = React.useState("");
  const [active, setActive] = useState(false);

  

  const activeAnim = keyframes`
 
  100%  {
      background-color: green;
  }
  `;

  const ButtonActive = styled.button`
  
  background-color: red;
  transition: background-color 0.15s cubic-bezier(0.310, -0.105, 0.430, 1.400);
  border-radius: 3px;
  animation-duration: 0.5s;
  animation-name:  ${ active ? activeAnim : null};
  animation-fill-mode: forwards;
  border: none;
  color: #ededed;
  white-space: nowrap;
  margin-left: 1em;
  cursor : pointer;
  padding: 1.20em 5em;
  font-size:15px;


 ;`


  const handleChange = (event) => {
    setAge(event.target.value);
    guardarTime(event.target.value);
  };

  useEffect(() => {
    const copiaValue = async () => {
      console.log(urlReact);
      const respuesta = await clienteAxios.get("/api/copias", {
        params: { url: urlReact },
      });
      if (respuesta.data != null) {
        guardarCopia(respuesta.data.copia);
        guardarUsuario(false);
        console.log(respuesta.data.expireAt )
        if(respuesta.data.expireAt === undefined) {
          guardarUsuarioExistente(respuesta.data);
           deleteCopia(respuesta.data);
        }
      }
    };
    copiaValue();
  }, []);

  const enviaCopia = async (e) => {
    e.preventDefault();

    try {
      if (usuarioNuevo) {
        var oldDateObj = new Date();
        var newDateObj = new Date();

        if (time === "1h") {
          newDateObj.setTime(oldDateObj.getTime() + 60 * 60 * 1000);
        } else if (time === "1s") {
          newDateObj.setDate(oldDateObj.getDate() + 7);
        } else if (time === "1m") {
          newDateObj.setDate(oldDateObj.getDate() + 30);
        } else if (time === "") {
          newDateObj = null;
        }

        var datos;
        if (newDateObj) {
          datos = {
            url: urlReact,
            copia: copia,
            expireAt: newDateObj,
          };
        } else {
          datos = {
            url: urlReact,
            copia: copia,
          };
        }

        const respuesta = await clienteAxios.post("/api/copias", datos);
        guardarCopiaSave(true);
      } 
    } catch (error) {}
  };

  const deleteCopia = async (data) => {
      console.log(data.url);
     await clienteAxios.delete(`/api/copias/${data.url}`);
    
  };
  const classes = useStyles();

  const noBorra = async (datos) => {
      try { 
              console.log("salvando..");
              const respuesta = await clienteAxios.post("/api/copias", datos);
      } catch (error) {
        
      }
  }

  return (
    <Box width="60%" m="auto" p={10} >
      <Typography
        className={classes.textPadding}
        variant="h5"
        align="center"
        color="initial"
        m={6}
        gutterBottom
      
      >
        Portapapeles online.
      </Typography>

      <form onSubmit={enviaCopia} method="POST">
        
        <TextField
          id="outlined-basic"
          label="Copiar aqui"
          variant="outlined"
          onChange={(e) => guardarCopia(e.target.value)}
          value={copia}
          multiline="true"
          fullWidth="true"
          m={2}
        />
          <Box display="flex" justifyContent="flex-end" alignContent="center"  my={2}>
          { usuarioNuevo ?    <Select
          value={age}
          onChange={handleChange}
          displayEmpty
          className={classes.selectEmpty}
          fullWidth="true"
          
        >
          
          <MenuItem value="">
            <em>Borrar cuando sea visto</em>
          </MenuItem>
          <MenuItem value={"1h"}>Borrar en 1 hora</MenuItem>
          <MenuItem value={"1s"}>Borrar en 1 semana</MenuItem>
          <MenuItem value={"1m"}>Borrar en 1 mes</MenuItem>
        </Select> : null  }
        <button
          type="submit"
       
        >
          Guardar
        </button>
    { !usuarioNuevo ?
        <CopyToClipboard text={copia}>
          <ButtonActive onClick={()=> setActive(!active)} >/
            <span class="icon">
         
          <i class="fa fa-check"></i>
        </span>
          </ButtonActive>
       
        </CopyToClipboard> : null
}
   {
        Object.keys(usuarioExistente) != 0 ? <button onClick={ () => noBorra(usuarioExistente)}>No borrar</button> : null

    
   }     


  
        </Box>
      </form>
    </Box>
  );
};

export default Copia;
