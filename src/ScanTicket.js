import React, {useState} from 'react';
import {Card, CardContent, Grid} from '@mui/material';
import QrReader from 'react-qr-reader';


import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import { Navigate } from 'react-router-dom'

function ScanTicket() { 
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
 
  
  const toggleDrawer = () => {
    return <Navigate to="/home" replace />;
  }
  
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   }
  return (
    < >
          <Card>
              <CardContent >{/** alignItems="center" align="center" justify="center" */}
                  <Grid  alignItems="center" align="center" justify="center" container spacing={2}>
                      <Grid item xl={4} lg={4} md={12} sm={12} xs={12}>
                         <h3>Scanned the QR Code</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                      </Grid>
                  </Grid>
              </CardContent>
                
                <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
                Go Back
                </IconButton>
           
          </Card>
    </>
  );
}

/* const useStyles = makeStyles((theme) => ({
    conatiner: {
      marginTop: 10
    },
    title: {
      display: 'flex',
      justifyContent: 'center',
      alignItems:  'center',
      background: '#3f51b5',
      color: '#fff',
      padding: 20
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
})); */
export default ScanTicket;