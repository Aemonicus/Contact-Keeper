import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom';
import { AuthContext } from "../../context/auth/authContext"
import Spinner from '../../components/layout/Spinner';

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext)

  const { isAuthenticated, loading } = authContext

  if (loading) return <Spinner />
  if (isAuthenticated) return <Component />;

  return <Navigate to='/login' />;

}
