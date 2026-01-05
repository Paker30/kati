import {describe, test, expect, vi, beforeEach} from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import useSingleBook from './useSingleBook';

const mockRemoveBook = vi.fn();
let fakeBooks = [];

vi.mock('./useBooks', () => ({
    useBooks: () => ({
        books: fakeBooks,
        removeBook: mockRemoveBook
    })
}));

const mocks = vi.hoisted(() => {
  return {
    getAll: vi.fn(),
    insert: vi.fn(),
    remove:vi.fn(),
    get: vi.fn(),
    update:vi.fn(),
    getBy: {
        author: vi.fn(),
        title: vi.fn()
    },
  }
});
vi.mock('../services/books',  () => {
    return{
    getAll: mocks.getAll,
    insert: mocks.insert,
    remove:mocks.remove,
    get: mocks.get,
    update:mocks.update,
    getBy: mocks.getBy
}});

describe('useSingleBook', () => {
    beforeEach(() => {
        mocks.getAll.mockRestore();
        mocks.insert.mockRestore();
        mocks.remove.mockRestore();
        mocks.get.mockRestore();
        mocks.update.mockRestore();
        mocks.getBy.author.mockRestore();
        mocks.getBy.title.mockRestore();
        mockRemoveBook.mockRestore();
        fakeBooks = [];
    });

    const fakeBook = {
        id: 'fakeId',
        key: 'fakeKey',
        doc: 'fakeDoc',
        author: 'Douglas Adam',
        title: 'The Hitchhiker\'s Guide to the Galaxy'
    };

    test('Init hook', () => {
        mockRemoveBook.mockReturnValueOnce({ books: [fakeBook] });
        const { result } = renderHook(() => useSingleBook());
        const { book, isLoading, find } = result.current;
        expect(book).toBeUndefined();
        expect(isLoading).toBeFalsy();
        expect(typeof find.byId).toBe('function');
    });

    describe('findById', () => {
        test('Book is in cache', async () => {
            fakeBooks = [fakeBook];
            mocks.get.mockResolvedValueOnce('no call has been made');
            const { result } = renderHook(() => useSingleBook());
            await waitFor(() => result.current.find.byId(fakeBook.id));
            expect(result.current.isLoading).toBeFalsy();
            expect(mocks.get).toHaveBeenCalledTimes(0);
            expect(result.current.book.id).toBe(fakeBook.id);
        });
        test('Book is not in cache', async () => {
            mocks.get.mockResolvedValueOnce(fakeBook);
            const { result } = renderHook(() => useSingleBook());
            await waitFor(() => result.current.find.byId(fakeBook.id));
            expect(result.current.isLoading).toBeFalsy();
            expect(mocks.get).toHaveBeenCalledTimes(1);
            expect(result.current.book.id).toBe(fakeBook.id);
        });
    });
});