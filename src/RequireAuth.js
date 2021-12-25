
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
    const  authed  = true  //localStorage.getItem('access_token')
    console.log('RequireAuth')
    return authed 
      ? children
      : <Navigate to="/login" replace />;
  }
