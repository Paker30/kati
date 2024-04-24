import React, { useReducer } from 'react';

const Context = React.createContext({});

export const ACTIONS = {
    START_ADDING_BOOKS: 'start_adding_books',
    END_ADDING_BOOKS: 'end_adding_books',
    ERROR_ADDING_BOOKS: 'error_adding_books'
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
    })
};

const reducer = (state, action) => {
    const actionReducer = ACTIONS_REDUCERS[action.type];
    return actionReducer ? actionReducer(state, action) : state;
};

export const BooksContextProvider = ({ children }) => {
    const [{ books, isLoading, error }, dispatch] = useReducer(reducer, {
        books: [],
        isLoading: false
    });

    return <Context.Provider value={{ books, isLoading, error, dispatch }}>
        {children}
    </Context.Provider>
}

export default Context;