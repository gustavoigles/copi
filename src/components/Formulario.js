import React, { useState } from "react";
import { BrowserRouter as Router, Link } from "react-router-dom";
import "../App.css";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, TextField, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


const useStyles = makeStyles({
  marginTitle: {
    marginBottom: "20px",
  },
  boxa : {
    "@media (max-width: 968px)": {
        marginTop : "26px"
    }
  },
  marginSubTitle: {
    marginBottom: "15px",
  },
  input: {
     width : "150px",
     border : "none",
      outline: "none",
     backgroundColor : "#f2f2f2",
     "@media (max-width: 500px)": {

      width: "100px"
  }

  },
  send : {
    height: "40px",
    border : "none",
    borderRadius: "0px 5px 5px 0px",
    padding : "0 15px",
    color : "#f2f2f2",
      backgroundColor : "#4365c3",
      cursor : "pointer"
  },
  div : {
      
      padding : "5px 5px 5px 8px",
      borderRadius: "5px 0px 0px 5px",
      color : "white",
      backgroundColor : "#4365c3"
      
  },
  button : {
    backgroundColor : "#3f51b5",
    outline: "none",
    border : "none",
    color: "white",
    height : "26px",
    padding : "0px 10px",
    marginLeft: "0px",
    borderRadius : "0px 5px 5px 0px"
  },
  inputBox : {
      backgroundColor : "#546EF6",
      width : "200px",
      borderRadius : "30px 0px 0px 30px"
  },
 
  a : {
    textDecoration : "none",
    color: "white"
   
  },
  box: {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    
    padding: "150px",
   

    "@media (max-width: 500px)": {

      width: "90%"
  }
  },
});

const Formulario = ({ guardarUrlReact }) => {
  const [url, guardarUrl] = useState("");

  const cambiaUrl = (e) => {
    guardarUrl(e.target.value);
  };

  const sendUrl = (e) => {
    guardarUrlReact(url);
  };
  const classes = useStyles();
  return (
    <Router>
      <Box className={classes.box} width="62%" m="auto">
        <Grid container spacing={0} direction="row">
          <Grid item xs={12} md={8} className={classes.border}>
            <Box width="100%" m="auto">
              <Typography
                variant="h4"
                className={classes.marginTitle}
                align="left"
              >
                Como funciona:
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.marginSubTitle}
                align="left"
              >
                {" "}
                1. Entra en cualquier URL que empiece con copi.netlify.app
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.marginSubTitle}
                align="left"
              >
                &nbsp;&nbsp;&nbsp; Ejemplo:{" "}
                <strong>copi.netlify.app/ejemplo</strong>
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.marginSubTitle}
                align="left"
              >
                2. Pega lo que quieras y guarda.
              </Typography>
              <Typography
                variant="subtitle1"
                className={classes.marginSubTitle}
                align="left"
              >
                3. Entra a la URL desde cualquier dispositivo.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={4} className={classes.border}>
            <Box className={classes.boxa} width="100%" m="auto" >
              <div className="form-containter" >
                <Typography
                  variant="h4"
                  className={classes.marginTitle}
                  align="left"
                >
                  Probala:
                </Typography>
                <form method="POST">

                <Box    className={classes.marginTitle} display="flex" alignContent="center" justify="center">
              <div className={classes.div}> <Typography
                variant="subtitle1"
             
                align="center"
              >
                    Clip.netlify.app/
                    </Typography>
                    </div>
              <input type="text" className={classes.input} onChange={cambiaUrl} required/>
              <Link className={classes.a} to={`/${url}`}> <button className={classes.send} type="submit" onClick={() => guardarUrlReact(url)}> <span>Ir</span></button></Link>
            </Box>

                </form>
              </div>
              <Typography
                variant="subtitle1"
                className={classes.marginSubTitle}
                align="left"
              >
                Ingresa una palabra que recuerdes facilmente.
              </Typography>
           
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Router>
  );
};

export default Formulario;
