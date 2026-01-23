import React from 'react';

export const Error = ({ title, children}) => (
    <article className='Error'>
        <h1>{title}</h1>
        <article>
            {children}
        </article>
    </article>
);