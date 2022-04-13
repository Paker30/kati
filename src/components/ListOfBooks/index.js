import React from 'react';
import Book from 'components/Book'

export default function ListOfBooks({ books }) {
  return (
    <div>
      {
        books.map(({id ,title, author}) => <Book id={id} key={id} title={title} author={author}/>)
      }
    </div>
  )
}
