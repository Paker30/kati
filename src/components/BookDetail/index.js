import React from 'react';
import './Detail.css';
import useSingleBook from 'hooks/useSingleBook';


export default function BookDetail({ author, title, read }) {

  return (
    <div className="BookDetails">
      <header>
        <h3>{title}</h3>
        {
          read
            ? <span>📖</span>
            : <span>📘</span>
        }
      </header>
      <section className="BookDetails-body">
        <span>Author: {author}</span>
      </section>
    </div>
  )
}
