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
  width: 800px;
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

const ContenedorFlex = styled.div`
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
});

const Terminado = ({ urlReact }) => {
  const classes = useStyles();
  return (
    <ContenedorPrincipal>
      <ContenedorFlex>
        <Typography variant="h4" className={classes.marginTitle}>
          Su copia se ha guardado.
        </Typography>
        <Typography variant="subtitle1" className={classes.marginSubTitle}>
          Puede acceder a ella desde otra pc o cualquier dispositivo desde{" "}
          <br />
          <strong>{`https://copi.netlify.app/${urlReact}`}</strong>
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          QR code disponible.
        </Typography>
      </ContenedorFlex>
      <ContenedorFlex>
        <QRCode size="180" value={`http://copi.netlify.app/${urlReact}`} />
      </ContenedorFlex>
    </ContenedorPrincipal>
  );
};

export default Terminado;
