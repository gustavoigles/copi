import React, { useState, useEffect } from "react";
import clienteAxios from "../config/axios";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Typography from "@material-ui/core/Typography";
import { Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import styled from "styled-components";
import { keyframes } from "styled-components";
import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#1e88e5",
    },
    secondary: {
      main: "#fff",
    },
  },
});

const useStyles = makeStyles({
  textPadding: {
    marginBottom: "40px",
    fontWeight: "500",
  },
  textFieldOut: {
    color: theme.palette.secondary.main,
  },
});

const activeAnim = keyframes`
 
100%  {
    background-color: #1fce6c;
}
`;

const activeAnim2 = keyframes`

100%  {
  background-color: #1fce6c;
}
`;

const ContenedorPrincipal = styled.div`
  width: 70%;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -55%);

  @media (max-width: 900px) {
    width: 95%;
  }
`;

const Titulo = styled.h1`
  font-family: Inter, sans serif;
  color: rgb(31, 31, 48);
  font-size: 35px;
  text-align: center;
  width: 100%;
  margin-bottom: 40px;
  @media (max-width:600px) {
    font-size: 35px;
  }
`;

const ContenedorButtons = styled.div`
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
  @media (max-width: 700px) {
    flex-direction: column-reverse;
  }
`;

const ButtonActive = styled.button`
font-family: Inter;
font-weight:bold;
  background-color: #285ce2;
  transition: background-color 0.15s cubic-bezier(0.31, -0.105, 0.43, 1.4);
  border-radius: 3px;
  border: none;
  color: #ededed;
  animation-duration: 0.2s;
  animation-name: ${(props) => (props.active ? activeAnim : "")};
  animation-fill-mode: forwards;
  white-space: nowrap;
  margin-left: 1em;
  cursor: pointer;
  padding: 1.2em 5em;
  font-size: 15px;
  @media (max-width: 700px) {
    margin-left: 0em;
    margin-bottom: 10px;
  }
`;

const ButtonActive2 = styled.button`
font-family: Inter;
font-weight:bold;
  background-color: #285ce2;
  transition: background-color 0.15s cubic-bezier(0.31, -0.105, 0.43, 1.4);
  border-radius: 3px;
  animation-duration: 0.2s;
  animation-name: ${(props) => (props.active ? activeAnim : "")};
  animation-fill-mode: forwards;
  border: none;
  color: #ededed;
  white-space: nowrap;
  margin-left: 1em;
  cursor: pointer;
  padding: 1.2em 5em;
  font-size: 15px;
  @media (max-width: 700px) {
    margin-left: 0em;
    margin-bottom: 10px;
  }
`;

const Copia = ({ urlReact, guardarCopiaSave }) => {
  const [copia, guardarCopia] = useState("");
  const [usuarioNuevo, guardarUsuario] = useState(true);
  const [usuarioExistente, guardarUsuarioExistente] = useState({});
  const [age, setAge] = React.useState("");
  const [time, guardarTime] = React.useState("");
  const [active, setActive] = useState(false);
  const [activeBorra, setActiveBorra] = useState(false);

  const handleChange = (event) => {
    setAge(event.target.value);
    guardarTime(event.target.value);
  };

  useEffect(() => {
    const copiaValue = async () => {
      const respuesta = await clienteAxios.get("/api/copias", {
        params: { url: urlReact },
      });
      if (respuesta.data != null) {
        guardarCopia(respuesta.data.copia);
        guardarUsuario(false);

        if (respuesta.data.expireAt === undefined) {
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
    try {
      await clienteAxios.delete(`/api/copias/${data.url}`);
    } catch (error) {}
  };
  const classes = useStyles();

  const noBorra = async (datos) => {
    try {
      const respuesta = await clienteAxios.post("/api/copias", datos);
      setActiveBorra(true);
    } catch (error) {}
  };

  return (
    <ContenedorPrincipal>
      {/*  <Box width="60%" m="auto" p={10} > */}
   
        <Titulo>
          {usuarioNuevo ?  "Pega aqui lo que quieras." : "Aqui estan tus cosas"}
        </Titulo>
      

      <form onSubmit={enviaCopia} method="POST">
        <TextField
          color="palette.secondary.main"
          id="outlined-error"
          label="Copiar aqui"
          variant="outlined"
          onChange={(e) => guardarCopia(e.target.value)}
          value={copia}
          multiline="true"
          fullWidth="true"
          rows={8}
          m={2}
          className={classes.textFieldOut}
        />
        <ContenedorButtons>
          {/*     <Box display="flex" justifyContent="flex-end" alignContent="center"  my={2}> */}
          {usuarioNuevo ? (
            <Select
              value={age}
              onChange={handleChange}
              displayEmpty
              className={classes.selectEmpty}
              fullWidth="true"
            >
              <MenuItem value="">
                Borrar cuando sea visto
              </MenuItem>
              <MenuItem value={"1h"}>Borrar en 1 hora</MenuItem>
              <MenuItem value={"1s"}>Borrar en 1 semana</MenuItem>
              <MenuItem value={"1m"}>Borrar en 1 mes</MenuItem>
            </Select>
          ) : null}

          {usuarioNuevo ? (
            <ButtonActive type="submit">Guardar</ButtonActive>
          ) : null}
          {!usuarioNuevo ? (
            <CopyToClipboard text={copia}>
              <ButtonActive active={active} onClick={() => setActive(true)}>
                {active ? " Copiado " : "Copiar "}

                <span class="icon">
                  {" "}
                  {active ? (
                    <i class="fa fa-check"></i>
                  ) : (
                    <i class="fa fa-copy"></i>
                  )}
                </span>
              </ButtonActive>
            </CopyToClipboard>
          ) : null}
          {Object.keys(usuarioExistente) != 0 ? (
            <ButtonActive2
              active={activeBorra}
              onClick={() => noBorra(usuarioExistente)}
            >
              {activeBorra ? "Guardado " : "No borrar "}
              <span class="icon">
                {activeBorra ? (
                  <i class="fa fa-check"></i>
                ) : (
                  <i class="fa fa-times"></i>
                )}
              </span>{" "}
            </ButtonActive2>
          ) : null}
        </ContenedorButtons>
      </form>
    </ContenedorPrincipal>
  );
};

export default Copia;
