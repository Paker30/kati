import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className='modal'>
        <div className='modal-content'>
            <button className='btn modal-btn' onClick={onClose}>X</button>
            {children}
        </div>
    </div>
  )
};

export const ModalPortal = ({ children, onClose }) => {
    return ReactDom.createPortal(
        <Modal onClose={onClose}>
            {children}
        </Modal>,
        document.getElementById('root')
    )
};
