import React, { useState } from 'react';
import './Header.css';
import Modal from 'components/Modal';
import New from 'pages/New';
import Download from 'components/Download';

export default function Header({ children }) {

  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowModal(true);
  };
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <header className='gf-header'>
      <button className='btn' onClick={handleClick}>
        <span aria-label="Add book to list" role="img">
          ＋
        </span>
      </button>
      {showModal && (
        <Modal onClose={handleClose}>
          <New />
        </Modal>
      )}
      <Download />
      <section className='children'>
        {children}
      </section>
    </header>
  )
}
