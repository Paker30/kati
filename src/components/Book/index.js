import React from 'react';
import { Link } from 'wouter';
import './Book.css';

export default function Book({ id, title, author }) {
  return (
    <div className="Book">
      <Link className="Book-link" to={`/book/${id}`}>
        <span>{title}</span>
        <span>{author}</span>
      </Link>
    </div>
  )
}
