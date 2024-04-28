import { useState, useEffect } from 'react';
import { useBooks } from 'hooks/useBooks';
import { get } from 'services/books';

export default function useSingleBook() {
    const { books, removeBook } = useBooks();

    const [book, setBook] = useState();
    const [isLoading, setIsLoading] = useState(false);

    const findById = (id) => {
        setIsLoading(true);
        const bookFromCache = books.find((book) => book.id === id);
        if (bookFromCache) {
            setBook(bookFromCache);
            setIsLoading(false);
        }
        else {
            get(id)
                .then((book) => {
                    setIsLoading(false);
                    setBook(book);
                })
                .catch(() => {
                    setIsLoading(false);
                });
        }
    };

    return { book, remove: removeBook, isLoading, find: { byId: findById } };
};