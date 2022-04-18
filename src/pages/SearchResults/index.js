import React from 'react';
import SearchForm from 'components/SearchForm';
import ListOfBooks from 'components/ListOfBooks';
import { useBooks } from 'hooks/useBooks';

export default function SearchResults({ params }) {

    const { keyword, category } = params;
    const { books } = useBooks({ keyword: decodeURIComponent(keyword), category });

    return (
        <>
            <header>
                <SearchForm initialKeyword={keyword} initialCategory={category} />
            </header>
            <div>
                <ListOfBooks books={books} />
            </div>
        </>
    )
}
