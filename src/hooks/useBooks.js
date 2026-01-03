import { useCallback } from 'react';
import { getAll, insert, getBy, update, remove } from '../services/books';
import {useData} from './useData';
import {useAPI} from './useAPI';

const formatBook = ({ id, key, doc, author, title }) => ({ id, key, ...doc });
const mergeBooks = (books) => (newBook) => {
    if (!books.find(({ id }) => id === newBook.id)) {
        return [...books, newBook];
    }
    return [...books.filter(({ id }) => id !== newBook.id), newBook];
};

export const useBooks = ({ keyword, category } = { keyword: null }) => {
    const { books, isLoading: loading} = useData();
    const { startAddingBook, endAddingBook, errorAddingBook } = useAPI();

    const keywordToUse = keyword || localStorage.getItem('lastKeyword');

    const loadBooks = useCallback(() => {
        startAddingBook();
        const query = category ? getBy[category]({ keyword: keywordToUse }) : getAll();
        query
            .then((books) => {
                endAddingBook(books.map(formatBook));
                localStorage.setItem('lastKeyword', keyword)
            })
            .catch((error) => {
                console.error(error);
                errorAddingBook(error);
            });
    }, [category, endAddingBook, errorAddingBook, keywordToUse, startAddingBook, keyword]);

    const addBook = useCallback((book) => {
        startAddingBook();
        return insert(book)
            .then((added) => {
                endAddingBook([...books, book]);
                return added;
            })
            .catch((error) => {
                console.error(error);
                errorAddingBook(error);
            });
    }, [books, endAddingBook, errorAddingBook, startAddingBook]);

    const removeBook = useCallback((book) => {
        startAddingBook();
        return remove(book)
            .then(() => {
                const index = books.findIndex(({ _id }) => _id === book._id)
                endAddingBook(books.toSpliced(index, 1));
                return book;
            })
            .catch((error) => {
                console.error(error);
                errorAddingBook(error);
            });
    }, [books, errorAddingBook, startAddingBook, endAddingBook]);

    const populateBooks = useCallback((books) => endAddingBook(books.map(formatBook)), [endAddingBook]);

    const setRead = useCallback((id) => {
        const book = books.find((book) => book.id === id);
        startAddingBook();
        return update({ ...book, isRead: !book.isRead })
            .then((updated) => {
                const updatedBooks = books.map((book) => {
                    if (book.id === id) {
                        return { ...book, isRead: !book.isRead, _rev: updated.rev }
                    }
                    return book;
                });
                endAddingBook(updatedBooks);
                return updated;
            })
            .catch((error) => {
                console.error(error);
                errorAddingBook(error);
            });
    }, [startAddingBook, endAddingBook, errorAddingBook, books]);

    return { loading, books, addBook, removeBook, populateBooks, setRead, loadBooks, startAddingBook, errorAddingBook };
};