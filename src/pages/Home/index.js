import React, { useEffect, memo } from 'react'
import { ListOfBooks } from 'components/ListOfBooks';
import { useBooks } from 'hooks/useBooks';
import { SearchForm } from 'components/SearchForm';

const MemoizedListOfBooks = memo(ListOfBooks);
const MemoizedSearchForm = memo(SearchForm);

const Home = () => {
  const { books, loadBooks } = useBooks();

  useEffect(() => {
    loadBooks();
  }, []);

  return (
    <>
      <header>
        <MemoizedSearchForm />
      </header>
      <div>
        <MemoizedListOfBooks books={books} />
      </div>
    </>
  )
};

export default Home;
