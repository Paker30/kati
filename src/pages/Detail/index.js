import React from 'react';
import useSingleBook from 'hooks/useSingleBook';
import BookDetail from 'components/BookDetail';

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
            <BookDetail {...book} />
        </>
    )
}
