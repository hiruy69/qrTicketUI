import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import {Select,MenuItem,  Grid, TextField, Button} from '@mui/material';


// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}




const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

function preventDefault(event) {
  event.preventDefault();
}

export default function Orders() {
  const [price, setPrice] = React.useState(200)
  const [name, setName] = React.useState(200)
  const [phone, setPhone] = React.useState(200)
  

  const handleChange = (e)=>{
    console.log(e.target)
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
            color="primary" onClick={()=>{console.log(phone,name)}} >Generate Ticket</Button>               
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
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.date}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.shipTo}</TableCell>
              <TableCell>{row.paymentMethod}</TableCell>
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
