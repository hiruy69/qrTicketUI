import * as React from 'react';
import Title from './Title';
import {Select,MenuItem,  Grid, TextField, Button } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from 'react-copy-to-clipboard'
import AlertDialogSlide from './AlertDialogSlide';
import CustomizedSnackbars from './CustomizedSnackbars';
//import instance from './axiosConfig'

import Card from '@mui/material/Card';
//import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';

import axios from 'axios';
import moment from 'moment'
const instance = axios.create({
  // .. where we make our configurations
      baseURL: 'https://qr-c0de-server.herokuapp.com/'
  });
  
  

export default function Orders() {

  const TOKEN = localStorage.getItem('access_token')
  // Where you would set stuff like your 'Authorization' header, etc ...
  instance.defaults.headers.common['x-access-token'] = TOKEN;
  instance.defaults.headers.common['Authorization'] = TOKEN;
  // Also add/ configure interceptors && all the other cool stuff
  instance.defaults.headers.post['Content-Type'] = 'application/json';


  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('info');
  const [openAlert, setOpenAlert] = React.useState(false)
  
  const [price, setPrice] = React.useState(200)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const [tickets, setTickets] = React.useState([])
  //const [page, setPage] = React.useState(1)
  
  const baseURL = window.location.origin

  const getTickest = ()=>{
    console.log(localStorage.getItem('access_token'))
    instance.post('ticketspg',{id:1}).then(res=>
      {
        setTickets(res.data.ticket.data)
        console.log(res.data.ticket.data)
      }
      ).catch(err=>console.log(err))
  }

  React.useEffect(()=>{
    
    getTickest()
  },[openAlert])


  const handleClose = () => {
    
    setOpen(false);
  };

  const handleCancelAlert = () => {
    setOpenAlert(false);
  };

  const handleCloseAlert = (event) => {
    const ticket = {price:price  ,ticket_owner:name ,address:phone }
    instance.post('createticket',JSON.stringify(ticket)).then(res=>
      {
        setSeverity('success');
        setMessage('Ticket Generated ')
        setOpen(true);
        getTickest()
      }
      ).catch(err=>{
        setSeverity('error');
        setMessage('Somthing Went wrong!! Try again')
        setOpen(true);
      })

    setOpenAlert(false);
  };

  const copyLink = () => {
    setSeverity('info');
    setMessage('Link copy to clipboard')
    setOpen(true);
  };

  const generateTikcet = (e)=>{
      setTitle('New Ticket');
      setMessage(`'Are you sure you want to create a New Ticket for ${name} with price ${price}?'`)
      setOpenAlert(true);
  }

  const handleChange = (e)=>{
    //console.log(e.target)
    setPrice(e.target.value)
  }

  const handleInput = (e)=>{
    if(e.target.name === 'phone'){
      setPhone(e.target.value)
    }else if(e.target.name === 'name'){
      setName(e.target.value)
    }
  } 


  return (
    <React.Fragment>
      
      
      <AlertDialogSlide handleCancelAlert={handleCancelAlert} handleClose={handleCloseAlert} open={openAlert} title={title} message={message}/>

      <CustomizedSnackbars handleClose={handleClose} open={open} severity={severity} message={message} />
        

       <Title>Book New Ticket</Title>
      <Grid alignItems="center" container spacing={2}>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <TextField name="name" onChange={handleInput} focused label="Enter Name"/>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <TextField name="phone" onChange={handleInput} type="phone" label="Enter Phone"/>
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={price}
              label="Price"
              onChange={handleChange}
            >
              <MenuItem value={200}>200</MenuItem>
              <MenuItem value={300}>300</MenuItem>
              <MenuItem value={400}>400</MenuItem>
              <MenuItem value={500}>500</MenuItem>
            </Select>           
          </Grid>
          <Grid item xl={3} lg={3} md={3} sm={6} xs={12}>
          <Button  variant="contained" 
            color="primary" onClick={generateTikcet} >Generate Ticket</Button>               
          </Grid>
      </Grid>

      <Grid item display={'flex'} justifyContent={'space-between'}>
        <Title>Sold Tickets</Title>  
        <Title>{tickets.length}</Title>
      </Grid>

      <Grid item display={'flex'} justifyContent={'space-between'}>
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Ticket"
          inputProps={{ 'aria-label': 'Search Ticket' }}
        />
        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Grid>
      


      <Grid alignItems="center" spacing={2}>
      {tickets && tickets.map((row,id) => (
            <Card sx={{ minWidth: 275 , marginBottom: 2}} key={row.id}>
            <CardContent>
              <Grid item display={'flex'} justifyContent={'space-between'}>
              <div>
                <Typography color="text.secondary" gutterBottom>
                Date
                </Typography>
                <Typography >
                {moment(row.created_at).format('MMM DD YYYY, h:mm a')} 
                </Typography>
              </div>
              <div>
                <Typography color="text.secondary" gutterBottom>
                Name
                </Typography>
                <Typography >
                {row.ticket_owner ? row.ticket_owner:'No Name'}
                </Typography>
              </div>
              </Grid>
              <Grid item display={'flex'} justifyContent={'space-between'}>
              <div>
                <Typography color="text.secondary" gutterBottom>
                  Price
                </Typography>
                <Typography >
                {row.price}
                </Typography>
              </div>
              <div>
                <Typography color="text.secondary" gutterBottom>
                  Status
                </Typography>
                <Typography >
                {row.scaned_status ? 'Closed':'Open'}
                </Typography>
              </div>   
              <div>
                <Typography color="text.secondary" gutterBottom>
                  Link
                </Typography>
                <CopyToClipboard text={`${baseURL}/tickets/${row.id}`} >
                      <Button onClick={copyLink}><ContentCopyIcon /></Button>
              </CopyToClipboard>
              </div>     
              </Grid>
            </CardContent>
          </Card>
        ))}
      </Grid>
      

     
      
      <Stack spacing={2} >
      <Pagination count={5} variant="outlined" color="primary" onClick={(e)=>console.log(e.target.dataset) }/>
    </Stack>
    </React.Fragment>
  );
}


/**
 * <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
 *  <Table sx={{ minWidth: 650 }} size="small">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tickets && tickets.map((row,id) => (
            <TableRow key={row.id}>
              <TableCell>{moment(row.created_at).format('MMMM Do YYYY, h:mm:ss a')}</TableCell>
              <TableCell>{row.ticket_owner ? row.ticket_owner:'No Name'}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.scaned_status ? 'Closed':'Open'}</TableCell>
              <TableCell>
              <CopyToClipboard text={`${baseURL}/tickets/${row.id}`} >
                <Button onClick={copyLink}><ContentCopyIcon /></Button>
              </CopyToClipboard>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
 * 
 * 
 * 
 * 
 * 
 * 
 *   const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #1976d2',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

///onClose={handleClose}
 * const [modal, setModal] = React.useState(false)
  

  const handleShow = (e)=>{
    setModal(e=> !e )
  }
 * <Button onClick={handleShow}>Open modal</Button>
 * 
 *       <Modal
        open={modal}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
  <Box sx={{ ...style,width: 400 }} justifyContent='center'>
    <h2 id="parent-modal-title">Text in a modal</h2>
    <p id="parent-modal-description">
      Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
    </p>
    <Button variant="contained"  
            color="primary" onClick={handleShow}>Close</Button>
  </Box>
</Modal>
 */







