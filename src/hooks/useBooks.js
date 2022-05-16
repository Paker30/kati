import { useState, useEffect, useContext, useCallback } from 'react';
import db from '../services/database';
import BooksContext from '../context/books';

export const useBooks = ({ keyword, category} = { keyword: null }) => {
    const [loading, setLoading] = useState(false);
    const { books, setBooks } = useContext(BooksContext);

    const keywordToUse = keyword || localStorage.getItem('lastKeyword');

    useEffect(() => {
        setLoading(true);
        // const query = category ? getBy[category]({keyword: keywordToUse}) : db.then((store) =>store.getAll('books'));
        db.then((store) =>store.getAll('books'))
            .then((books) => {
                setLoading(false);
                setBooks(books);
                localStorage.setItem('lastKeyword', keyword)
            })
            .catch((error) => {
                setLoading(false);
                setBooks([]);
            });
    }, [setBooks, keyword, category, keywordToUse]);

    const addBook = useCallback((book) => {
        setLoading(true);
        db.then((store) => {
            store.add('books', book)
                .then(() => {
                    setBooks((books) => [...books, book]);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                    setLoading(false);
                });
        })
    }, [setBooks]);

    return { loading, books, addBook };
};