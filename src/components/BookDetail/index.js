import React from 'react';
import './Detail.css';

export default function BookDetail({ author, title, isReaded }) {

  return (
    <div className="BookDetails">
      <header>
        <h3>{title}</h3>
        {
          isReaded
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
