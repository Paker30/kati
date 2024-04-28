import React, { useEffect } from 'react';
import useSingleBook from 'hooks/useSingleBook';
import useRemote from 'hooks/useRemote';
import BookDetail from 'components/BookDetail';

export default function Detail({ params }) {
    const { book, isLoading, find, remove } = useSingleBook();
    const { sync } = useRemote();

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
            <BookDetail {...book} remove={() => {
                debugger;
                remove(book)
                    .then(({ id, rev }) => {
                        debugger;
                        sync.delete(id);
            })
            }
            } />
        </>
    )
}
