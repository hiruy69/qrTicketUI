import React from 'react';
import { Navigate } from 'react-router-dom';



function Main() { 

    const rememberMe = true //localStorage.getItem('access_token')
    console.log('Main',rememberMe)
    
 
  return (
    rememberMe
      ? <Navigate to="/home" replace />
      : <Navigate to="/login" replace />
  );
}


export default Main;