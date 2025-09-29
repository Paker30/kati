import React, { useState } from 'react';
import { useBooks } from 'hooks/useBooks';
import { nanoid } from 'nanoid';
import useRemote from 'hooks/useRemote';
// import useModal from 'hooks/useModal';
import {useData} from 'hooks/useData';
import {useAPI} from 'hooks/useAPI';

import './Add.css';


export default function Add() {
    const { showModal, setModal } = useModal();
    const { sync } = useRemote();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const { addBook } = useBooks();

    const handleSubmit = (e) => {
        e.preventDefault();
        addBook({ author, title, id: nanoid(), isRead: false })
            .then(({ id, rev }) => sync.put(id, rev))
            .finally(() => setModal(false));
    };

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label htmlFor='author'>Author</label>
            <input
                placeholder='Enter author'
                name='author'
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
            />
            <label htmlFor='title'>Title</label>
            <input
                placeholder='Enter title'
                name='title'
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <button className='btn'>Add</button>
        </form>
    )
}
