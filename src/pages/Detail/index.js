import React from 'react';
import { useBooks } from 'hooks/useBooks';
import Book from 'components/Book';

export default function Detail({ params }) {
    const { books } = useBooks();
    const book = books.find(({ id }) => id === params.id);
    return (
        <>
            <h3>{book.title}</h3>
            <Book {...book} />
        </>
    )
}
