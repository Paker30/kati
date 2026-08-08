import React, { memo, useEffect } from "react";
import { ListOfBooks } from "../../components/ListOfBooks";
import { useBooks } from "../../hooks/useBooks";

const MemoizedListOfBooks = memo(ListOfBooks);

export const SearchResults = ({ params }) => {
  const { keyword, category } = params;
  const { books, loadBooks } = useBooks({
    keyword: decodeURIComponent(keyword),
    category,
  });

  useEffect(() => {
    loadBooks();
  }, [keyword, category, loadBooks]);

  return (
    <>
      <div>
        <MemoizedListOfBooks books={books} />
      </div>
    </>
  );
};

export default SearchResults;
