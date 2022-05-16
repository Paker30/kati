import React from 'react';
import { Link } from 'wouter';
import './Book.css';
import useSingleBook from 'hooks/useSingleBook';

export default function Book({ id }) {
  const { setRead, book } = useSingleBook({ id });
  const {title, author, read} = book;

  const handleRead = (isRead) => (event) => {
    event.preventDefault();
    setRead(isRead);
  };

  return (
    <div className="Book">
      <Link className="Book-link" to={`/book/${id}`}>
        <span>{title}</span>
        <span>{author}</span>
      </Link>
      {
        read
        ? <button className="Book-btn" onClick={handleRead(false)}>📖</button>
        : <button className="Book-btn" onClick={handleRead(true)}>📘</button>
      }
    </div>
  )
}
