import React from 'react';
import { Link } from 'wouter';
import './Book.css';
import useSingleBook from 'hooks/useSingleBook';
import useRemote from 'hooks/useRemote';

export default function Book({ id }) {
  const { sync } = useRemote();
  const { setRead, book } = useSingleBook({ id });
  const { title, author, isRead } = book;

  const handleRead = (isRead) => (event) => {
    event.preventDefault();
    setRead(isRead)
      .then(({ id, rev }) => sync.put(id, rev));
  };

  return (
    <div className="Book">
      <Link className="Book-link" to={`/book/${id}`}>
        <span>{title}</span>
        <span>{author}</span>
      </Link>
      {
        isRead
          ? <button className="Book-btn" onClick={handleRead(false)}>📖</button>
          : <button className="Book-btn" onClick={handleRead(true)}>📘</button>
      }
    </div>
  )
}
