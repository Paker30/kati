import { useState, useEffect, useCallback } from 'react';
import { useBooks } from 'hooks/useBooks';
import db from 'services/database';

export default function useSingleGif({ id }) {
    const { books } = useBooks();
    const bookFromCache = books.find((book) => book.id === id);

    const [book, setBook] = useState(bookFromCache);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!book) {
            setIsLoading(true);
            db.then((store) => store.get('books', id))
                .then((book) => {
                    setIsLoading(false);
                    setBook(book);
                })
                .catch((error) => {
                    console.error(error);
                    setIsLoading(false);
                });
        }
    }, [book, id]);

    const setRead = useCallback(
        (read) => {
            return db
                .then((store) => store.put('books', { ...book, read }))
                .then(() => {
                    setBook((previousBook) => {
                        return { ...previousBook, read }
                    })
                })
        }
    );

    return { book, isLoading, setRead };
};