import { useContext, useCallback } from 'react';
import { getAll, insert, getBy, update, remove } from '../services/books';
import BooksContext, { ACTIONS } from '../context/books';

const formatBook = ({ id, key, doc, author, title }) => ({ id, key, ...doc });
const mergeBooks = (books) => (newBook) => {
    if (!books.find(({ id }) => id === newBook.id)) {
        return [...books, newBook];
    }
    return [...books.filter(({ id }) => id !== newBook.id), newBook];
};

export const useBooks = ({ keyword, category } = { keyword: null }) => {
    const { books, isLoading: loading, dispatch } = useContext(BooksContext);

    const keywordToUse = keyword || localStorage.getItem('lastKeyword');

    const loadBooks = () => {
        dispatch({
            type: ACTIONS.START_ADDING_BOOKS
        });
        const query = category ? getBy[category]({ keyword: keywordToUse }) : getAll();
        query
            .then((books) => {
                dispatch({
                    type: ACTIONS.END_ADDING_BOOKS,
                    payload: books.map(formatBook)
                });
                localStorage.setItem('lastKeyword', keyword)
            })
            .catch((error) => {
                console.error(error);
                dispatch({
                    type: ACTIONS.ERROR_ADDING_BOOKS,
                });
            });
    };

    const addBook = useCallback((book) => {
        dispatch({
            type: ACTIONS.START_ADDING_BOOKS
        });
        return insert(book)
            .then((added) => {
                dispatch({
                    type: ACTIONS.END_ADDING_BOOKS,
                    payload: [...books, book]
                });
                return added;
            })
            .catch((error) => {
                console.error(error);
                dispatch({
                    type: ACTIONS.ERROR_ADDING_BOOKS,
                });
            });
    }, [books, dispatch]);

    const removeBook = useCallback((book) => {
        dispatch({
            type: ACTIONS.START_ADDING_BOOKS
        });
        return remove(book)
            .then(() => {
                const index = books.findIndex(({ _id }) => _id === book._id)
                dispatch({
                    type: ACTIONS.END_ADDING_BOOKS,
                    payload: books.toSpliced(index, 1)
                });
                return book;
            })
            .catch((error) => {
                console.error(error);
                dispatch({
                    type: ACTIONS.ERROR_ADDING_BOOKS,
                });
            });
    }, [books, dispatch]);

    const populateBooks = useCallback((books) => dispatch({
        type: ACTIONS.END_ADDING_BOOKS,
        payload: books.map(formatBook)
    }), [dispatch]);

    const setRead = useCallback((id) => {
        const book = books.find((book) => book.id === id);
        dispatch({
            type: ACTIONS.START_ADDING_BOOKS
        });
        return update({ ...book, isRead: !book.isRead })
            .then((updated) => {
                const updatedBooks = books.map((book) => {
                    if (book.id === id) {
                        return { ...book, isRead: !book.isRead, _rev: updated.rev }
                    }
                    return book;
                });
                dispatch({
                    type: ACTIONS.END_ADDING_BOOKS,
                    payload: updatedBooks
                });
                return updated;
            })
            .catch((error) => {
                console.error(error);
                dispatch({
                    type: ACTIONS.ERROR_ADDING_BOOKS,
                });
            });
    }, [dispatch, books]);

    return { loading, books, addBook, removeBook, populateBooks, setRead, loadBooks, ACTIONS, dispatch };
};