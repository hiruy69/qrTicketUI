import React, {useState} from 'react';
import {Card, CardContent, Grid} from '@mui/material';
import QrReader from 'react-qr-reader';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';

import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import IconButton from '@mui/material/IconButton';
import instance from './axiosConfig';


import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import {NavLink} from 'react-router-dom';
//import { Navigate } from 'react-router-dom'

function ScanTicket() { 
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  const [text, setText] =  useState('Expired or Fake Ticket');
  const [open, setOpen] = React.useState(false);
  const [isScan, setIsScan] = React.useState(false);
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
        if(res.data.ticket.length){
          const ticket = {id:res.data.ticket[0].id,scaned_status:true}
          const tikcetDetail = res.data.ticket[0] || {}
          instance.post('updateticket',JSON.stringify(ticket)).then(res=>
            {
              if(res.data){
                //console.log(res.data,'updateticket',tikcetDetail)
                setIsScan(false);
                setOpen(true); 
                setText('Ticket Owner :'+tikcetDetail.ticket_owner+' Phone: '+tikcetDetail.address)
              }  
            }
            ).catch(err=>console.log(err))
        }else{
          setIsScan(false);
          setOpen(true);
        } 
      }
      ).catch(err=>{
        console.log(err)
        setText('Expired or Fake Ticket')
        setIsScan(false);
        setOpen(true);
      })
      
  }
  
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result && isScan === false){
        setScanResultWebCam(result);
        changeTikcetStatus(result)
        setIsScan(true);

    }
   }
  return (
    < > 
        <Backdrop
            sx={{ display:'flex',flexDirection:'column',justifyContent:'center', color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={isScan}
          >
            <CircularProgress color="inherit"/>
            <Typography color="inherit" gutterBottom>
                  Scaning Please wait....
            </Typography>

            
          </Backdrop>
    
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
                
                <NavLink to="/home"> 
                <IconButton onClick={toggleDrawer}>
                <ChevronLeftIcon />
                Go Back
                </IconButton>
                </NavLink>
           
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



