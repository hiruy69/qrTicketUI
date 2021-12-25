
import { Navigate } from 'react-router-dom';

export function RequireAuth({ children }) {
    const  authed  = localStorage.getItem('access_token')
    return authed 
      ? children
      : <Navigate to="/login" replace />;
  }
