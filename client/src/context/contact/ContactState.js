import React, { useReducer } from 'react'
import { v4 as uuidv4 } from "uuid";
import { ContactContext } from './contactContext'
import { contactReducer } from './contactReducer'
import { ADD_CONTACT, DELETE_CONTACT, SET_CURRENT, CLEAR_CURRENT, UPDATE_CONTACT, FILTER_CONTACT, CLEAR_FILTER } from '../types'

export const ContactState = props => {
  const initialState = {
    contacts: [
      {
        id: 1,
        name: "toto",
        email: "toto@gmail.com",
        phone: "01010101",
        type: "personal"
      },
      {
        id: 2,
        name: "tata",
        email: "tata@gmail.com",
        phone: "01010101",
        type: "professional"
      },
      {
        id: 3,
        name: "tutu",
        email: "tutu@gmail.com",
        phone: "01010101",
        type: "personal"
      }
    ],
    current: null,
    filtered: null
  }

  const [ state, dispatch ] = useReducer(contactReducer, initialState)

  const addContact = contact => {
    contact.id = uuidv4();
    dispatch({ type: ADD_CONTACT, payload: contact })
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