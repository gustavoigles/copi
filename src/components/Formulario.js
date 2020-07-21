import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../App.css";
import styled from "styled-components";

const ContenedorPrincipal = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  position: absolute;
  top: 45%;
  left: 50%;
  transform: translate(-50%, -50%);
  margin: auto;

 
`;

const Titulo = styled.h1`
  font-family: Inter, sans serif;
  color: rgb(31, 31, 48);
  font-size: 50px;
  text-align: center;
  width: 100%;
  @media (max-width:600px) {
    font-size: 40px;
  }
`;

const SubTitulo = styled.h2`
  font-family: Inter, sans serif;
  padding-top: 10px;
  font-weight: 300;
  color: rgb(31, 31, 48);
  font-size: 22px;
  text-align: center;
  max-width: 710px;
  margin: auto;
  line-height: 1.4;
  @media (max-width:600px) {
    font-size: 20px;
  }
`;

const UrlContain = styled.div`
  width: 100%;
  max-width: 700px;
  margin: auto;
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
const Url = styled.div`
  height: 50px;
  font-family: Inter, sans serif;
  font-size: 15px;
  min-width: 120px;
  width: 20%;
  color: white;
  text-align: right;
  padding-right: 8px;
  line-height: 50px;
  background: linear-gradient(135deg, #589bff, #522bd4);
  border-radius: 5px 0px 0px 5px;
`;
const UrlInput = styled.input`
  font-family: Inter, sans serif;
  height: 46px;
  background-color: white;
  border: none;
  width: 80%;
  color: #3d3d3d;
  text-align: left;
  line-height: 50px;
  padding-left: 8px;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;

  &:focus {
    outline: none;
    border:1px solid #589bff;
  }
`;
const UrlButton = styled.div`
  height: 50px;
  width: 20%;
  color: white;
  text-align: center;
  background: linear-gradient(135deg, #589bff, #522bd4);
  line-height: 50px;
  border-radius: 0px 5px 5px 0px;
  cursor:pointer;
`;

const ButtonSubmit = styled.button`
  font-family: Inter, sans serif;
  height: 100%;
  width: 100%;
  background: none;
  border: none;
  color: white;
  cursor:pointer;
`;

const formStyle = {
  width: "90%",
  display: "flex",
};

const Formulario = ({ guardarUrlReact }) => {
  const [url, guardarUrl] = useState("");

  const cambiaUrl = (e) => {
    guardarUrl(e.target.value);
  };

  const sendUrl = (e) => {
    guardarUrlReact(url);
  };

  return (
    <Router>
      <ContenedorPrincipal>
        <div>
          <Titulo>Proba el portapapeles online.</Titulo>
          <SubTitulo>
            Solo entra en una URL de nuestro dominio, pega y
            guarda! Accede desde cualquier dispositivo.{" "}
          </SubTitulo>
          <UrlContain>
            <Url>copi.netlify.app/</Url>
            <form style={formStyle} method="POST">
              <UrlInput type="text" placeholder="Ingresa url"  onChange={cambiaUrl} required />
              <UrlButton>
              <Link  to={`/${url}`}> <ButtonSubmit type="submit" onClick={() => guardarUrlReact(url)}>Ir</ButtonSubmit></Link>
              </UrlButton>
            </form>
          </UrlContain>
        </div>
      </ContenedorPrincipal>
    </Router>
  );
};

export default Formulario;
