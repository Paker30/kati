import React from 'react'
import ListOfBooks from 'components/ListOfBooks';
import { useBooks } from 'hooks/useBooks';

export default function Home() {

  const { books } = useBooks();
  return (
    <>
    <div>
        <ListOfBooks books={books}/>
    </div>
    </>
  )
}
