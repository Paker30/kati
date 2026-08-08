import React from "react";
import "./Detail.css";

export const BookDetail = ({ author, title, isReaded, remove }) => (
  <div className="BookDetails">
    <header>
      <h3>{title}</h3>
      {isReaded ? (
        <div data-testid="open-book-icon">
          <img className="icon" src="/openBook.svg" alt="read book" />
        </div>
      ) : (
        <div data-testid="close-book-icon">
          <img className="icon" src="/closeBook.svg" alt="unread book" />
        </div>
      )}
    </header>
    <section className="BookDetails-body">
      <span>Author: {author}</span>
    </section>
    <footer className="Book-footer">
      <button
        data-testid="remove-book-button"
        onClick={remove}
        className="Book-btn"
      >
        <img className="icon" src="/trashBin.svg" alt="remove book" />
      </button>
    </footer>
  </div>
);
