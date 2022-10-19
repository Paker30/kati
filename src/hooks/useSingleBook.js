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
        (isRead) => update({ ...book, isRead })
            .then((updated) => {
                setBook((previousBook) => ({ ...previousBook, isRead, _rev: updated.rev }))
                return updated;
            })
    );

    return { book, isLoading, setRead };
};