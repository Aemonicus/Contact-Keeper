import React, { useReducer } from 'react'
import axios from 'axios'
import { AuthContext } from './authContext'
import { authReducer } from './authReducer'
import { setAuthToken } from '../../utils/setAuthToken'
import { REGISTER_SUCCESS, REGISTER_FAIL, CLEAR_ERRORS, USER_LOADED, AUTH_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, LOGOUT } from '../types'

export const AuthState = props => {
  const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: true,
    error: null,
    user: null
  }

  const [ state, dispatch ] = useReducer(authReducer, initialState)


  const register = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post("/api/users", formData, config)

      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (error) {
      console.error(error)
      dispatch({
        type: REGISTER_FAIL,
        payload: error.response.data.msg
      })
    }
  }


  const loadUser = async () => {

    if (localStorage.token) {
      setAuthToken(localStorage.token)
    }

    try {
      const res = await axios.get("/api/auth")

      dispatch({
        type: USER_LOADED,
        payload: res.data
      })

      loadUser()
    } catch (error) {
      dispatch({
        type: AUTH_ERROR
      })
    }
  }


  const login = async formData => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
    }

    try {
      const res = await axios.post("/api/auth", formData, config)

      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data
      })
      loadUser()
    } catch (error) {
      console.error(error)
      dispatch({
        type: LOGIN_FAIL,
        payload: error.response.data.msg
      })
    }
  }


  const logout = () => {
    dispatch({
      type: LOGOUT
    })
  }


  const clearErrors = () => {
    dispatch({
      type: CLEAR_ERRORS
    })
  }

  return (
    <AuthContext.Provider
      value={{
        token: state.token,
        isAuthenticated: state.isAuthenticated,
        loading: state.loading,
        error: state.error,
        user: state.user,
        register,
        login,
        loadUser,
        logout,
        clearErrors

      }}>
      {props.children}
    </AuthContext.Provider>
  )
}