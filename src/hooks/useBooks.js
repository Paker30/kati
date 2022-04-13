import { useState, useEffect, useContext, useCallback } from 'react';
import { fetchAll, insertBook } from '../services/books';
import BooksContext from '../context/books';

const formatBook = ({ id, key, doc }) => ({ id, key, author: doc.author, title: doc.title })

export const useBooks = () => {
    const [loading, setLoading] = useState(false);
    const { books, setBooks } = useContext(BooksContext)

    useEffect(() => {
        setLoading(true);
        fetchAll()
            .then((books) => {
                setLoading(false);
                setBooks(books.map(formatBook));
            })
            .catch((error) => {
                setLoading(false);
                setBooks([]);
            });
    }, [setBooks]);

    const addBook = useCallback((book) => {
        setLoading(true);
        insertBook(book)
            .then(() => {
                setBooks((books) => [...books, book]);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setLoading(false);
            });
    }, [setBooks]);

    return { loading, books, addBook };
};