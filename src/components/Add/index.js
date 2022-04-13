import React, { useState, useEffect } from 'react';
import { useBooks } from 'hooks/useBooks';
import { nanoid } from 'nanoid';
import './Add.css';


export default function Add() {
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const { addBook } = useBooks();

    const handleSubmit = (e) => { 
        e.preventDefault();
        addBook({ author, title, id: nanoid() });
    };
    
    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>
                Author
                <input
                    placeholder='Author'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                />
            </label>
            <label>
                Title
                <input
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
            </label>
            <button className='btn'>Add</button>
        </form>
    )
}
