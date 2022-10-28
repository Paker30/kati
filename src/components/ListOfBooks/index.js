import React from 'react';
import Book from 'components/Book';
import './ListOfBooks.css';

export default function ListOfBooks({ books }) {
  return (
    <div className='ListOfBooks'>
      {
        books.map(({id ,title, author, isRead}) => <Book id={id} key={id} title={title} author={author} isRead={isRead} />)
      }
    </div>
  )
}
