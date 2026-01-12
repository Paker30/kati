import React, { useEffect, memo } from "react";
import { ListOfBooks } from "../../components/ListOfBooks";
import { useBooks } from "../../hooks/useBooks";

const MemoizedListOfBooks = memo(ListOfBooks);

const Home = () => {
  const { books, loadBooks } = useBooks();

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      <div>
        <MemoizedListOfBooks books={books} />
      </div>
    </>
  );
};

export default Home;
