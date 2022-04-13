import React from 'react';
import useSingleBook from 'hooks/useSingleBook';
import Book from 'components/Book';

export default function Detail({ params }) {
    const { book, isLoading } = useSingleBook({ id: params.id });
    if (isLoading) {
        return (<>
            <div>Waiting for it...</div>
        </>)
    }

    if(!book){
        return null;
    }

    return (
        <>
            <h3>{book.title}</h3>
            <Book {...book} />
        </>
    )
}
