import React, { useEffect } from 'react';
import useSingleBook from 'hooks/useSingleBook';
import BookDetail from 'components/BookDetail';

export default function Detail({ params }) {
    const { book, isLoading, find } = useSingleBook();

    useEffect(() => {
        find.byId(params.id);
    }, []);
    if (isLoading) {
        return (<>
            <div>Waiting for it...</div>
        </>)
    }

    if (!book) {
        return null;
    }

    return (
        <>
            <BookDetail {...book} />
        </>
    )
}
