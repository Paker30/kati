import React from "react";
import "./Detail.css";

export const BookDetail = ({ author, title, isReaded, remove }) => (
  <div className="BookDetails">
    <header>
      <h3>{title}</h3>
      {isReaded ? <span>📖</span> : <span>📘</span>}
    </header>
    <section className="BookDetails-body">
      <span>Author: {author}</span>
    </section>
    <footer className="Book-footer">
      <button onClick={remove} className="btn">
        <span>🪣</span>
      </button>
    </footer>
  </div>
);
