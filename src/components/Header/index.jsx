import React, { memo, useState } from "react";
import { useLocation } from "wouter";
import "./Header.css";
import { ModalPortal } from "../Modal";
import { New } from "../../pages/New";
import { NewPhoto } from "../../pages/NewPhoto";
import { useRemote } from "../../hooks/useRemote";
import { useCredentials } from "../../hooks/useCredentials";
import { useBooks } from "../../hooks/useBooks";
import { useModal } from "../../hooks/useModal";
import { getAll } from "../../services/books";
import { SearchForm } from "../../components/SearchForm";


const isEmpty = (obj) => Object.keys(obj).length === 0;

export const Header = ({ children }) => {
  const MemoizedSearchForm = memo(SearchForm);
  const [addBookBy, setAddBookBy] = useState("form");
  const { showModal, openModal, closeModal } = useModal();
  const { sync } = useRemote();
  const { credentials } = useCredentials();
  const [, pushLocation] = useLocation();
  const { loading, populateBooks, startAddingBook, errorAddingBook } =
    useBooks();

  const handleSynchronize = (event) => {
    event.preventDefault();

    if (sync.isInit()) {
      startAddingBook();
      sync
        .syncNow(false)
        .then(() => getAll().then(populateBooks))
        .catch((error) => {
          errorAddingBook(error);
          if (error.name === "RequestError" && error.code === 401) {
            console.error("Bad credentials");
          } else {
            console.error(error);
          }
        });
    }
  };
  const handleLogin = (event) => {
    event.preventDefault();
    pushLocation("/login");
  };

  return (
    <header className="gf-header">
      <section>
        <div className="gf-header-buttons">
          <button
            data-testid="add-button"
            className="btn"
            onClick={() => {
              setAddBookBy("photo");
              openModal();
            }}
          >
            <img
              className="icon"
              src="camera.svg"
              aria-label="Add book to list"
            />
          </button>
          <button
            data-testid="add-button"
            className="btn"
            onClick={() => {
              setAddBookBy("form");
              openModal();
            }}
          >
            <img
              className="icon"
              src="plusSquare.svg"
              aria-label="Add book to list from photo"
            />
          </button>
          {!isEmpty(credentials) && (
            <button className="btn fade-in" onClick={handleSynchronize}>
              <span aria-label="Synchronize remote book list" role="img">
                Sync
              </span>
            </button>
          )}
          {isEmpty(credentials) && (
            <button
              data-testid="login-button"
              className="btn"
              onClick={handleLogin}
            >
              <img
                className="icon"
                src="login.svg"
                aria-label="Log in into the application"
              />
            </button>
          )}
          {loading && (
            <div className="synchronize">
              <span>Synchronizing</span>
              <div data-testid="spinner" className="spinner"></div>
            </div>
          )}
          {showModal && <ModalPortal onClose={closeModal}>{addBookBy === 'form' ? <New /> :  <NewPhoto />}</ModalPortal>}
        </div>
        {children}
      </section>
      <section>
        <MemoizedSearchForm />
      </section>
    </header>
  );
};
