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
        <MemoizedListOfBooks books={books} />
    </>
  );
};

export default Home;
