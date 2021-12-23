
import { Navigate } from 'react-router-dom'

export function RequireAuth({ children }) {
    const  authed  = true
    return authed === true
      ? children
      : <Navigate to="/login" replace />;
  }
