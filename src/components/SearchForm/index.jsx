import React from 'react';
import { useLocation } from 'wouter';

import './SearchForm.css';
import useForm from './hook';

const CATEGORIES = ['author', 'title'];


export const SearchForm =({ initialKeyword = '', initialCategory = CATEGORIES[1] }) => {

    const [, pushLocation] = useLocation();

    const { keyword, category, changeCategory, changeKeyword } = useForm({ initialKeyword, initialCategory });

    const handleSubmit = (event) => {
        event.preventDefault();
        pushLocation(`/search/${keyword}/${category}`);
    };

    const handleChangeKeyword = (event) => {
        changeKeyword({ keyword: event.target.value });
    }

    const handleChangeCategory = (event) => {
        changeCategory({ category: event.target.value });
    }

    return (
        <form onSubmit={handleSubmit} className="Search">
            <button className='btn'>🔎</button>
            <input
                type="text"
                placeholder='Search a book here...'
                onChange={handleChangeKeyword}
                value={keyword}
            />
            <select value={category} onChange={handleChangeCategory}>
                <option disabled>By:</option>
                {
                    CATEGORIES.map((category) => (<option key={category}>{category}</option>))
                }
            </select>
        </form>
    )
};
