import React, { useState } from 'react';

const Context = React.createContext({});

export const CredentialsContextProvider = ({ children }) => {
    const [ credentials, setCredentials ] = useState({});

    return <Context.Provider value={{ credentials, setCredentials }}>
        {children}
    </Context.Provider>
}

export default Context;