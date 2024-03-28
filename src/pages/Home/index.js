import React, { useEffect, useState } from 'react'
import ListOfBooks from 'components/ListOfBooks';
import { useBooks } from 'hooks/useBooks';
import SearchForm from 'components/SearchForm';

export default function Home() {

  const { books, loadBooks } = useBooks();
  const [listOfBooks, setListOfBooks] = useState(books);

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    setListOfBooks(books);
  }, [books]);

  return (
    <>
      <header>
        <SearchForm />
      </header>
      <div>
        <ListOfBooks books={listOfBooks} />
      </div>
    </>
  )
}
