import React, { useReducer } from 'react'
import axios from 'axios'
import { ContactContext } from './contactContext'
import { contactReducer } from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR, GET_CONTACTS, CLEAR_CONTACTS } from '../types'

export const ContactState = props => {
  const initialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
  }

  const [ state, dispatch ] = useReducer(contactReducer, initialState)

  const getContacts = async () => {

    try {
      const res = await axios.get("/api/contacts")
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })

    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }

  }


  const addContact = async contact => {
    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.post("/api/contacts", contact, config)
      dispatch({
        type: ADD_CONTACT,
        payload: res.data
      })

    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }

  }

  const deleteContact = async id => {
    try {
      await axios.delete(`/api/contacts/${id}`)

      dispatch({
        type: DELETE_CONTACT,
        payload: id
      })

    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }


  const updateContact = async contact => {

    const config = {
      headers: {
        "Content-Type": "application/json"
      }
    }

    try {
      const res = await axios.put(`/api/contacts/${contact._id}`, contact, config)
      dispatch({
        type: UPDATE_CONTACT,
        payload: res.data
      })

    } catch (error) {
      dispatch({
        type: CONTACT_ERROR,
        payload: error.response.msg
      })
    }
  }

  const clearContacts = () => {
    dispatch({ type: CLEAR_CONTACTS })
  }

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const filterContact = text => {
    dispatch({ type: FILTER_CONTACT, payload: text })
  }

  const clearFilter = () => {
    dispatch({ type: CLEAR_FILTER })
  }

  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter,
        getContacts,
        clearContacts
      }}>
      {props.children}
    </ContactContext.Provider>
  )
}