import React from 'react'
import ListOfBooks from 'components/ListOfBooks';
import { useBooks } from 'hooks/useBooks';
import SearchForm from 'components/SearchForm';

export default function Home() {

  const { books } = useBooks();
  return (
    <>
      <header>
        <SearchForm />
      </header>
      <div>
        <ListOfBooks books={books} />
      </div>
    </>
  )
}
