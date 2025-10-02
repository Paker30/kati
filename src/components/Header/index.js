import React from 'react';
import { useLocation } from "wouter";
import './Header.css';
import Modal from 'components/Modal';
import New from 'pages/New';
import useRemote from 'hooks/useRemote';
import useCredentials from 'hooks/useCredentials';
import { useBooks } from 'hooks/useBooks';
import useModal from 'hooks/useModal';
import { getAll } from '../../services/books';

const isEmpty = (obj) => Object.keys(obj).length === 0;

export default function Header({ children }) {

  const { showModal, openModal, closeModal } = useModal();
  const { sync } = useRemote();
  const { credentials } = useCredentials();
  const [_, pushLocation] = useLocation();
  const { loading, populateBooks, startAddingBook, errorAddingBook } = useBooks();

  const handleSynchronize = (event) => {
    event.preventDefault();

    if (sync.isInit()) {
      startAddingBook();
      sync.syncNow(false)
        .then(() => getAll().then(populateBooks))
        .catch((error) => {
          errorAddingBook(error);
          if (error.name === "RequestError" && error.code === 401) {
            console.error('Bad credentials');
          }
          else {
            console.error(error);
          }
        });
    }
  };
  const handleLogin = (event) => {
    event.preventDefault();
    pushLocation('/login');
  };

  return (
    <header className='gf-header'>
      <button className='btn' onClick={openModal}>
        <span aria-label="Add book to list" role="img">
          ＋
        </span>
      </button>
      {<button className='btn' onClick={handleSynchronize} disabled={isEmpty(credentials)}>
        <span aria-label="Synchronize remote book list" role="img">
          Sync
        </span>
      </button>}
      <button className='btn' onClick={handleLogin}>
        <span aria-label="Add book to list" role="img">
          Login
        </span>
      </button>
      {loading &&
        <div className='synchronize'>
          <span>
            Synchronizing
          </span>
          <div className="spinner"></div>
        </div>
      }
      {showModal && (
        <Modal onClose={closeModal}>
          <New />
        </Modal>
      )}
      <section className='children'>
        {children}
      </section>
    </header>
  )
}
