import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {Select,MenuItem,  Grid, TextField, Button } from '@mui/material';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CopyToClipboard from 'react-copy-to-clipboard'
import AlertDialogSlide from './AlertDialogSlide';
import CustomizedSnackbars from './CustomizedSnackbars';
import instance from './axiosConfig'
import moment from 'moment'






function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');
  const [message, setMessage] = React.useState('');
  const [severity, setSeverity] = React.useState('info');
  const [openAlert, setOpenAlert] = React.useState(false)

  const [price, setPrice] = React.useState(200)
  const [name, setName] = React.useState('')
  const [phone, setPhone] = React.useState('')

  const [tickets, setTickets] = React.useState([])
  const [page, setPage] = React.useState(1)

  const baseURL = window.location.origin

  const getTickest = ()=>{
    instance.post('ticketspg',{id:page}).then(res=>
      {
        setTickets(res.data.ticket.data)
        console.log(res.data.ticket.data)
      }
      ).catch(err=>console.log(err))
  }

  React.useEffect(()=>{
    getTickest()
  },[])


  const handleClose = () => {
    
    setOpen(false);
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
      setMessage('Are you sure you want to create New Ticket?')
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
      
      
      <AlertDialogSlide handleClose={handleCloseAlert} open={openAlert} title={title} message={message}/>

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
      
      <Title>Sold Tickets</Title>
      <Table size="small">
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
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more orders
      </Link>
    </React.Fragment>
  );
}


/**
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