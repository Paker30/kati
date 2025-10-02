import React, { memo } from 'react';
import { Book } from 'components/Book';
import './ListOfBooks.css';

const MemoizedBook = memo(Book);

export const ListOfBooks = ({ books }) =>
(
  <div className='ListOfBooks'>
    {
      books.map(({ id, title, author, isRead }) => <MemoizedBook id={id} key={id} title={title} author={author} isRead={isRead} />)
    }
  </div>
);
