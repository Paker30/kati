import React, { useState } from 'react';
import './Header.css';
import Modal from 'components/Modal';
import New from 'pages/New';
import useRemote from 'hooks/useRemote';

export default function Header({ children }) {

  const [showModal, setShowModal] = useState(false);
  const { sync, credentials } = useRemote();

  const handleClick = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };
  const handleSynchronize = () => {
    sync.syncNow()
      .catch((error) => {
        if (error.name === "Requesterroror" && error.code === 401) {
          console.error('Bad credentials');
        }
        else {
          console.error(error);
        }
      });
  };

  return (
    <header className='gf-header'>
      <button className='btn' onClick={handleClick}>
        <span aria-label="Add book to list" role="img">
          ＋
        </span>
      </button>
      {credentials.accessToken && (<button className='btn' onClick={handleSynchronize}>
        <span aria-label="Synchronize remote book list" role="img">
          🔁
        </span>
      </button>)
      }
      {showModal && (
        <Modal onClose={handleClose}>
          <New />
        </Modal>
      )}
      <section className='children'>
        {children}
      </section>
    </header>
  )
}
