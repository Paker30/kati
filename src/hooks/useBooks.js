import { useState, useEffect, useContext, useCallback } from 'react';
import { getAll, insert, getBy, update } from '../services/books';
import BooksContext from '../context/books';

const formatBook = ({ id, key, doc, author, title }) => ({ id, key, ...doc });
const mergeBooks = (books) => (newBook) => {
    if (!books.find(({ id }) => id === newBook.id)) {
        return [...books, newBook];
    }
    return [...books.filter(({ id }) => id !== newBook.id), newBook];
};

export const useBooks = ({ keyword, category } = { keyword: null }) => {
    const [loading, setLoading] = useState(false);
    const { books, setBooks } = useContext(BooksContext);

    const keywordToUse = keyword || localStorage.getItem('lastKeyword');

    const loadBooks = () => {
        setLoading(true);
        const query = category ? getBy[category]({ keyword: keywordToUse }) : getAll();
        query
            .then((books) => {
                setLoading(false);
                setBooks(books.map(formatBook));
                localStorage.setItem('lastKeyword', keyword)
            })
            .catch((error) => {
                setLoading(false);
                setBooks([]);
            });
    };

    const addBook = useCallback((book) => {
        setLoading(true);
        return insert(book)
            .then((added) => {
                setLoading(false);
                setBooks((books) => [...books, book]);
                return added;
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [setBooks]);

    const populateBooks = useCallback((books) => setBooks(books.map(formatBook)), [books, setBooks]);

    const setRead = useCallback((id) => {
        const book = books.find((book) => book.id === id);
        return update({ ...book, isRead: !book.isRead })
            .then((updated) => {
                const updatedBooks = books.map((book) => {
                    if (book.id === id) {
                        return { ...book, isRead: !book.isRead, _rev: updated.rev }
                    }
                    return book;
                });
                setBooks(updatedBooks);
                return updated;
            });
    });

    return { loading, books, addBook, populateBooks, setRead, loadBooks };
};