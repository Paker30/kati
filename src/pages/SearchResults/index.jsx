import React, { memo } from "react";
import { ListOfBooks } from "../../components/ListOfBooks";
import { useBooks } from "../../hooks/useBooks";

const MemoizedListOfBooks = memo(ListOfBooks);

export const SearchResults = ({ params }) => {
  const { keyword, category } = params;
  const { books } = useBooks({
    keyword: decodeURIComponent(keyword),
    category,
  });

  return (
    <>
      <header>
      </header>
      <div>
        <MemoizedListOfBooks books={books} />
      </div>
    </>
  );
};

export default SearchResults;
