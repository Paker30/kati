import React, { memo } from 'react';
import { SearchForm } from 'components/SearchForm';
import { ListOfBooks } from 'components/ListOfBooks';
import { useBooks } from 'hooks/useBooks';

const MemoizedListOfBooks = memo(ListOfBooks);
const MemoizedSearchForm = memo(SearchForm);

export const SearchResults = ({ params }) => {

    const { keyword, category } = params;
    const { books } = useBooks({ keyword: decodeURIComponent(keyword), category });

    return (
        <>
            <header>
                <MemoizedSearchForm initialKeyword={keyword} initialCategory={category} />
            </header>
            <div>
                <MemoizedListOfBooks books={books} />
            </div>
        </>
    )
};

export default SearchResults;