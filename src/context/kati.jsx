import React, { useReducer, useMemo } from 'react';

const Context = React.createContext({});
export const ContextData = React.createContext({});
export const ContextAPI = React.createContext({});

export const ACTIONS = {
    START_ADDING_BOOKS: 'start_adding_books',
    END_ADDING_BOOKS: 'end_adding_books',
    ERROR_ADDING_BOOKS: 'error_adding_books',
    SET_CREDENTIALS: 'set_credentials',
    SHOW_MODAL: 'show_modal',
    HIDE_MODAL: 'hide_modal'
};

const ACTIONS_REDUCERS = {
    [ACTIONS.START_ADDING_BOOKS]: (state, { payload }) => ({
        ...state,
        isLoading: true
    }),
    [ACTIONS.END_ADDING_BOOKS]: (state, { payload }) => ({
        ...state,
        isLoading: false,
        books: payload
    }),
    [ACTIONS.ERROR_ADDING_BOOKS]: (state, { payload }) => ({
        ...state,
        isLoading: false,
        books: [],
        error: payload
    }),
    [ACTIONS.SHOW_MODAL]: (state) => ({
        ...state,
        showModal: true
    }),
    [ACTIONS.HIDE_MODAL]: (state) => ({
        ...state,
        showModal: false
    }),
    [ACTIONS.SET_CREDENTIALS]: (state, { payload }) => ({
        ...state,
        credentials: payload
    })
};

const reducer = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.type];
    return actionReducer ? actionReducer(state, action) : state;
};

export const KatiContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, {
        books: [],
        isLoading: false,
        showModal: false,
        credentials: {}
    });

    const data = useMemo(() => ({
        books: state.books,
        isLoading: state.isLoading,
        showModal: state.showModal,
        credentials: state.credentials
    }), [state]);

    const API = useMemo(() => ({
        openModal: () => dispatch({ type: ACTIONS.SHOW_MODAL }),
        closeModal: () => dispatch({ type: ACTIONS.HIDE_MODAL }),
        startAddingBook: () => dispatch({ type: ACTIONS.START_ADDING_BOOKS }),
        endAddingBook: (books) => dispatch({ type: ACTIONS.END_ADDING_BOOKS, payload: books }),
        errorAddingBook: (error) => dispatch({ type: ACTIONS.ERROR_ADDING_BOOKS, payload: error }),
        setCredentials: (credentials) => dispatch({ type: ACTIONS.SET_CREDENTIALS, payload: credentials }),
    }), []);

    return <ContextData.Provider value={data}>
        <ContextAPI.Provider value={API}>
            {children}
        </ContextAPI.Provider>
    </ContextData.Provider>
}

export default Context;