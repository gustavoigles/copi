import React from 'react';
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Box, TextField, Grid } from "@material-ui/core";
import { makeStyles} from '@material-ui/core/styles';
var QRCode = require('qrcode.react');


const useStyles = makeStyles({
   marginTitle: {    
        marginBottom: '20px'
        
     },
     marginSubTitle: {    
      marginBottom: '15px'
   } 
   });

  
   

const Terminado = ({urlReact}) => {
    const classes = useStyles();
    return (
        <Box width="65%" m="auto">
        <Grid  container
  spacing={0}
  direction="row"
  alignItems="center"
  justify="center"
  style={{ minHeight: '100vh' }}>
        <Grid item xs={12} md={6} className={classes.root} >
            <Box display="flex" 
        flexDirection="column" 
      
        alignItems="flex-start"
        justifyContent="flex-start"
        width="95%"
        m="auto">
            
            <Typography variant="h4" className={classes.marginTitle} align="left">Su copia se ha guardado.</Typography>
            <Typography variant="subtitle1" className={classes.marginSubTitle} align="left">Puede acceder a ella desde otra pc o cualquier dispositivo desde <br/><strong>{`https://copi.netlify.app/${urlReact}`}</strong></Typography>
            <Typography variant="subtitle1" gutterBottom align="left">QR code disponible.</Typography>
        
                </Box>
        </Grid>
        <Grid item xs={12} md={6}className={classes.root} >
            <Box  
            display="flex" 
                  justifyContent="center"
                width="95%"
                 m="auto"> 
            <QRCode size="180" value={`http://copi.netlify.app/${urlReact}`} />
            </Box>
        </Grid>
      </Grid>
        
            
        </Box>
    );
};

export default Terminado;