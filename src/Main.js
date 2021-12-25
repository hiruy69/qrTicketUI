import React from 'react';
import { Navigate } from 'react-router-dom';



function Main() { 

    const rememberMe = localStorage.getItem('access_token')
    
    
 
  return (
    rememberMe
      ? <Navigate to="/home" replace />
      : <Navigate to="/login" replace />
  );
}


export default Main;