import { renderHook, waitFor } from '@testing-library/react';
import useSingleBook from './useSingleBook';
import { KatiContextProvider } from '../context/kati';
import * as booksService from '../services/books';
import * as booksHook from '../hooks/useBooks';
jest.mock('../hooks/useBooks');
jest.mock('../services/books');

describe('useSingleBook', () => {
    const fakeBook = {
        id: 'fakeId',
        key: 'fakeKey',
        doc: 'fakeDoc',
        author: 'Douglas Adam',
        title: 'The Hitchhiker\'s Guide to the Galaxy'
    };

    test('Init hook', () => {
        booksHook.useBooks.mockReturnValueOnce({ books: [fakeBook] });
        const { result } = renderHook(() => useSingleBook());
        const { book, isLoading, find } = result.current;
        expect(book).toBeUndefined();
        expect(isLoading).toBeFalsy();
        expect(typeof find.byId).toBe('function');
    });

    describe.skip('findById', () => {
        test('Book is in cache', async () => {
            booksHook.useBooks.mockReturnValueOnce({ books: [fakeBook] });
            booksService.get.mockResolvedValueOnce('no call has been made');
            const { result } = renderHook(() => useSingleBook());
            await waitFor(() => result.current.find.byId(fakeBook.id));
            expect(result.current.isLoading).toBeFalsy();
            expect(booksService.get).toHaveBeenCalledTimes(0);
            expect(result.current.book.id).toBe(fakeBook.id);
        });
        test('Book is not in cache', async () => {
            booksHook.useBooks.mockReturnValueOnce({ books: [] });
            booksService.get.mockResolvedValueOnce(fakeBook);
            const { result } = renderHook(() => useSingleBook());
            await waitFor(() => result.current.find.byId(fakeBook.id));
            expect(result.current.isLoading).toBeFalsy();
            expect(booksService.get).toHaveBeenCalledTimes(1);
            expect(result.current.book.id).toBe(fakeBook.id);
        });
    });
});