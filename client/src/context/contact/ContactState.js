import React, { useReducer } from 'react'
import axios from 'axios'
import { ContactContext } from './contactContext'
import { contactReducer } from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER, CONTACT_ERROR } from '../types'

export const ContactState = props => {
  const initialState = {
    contacts: [],
    current: null,
    filtered: null
  }

  const [ state, dispatch ] = useReducer(contactReducer, initialState)

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

  const deleteContact = id => {
    dispatch({ type: DELETE_CONTACT, payload: id })
  }

  const setCurrent = contact => {
    dispatch({ type: SET_CURRENT, payload: contact })
  }

  const clearCurrent = () => {
    dispatch({ type: CLEAR_CURRENT })
  }

  const updateContact = contact => {
    dispatch({ type: UPDATE_CONTACT, payload: contact })
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
        addContact,
        deleteContact,
        setCurrent,
        clearCurrent,
        updateContact,
        filterContact,
        clearFilter
      }}>
      {props.children}
    </ContactContext.Provider>
  )
}