import React, {useState} from 'react';
import {Card, CardContent, Grid} from '@mui/material';
import QrReader from 'react-qr-reader';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import instance from './axiosConfig';
//import { Navigate } from 'react-router-dom'

function ScanTicket() { 
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const [text, setText] =  useState('Fake Ticket');
  const [open, setOpen] = React.useState(false);
  console.log(scanResultWebCam)
  const handleClose = () => {
    setOpen(false);
  };
  
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };
 
  const toggleDrawer = () => {
    return null//<Navigate to="/home" replace />;
  }

  function changeTikcetStatus(result){
    instance.post('ticket',JSON.stringify({id:result,scaned_status:false})).then(res=>
      {
        if(res.data.ticket){
          const ticket = {id:res.data.ticket[0].id,scaned_status:true}
          const tikcetDetail = res.data.ticket[0] || {}
          instance.post('updateticket',JSON.stringify(ticket)).then(res=>
            {
              if(res.data){
                //console.log(res.data,'updateticket',tikcetDetail)
                setOpen(true); 
                setText('Ticket Owner :'+tikcetDetail.ticket_owner+' Phone: '+tikcetDetail.address)
              }  
            }
            ).catch(err=>console.log(err))
        }else{
          setOpen(true);
        } 
      }
      ).catch(err=>console.log(err))
  }
  
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
        changeTikcetStatus(result)
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

          <Modal
            hideBackdrop
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
          >
            <Box sx={{ ...style, width: 200 }}>
              <h2 id="child-modal-title">Ticket Status</h2>
              <p id="child-modal-description">
                {text}
              </p>
              <Button onClick={handleClose}>Close</Button>
            </Box>
          </Modal>
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
      padding: 20function ChildModal() {
  

  
}
    },
    btn : {
      marginTop: 10,
      marginBottom: 20
    }
})); */
export default ScanTicket;


