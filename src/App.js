import React from 'react';
//import {Container, Card, CardContent,  Grid, TextField, Button} from '@mui/material';
//import {makeStyles,} from '@mui/material/';
//import QRCode from 'qrcode';
//import QrReader from 'react-qr-reader';
//import QRScan from 'qrscan';
//import ReactiveQR from "reactive-qr";
//import QrCodeScanner from '@sensorfactdev/qr-code-scanner';
//import BarcodeScannerComponent from "react-qr-barcode-scanner";
import SignIn from './SignIn';
//import Orders from './Orders';
import Pricing from './Pricing';
import ScanTicket from './ScanTicket'
import Dashboard from './Dashboard'
import {RequireAuth} from './RequireAuth'
//import { Navigate } from 'react-router-dom'
import  Main  from "./Main";

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//import { SickOutlined } from '@mui/icons-material';

//import  { Redirect } from 'react-router-dom'


function App() { 
/*   const [text, setText] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [scanResultFile, setScanResultFile] = useState('');
  const [scanResultWebCam, setScanResultWebCam] =  useState('');
  //const classes = useStyles();
  const qrRef = useRef(null); */

  /* const rememberMe = localStorage.getItem('access_token')

  const [data, setData] = React.useState("Not Found"); */

  //const navigate = useNavigate();

  
  
/* 
  const handleScanResult = result => {
    console.log(result);
  }
  const generateQrCode = async () => {
    try {
          const response = await QRCode.toDataURL(text);
          setImageUrl(response);
    }catch (error) {
      console.log(error);
    }
  }
  const handleErrorFile = (error) => {
    console.log(error);
  }
  const handleScanFile = (result) => {
      if (result) {
          setScanResultFile(result);
      }
  }
  const onScanFile = () => {
    qrRef.current.openImageDialog();
  }
  const handleErrorWebCam = (error) => {
    console.log(error);
  }
  const handleScanWebCam = (result) => {
    if (result){
        setScanResultWebCam(result);
    }
   } */
  return (
    <Router>
      <Routes>
         <Route exact path="/" element={
              <RequireAuth>
                <Main />
              </RequireAuth>
            }>
            </Route>
          <Route path="/scanticket" element={
            <RequireAuth>
               <ScanTicket />
            </RequireAuth>
          }>
            
          </Route>
          <Route path="/tickets/:id" element={
               <Pricing />
          }>
            
          </Route>
          <Route path="/home" element={
            <RequireAuth>
               <Dashboard />
            </RequireAuth>
          }/>

          <Route path="/login" element={
            <SignIn />
          }/>
        </Routes>
        
        
    </Router>
  );
}

/*  {rememberMe && <Navigate to='/login'  /> }
       



{rememberMe ?  <Navigate to="/home" replace /> : <Navigate to="/home" replace />}
const useStyles = makeStyles((theme) => ({
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
})); 



          <Card>

          <BarcodeScannerComponent
        width={500}
        height={500}
        onUpdate={(err, result) => {
          if (result) setData(result.text);
          else setData("Not Found");
        }}
      />
      <p>{data}</p>

              <ReactiveQR onCode={code => console.log(code)} />  
              <h2 >Generate Download & Scan QR Code with React js</h2>
              <input type="file" name="image" accept="image/*" capture="environment" />

              <input type="file" name="image" accept="image/*" capture="user" />

              <CardContent>
                  <Grid container spacing={2}>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                          <TextField label="Enter Text Here" onChange={(e) => setText(e.target.value)}/>
                          <Button  variant="contained" 
                            color="primary" onClick={() => generateQrCode()}>Generate</Button>
                            <br/>
                            <br/>
                            <br/>
                            {imageUrl ? (
                              <a href={imageUrl} download>
                                  <img src={imageUrl} alt="img"/>
                              </a>) : null}
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                        <Button  variant="contained" color="secondary" onClick={onScanFile}>Scan Qr Code</Button>
                        <QrReader
                          ref={qrRef}
                          delay={300}
                          style={{width: '100%'}}
                          onError={handleErrorFile}
                          onScan={handleScanFile}
                          legacyMode
                        />
                        <h3>Scanned Code: {scanResultFile}</h3>
                      </Grid>
                      <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
                         <h3>Qr Code Scan by Web Cam</h3>
                         <QrReader
                         delay={300}
                         style={{width: '100%'}}
                         onError={handleErrorWebCam}
                         onScan={handleScanWebCam}
                         />
                         <h3>Scanned By WebCam Code: {scanResultWebCam}</h3>
                      </Grid>
                  </Grid>
              </CardContent>
          </Card>


*/
export default App;