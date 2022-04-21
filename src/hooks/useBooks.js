import { useState, useEffect, useContext, useCallback } from 'react';
import { getAll, insertBook, getBy } from '../services/books';
import BooksContext from '../context/books';

const formatBook = ({ id, key, doc, author, title }) => ({ id, key, ...doc });

export const useBooks = ({ keyword, category} = { keyword: null }) => {
    const [loading, setLoading] = useState(false);
    const { books, setBooks } = useContext(BooksContext);

    const keywordToUse = keyword || localStorage.getItem('lastKeyword');

    useEffect(() => {
        setLoading(true);
        const query = category ? getBy[category]({keyword: keywordToUse}) : getAll();
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
    }, [setBooks, keyword, category, keywordToUse]);

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