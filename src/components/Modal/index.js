import React from 'react';
import ReactDom from 'react-dom';
import './Modal.css';

const Modal = ({ children, onClose }) => {
  return (
    <div className='modal'>
        <div className='modal-content'>
            <button className='btn' onClick={onClose}>🅧</button>
            {children}
        </div>
    </div>
  )
};

const ModalPortal = ({ children, onClose }) => {
    return ReactDom.createPortal(
        <Modal onClose={onClose}>
            {children}
        </Modal>,
        document.getElementById('root')
    )
};

export default ModalPortal;