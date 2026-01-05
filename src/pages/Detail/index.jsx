import React, { useEffect, useCallback, memo } from "react";
import useSingleBook from "../../hooks/useSingleBook";
import { useRemote } from "../../hooks/useRemote";
import { BookDetail } from "../../components/BookDetail";

const MemoizeBookDetail = memo(BookDetail);

export default function Detail({ params }) {
  const { book, isLoading, find, remove } = useSingleBook();
  const { sync } = useRemote();

  const memoizeRemove = useCallback(() => {
    remove(book).then(({ id }) => sync.delete(id));
  }, [book, remove, sync]);

  useEffect(() => {
    find.byId(params.id);
  }, []);
  if (isLoading) {
    return (
      <>
        <div>Waiting for it...</div>
      </>
    );
  }

  if (!book) {
    return null;
  }

  return (
    <>
      <MemoizeBookDetail
        author={book.author}
        title={book.title}
        isReaded={book.isReaded}
        remove={memoizeRemove}
      />
    </>
  );
}
