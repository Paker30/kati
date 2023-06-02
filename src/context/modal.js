import React, { useState } from 'react';

const Context = React.createContext({});

export const ModalContextProvider = ({ children }) => {
    const [ showModal, setModal ] = useState(false);

    return <Context.Provider value={{ showModal, setModal }}>
        {children}
    </Context.Provider>
}

export default Context;