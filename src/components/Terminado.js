import React from "react";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import styled from "styled-components";
var QRCode = require("qrcode.react");

const ContenedorPrincipal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: auto;
  width: 850px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  @media (max-width: 800px) {
    flex-direction: column;
    width: 100%;
    padding: 15px;
  }
`;

const Titulo = styled.h1`
  font-family: Inter, sans serif;
  color: rgb(31, 31, 48);
  font-size: 40px;
  text-align: left;
  width: 100%;
  @media (max-width:600px) {
    text-align:center;
  }
`;

const SubTitulo = styled.p`
  font-family: Inter, sans serif;
  color: rgb(31, 31, 48);
  font-size: 18px;
  text-align: left;
  width: 100%;
  @media (max-width:600px) {
    text-align:center;
  }
  line-height:1.8;
`;

const ContenedorFlex = styled.div`
  max-width:600px;
  @media (max-width: 800px) {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 15px;
    margin: auto;
  }
`;

const useStyles = makeStyles({
  marginTitle: {
    marginBottom: "20px",
  },
  marginSubTitle: {
    marginBottom: "15px",
  },
  grid: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%,-50%)",
  },
  qr : {
    width: "100%",
    maxWidth:"200px"
  }
});

const Terminado = ({ urlReact }) => {
  const classes = useStyles();
  return (
    <ContenedorPrincipal>
      <ContenedorFlex>
        <Titulo>
          Su copia se ha guardado.
          </Titulo>
        <SubTitulo>
          Puede acceder a ella desde otra pc o cualquier dispositivo desde{" "}
          <br />
          <strong>{`https://copi.netlify.app/${urlReact}`}</strong>
          </SubTitulo>
        <SubTitulo>
          QR code disponible.
          </SubTitulo>
      </ContenedorFlex>
      <ContenedorFlex>
        <QRCode size="190" className={classes.qr} value={`https://copi.netlify.com/${urlReact}/`} />
      </ContenedorFlex>
    </ContenedorPrincipal>
  );
};

export default Terminado;
