import { useState, useEffect, useCallback } from 'react';
import { useBooks } from 'hooks/useBooks';
import { get, update } from 'services/books';

export default function useSingleGif({ id }) {
    const { books } = useBooks();
    const bookFromCache = books.find((book) => book.id === id);

    const [book, setBook] = useState(bookFromCache);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (!book) {
            setIsLoading(true);
            get(id)
                .then((book) => {
                    setIsLoading(false);
                    setBook(book);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    }, [book, id]);

    const setRead = useCallback(
        (isReaded) => update({ ...book, _id: book.id, _rev: book._rev, isReaded })
            .then(({ rev }) => setBook((previousBook) => ({ ...previousBook, isReaded, _rev: rev })))
    );

    return { book, isLoading, setRead };
};