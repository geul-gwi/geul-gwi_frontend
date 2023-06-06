import { faHourglassEmpty } from '@fortawesome/free-solid-svg-icons';
import React, { useContext } from 'react'
import { useState } from 'react';

export const userStoreContext = React.createContext({
    loggedUser : {
            userid : '',
            email : '',
            name : ''
    },
    loggedIn : false,
    setLoggedUser : () => {},
    setLoggedIn : () => {}
});

const UserStore = ({children}) => {
    const setLoggedUser = (data) => {
        setState(prevState => (
            {
                ...prevState,
                loggedUser : data
            }
        ))
    }

    const setLoggedIn = () => {
        setState(prevState => (
            {
                ...prevState,
                loggedIn : !prevState.loggedIn 
            }
        ))
    }

    const initialState = {
        loggedUser : {},
        loggedIn : false,
        setLoggedUser,
        setLoggedIn
    }

    const [state, setState] = useState(initialState)

    return (
        <userStoreContext.Provider value={state}>
            {children}
        </userStoreContext.Provider>
    );
};

export default UserStore;

