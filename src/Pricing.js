import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import StarIcon from '@mui/icons-material/StarBorder';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import GlobalStyles from '@mui/material/GlobalStyles';
import Container from '@mui/material/Container';

import QRCode from 'qrcode';
import moment from 'moment';
import { useParams } from "react-router-dom";

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const tiers = [
  
  {
    title: 'Enterprise',
    price: '30',
    description: [
      '50 users included',
      '30 GB of storage',
      'Help center access',
      'Phone & email support',
    ],
    buttonText: 'Contact us',
    buttonVariant: 'outlined',
  },
];


const ppp = "data:imagepng;base64,iVBORw0KGgoAAAANSUhEUgAAAHQAAAB0CAYAAABUmhYnAAACm0lEQVR4nO2YQY7jMBAD/f9P756jAeIhSFltThWQk2I2W+VDkOsfVHGdLgBZEFoGQstAaBkILQOhZSC0DISWgdAyEFoGQstAaBkILQOhZSC0DFvodV2PftQ+7ven7Xe7jx0wbGGEugHDFkaoGzBsYYS6AeFC6Xz3Qqfv9yNvWqF0PkIPF0rnI/RwoXQ+QsOFdl+omufmP72fCkIRqhVCKEKj+en+T++nUifU7TttPxWEDt9PBaHD91NB6PD9VP680PR8hCIUocq52mfafioIRejeQmr+6XMXhA47d0HosHMXhA47dxkvdPfnbv7u86f3k33YAQhFKEIRitDf+rATDuO+AOkLPc3rN0DoJ6/fAKGfvH4DhH4y7s9598Jdwaf7uyB0WH8XhA7r74LQYf1dxv0K2H3B6rx0P3f+bT87IQxCPRCK0L0g1ONxobuFuRfoCnb7uSBUPE/3TYNQ8TzdNw1CxfN03zTHfxSlhbjfd/ueFozQcF+EIhShCP3SL73g3bn7/d0X6L4w6XwVhIr7pPdLg1Bxn/R+aRAq7pPeL83xH0UuaQHuC+HOs+/DTjgMQpd5dsJhELrMsxMOg9Blnh0QvqD0wnfPq+e7+7ggFKFLAEKjfVwQitAlYHfB8IU//QK6L5R8X3YAQhGazEfokmcHIPRvCd298O7z0/NUEIrQJQChW+epIBShS8AwoWlB6vNuHxeEInQJQChCEbqPOqHpvipPC/wx3w5AaPR5F4SaeennXRBq5qWfd3n9n/On+93Ne3y+HYDQr/MQGs5HqBqA0K/zXi909+duvtrXzVPZnm8HIFQCoQjV8u0AhEqMFwqzQGgZCC0DoWUgtAyEloHQMhBaBkLLQGgZCC0DoWUgtAyEloHQMhBaxn+82YKbqzSRJwAAAABJRU5ErkJggg=="
const imgStyle = {
  padding: '1px',
  margin: '1px'
}
function PricingContent() {

  const [imageUrl, setImageUrl] = React.useState(ppp);
  const { id } = useParams();

  const opts = {
    errorCorrectionLevel: 'Q',
    type: 'image/png',
    width : 300,
    margin: 1,
    
  }

  function Copyright(props) {
    return (
      <Typography variant="body2" color="text.secondary" align="center" {...props}>
        {'Copyright © '}
        <Link color="inherit" href="https://mui.com/">
          Your Website
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
  }
  
  const generateQrCode = async () => {
    try {
          //setText(moment())
          const now = moment().format('HH:mm:ss');
          //const news = JSON.stringify({'h':600,'m':800,s:'67'})
          const response = await QRCode.toDataURL(id,opts);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  generateQrCode()
  return (
    <React.Fragment>
      <GlobalStyles styles={{ ul: { margin: 30, padding: 0, listStyle: 'none' } }} />
      <CssBaseline />

      <Container style={{ marginTop: 10 }} maxWidth="md" component="main">
        <Grid container spacing={6} alignItems="flex-center">
          {tiers.map((tier) => (
            // Enterprise card is full width at sm breakpoint
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === 'Enterprise' ? 12 : 6}
              md={6}
            >
              <Card>
                <CardHeader
                  title={tier.title + id}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: 'center' }}
                  action={tier.title === 'Pro' ? <StarIcon /> : null}
                  subheaderTypographyProps={{
                    align: 'center',
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === 'dark'
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'baseline',
                      mb: 2,
                    }}
                  >
                     <img
                        src={imageUrl}
                        alt={tier.title}
                        loading="lazy"
                        style={imgStyle}
                      />
                  </Box>
                 
                </CardContent>
                <CardActions>
                  <Button fullWidth variant={tier.buttonVariant}>
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </React.Fragment>
  );
}

export default function Pricing() {
  return <PricingContent />;
}


