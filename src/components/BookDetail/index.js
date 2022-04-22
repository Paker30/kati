import React from 'react';
import './Detail.css';
import useSingleBook from 'hooks/useSingleBook';


export default function BookDetail({ id }) {
  const { setRead, book } = useSingleBook({ id });
  const { title, author, isReaded } = book;

  const handleRead = (isRead) => (event) => {
    event.preventDefault();
    setRead(isRead);
  };

  return (
    <div className="BookDetails">
      <header>
        <h3>{title}</h3>
        {
          isReaded
            ? <button className="Book-btn" onClick={handleRead(false)}>📖</button>
            : <button className="Book-btn" onClick={handleRead(true)}>📘</button>
        }
      </header>
      <section className="BookDetails-body">
        <span>Author: {author}</span>
      </section>
    </div>
  )
}
