import React from 'react';
import Book from 'components/Book';
import './ListOfBooks.css';

export default function ListOfBooks({ books }) {
  return (
    <div className='ListOfBooks'>
      {
        books.map(({id ,title, author}) => <Book id={id} key={id} title={title} author={author}/>)
      }
    </div>
  )
}
