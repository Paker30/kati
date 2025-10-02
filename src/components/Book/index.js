import React from 'react';
import { Link } from 'wouter';
import useRemote from 'hooks/useRemote';
import { useBooks } from 'hooks/useBooks';
import './Book.css';

export const Book = ({ title, author, isRead, id }) => {

  const { sync } = useRemote();
  const { setRead } = useBooks();

  const handleRead = (id) => (event) => {
    event.preventDefault();
    setRead(id)
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
          ? <button className="Book-btn" onClick={handleRead(id)}>📖</button>
          : <button className="Book-btn" onClick={handleRead(id)}>📘</button>
      }
    </div>
  )
};
