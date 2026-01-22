import React, { useState } from "react";
import { useBooks } from "../../hooks/useBooks";
import { nanoid } from "nanoid";
import { useRemote } from "../../hooks/useRemote";
import { useModal } from "../../hooks/useModal";

import "./Add.css";

export const Add = ({author = '', title =''}) => {
  const { closeModal } = useModal();
  const { sync } = useRemote();
  const [newAuthor, setNewAuthor] = useState(author);
  const [newTitle, setNewTitle] = useState(title);
  const { addBook } = useBooks();

  const handleSubmit = (e) => {
    e.preventDefault();
    addBook({ author, title, id: nanoid(), isRead: false })
      .then(({ id, rev }) => sync.put(id, rev))
      .finally(() => closeModal());
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="author">Author</label>
      <input
        placeholder="Enter author"
        name="author"
        value={newAuthor}
        onChange={(e) => setNewAuthor(e.target.value)}
      />
      <label htmlFor="title">Title</label>
      <input
        placeholder="Enter title"
        name="title"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />
      <button className="btn">Add</button>
    </form>
  );
};
