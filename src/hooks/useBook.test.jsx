import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { beforeEach, vi,describe, test, expect } from 'vitest';
import { useBooks } from './useBooks';
import { KatiContextProvider } from '../context/kati';

const mockStartAddingBook = vi.fn();
const mockEndAddingBook = vi.fn();
const mockErrorAddingBook = vi.fn();
let fakeIsLoading = false;
let fakeBooks =[];
const fakeBook = {
        id: 'fakeId',
        key: 'fakeKey',
        doc: 'fakeDoc',
        author: 'Douglas Adam',
        title: 'The Hitchhiker\'s Guide to the Galaxy'
    };

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
vi.mock('./useData', () => ({
    useData: () => ({
        books: fakeBooks,
        isLoading: fakeIsLoading
    })
}));
vi.mock('./useAPI', () => ({
    useAPI: () => ({
        startAddingBook: mockStartAddingBook,
        endAddingBook: mockEndAddingBook,
        errorAddingBook: mockErrorAddingBook
    })
}));

describe('useBooks', () => {
    beforeEach(() => {
        mocks.getAll.mockRestore();
        mocks.insert.mockRestore();
        mocks.remove.mockRestore();
        mocks.get.mockRestore();
        mocks.update.mockRestore();
        mocks.getBy.author.mockRestore();
        mocks.getBy.title.mockRestore();
        mockStartAddingBook.mockRestore();
        mockEndAddingBook.mockRestore();
        mockErrorAddingBook.mockRestore();
    });

    test('Init hook', () => {
        const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
        const { result } = renderHook(() => useBooks(), { wrapper });
        const { loading, books, setRead, addBook, populateBooks, loadBooks, removeBook } = result.current;
        expect(loading).toBe(false);
        expect(Array.isArray(books)).toBeTruthy();
        expect(books.length).toBe(0);
        expect(typeof setRead).toBe('function');
        expect(typeof addBook).toBe('function');
        expect(typeof populateBooks).toBe('function');
        expect(typeof loadBooks).toBe('function');
        expect(typeof removeBook).toBe('function');
    });

    describe('getAll', () => {
        test('There are no books', async () => {
            mocks.getAll.mockResolvedValueOnce([]);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.loading).toBe(false);
            expect(mocks.getAll).toHaveBeenCalledTimes(1);
        });

        test('There are books', async () => {
            mocks.getAll.mockResolvedValueOnce([fakeBook]);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.loading).toBe(false);
            expect(mocks.getAll).toHaveBeenCalledTimes(1);
        });

        test('There was an error', async () => {
            mocks.getAll.mockRejectedValueOnce(new Error('Oppps, something has gone wrong!'));
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.loading).toBe(false);
            expect(mocks.getAll).toHaveBeenCalledTimes(1);
        });
    });

    describe('addBook', () => {
        test('Add one book', async () => {
            mocks.insert.mockResolvedValueOnce(true);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook(fakeBook));
            expect(result.current.loading).toBe(false);
            expect(mocks.insert).toHaveBeenCalledTimes(1);
        });

        test('There was an error', async () => {
            mocks.insert.mockRejectedValueOnce(new Error('Oppps, something has gone wrong!'));
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook({ id: '', key: '', doc: '', author: '', title: '' }));
            expect(result.current.loading).toBe(false);
            expect(mocks.insert).toHaveBeenCalledTimes(1);
        });
    });

    //Those two tests are skipped because of issues with the mocked update function, books must have one book at least
    describe.skip('setRead', () => {
        test('Set book as unread', async () => {
            mocks.insert.mockResolvedValueOnce(true);
            mocks.update.mockResolvedValueOnce(true);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook({...fakeBook, isRead: true}));
            await waitFor(() => result.current.setRead(fakeBook.id));
            expect(mocks.update).toHaveBeenCalledTimes(1);
        });

        test('Set book as read', async () => {
            mocks.insert.mockResolvedValueOnce(true);
            mocks.update.mockResolvedValueOnce({rev: '123'});
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook({...fakeBook, isRead: false}));
            await waitFor(() => result.current.setRead(fakeBook.id));
            expect(mocks.update).toHaveBeenCalledTimes(1);
        });
    });

    describe('removeBook', () => {
        test('Book is removed', async () => {
            mocks.getAll.mockResolvedValueOnce([fakeBook]);
            mocks.remove.mockResolvedValueOnce(true);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            await waitFor(() => result.current.removeBook(fakeBook));
        });

        test('Removing book fails', async () => {
            mocks.getAll.mockResolvedValueOnce([fakeBook]);
            mocks.remove.mockRejectedValueOnce(new Error('Oppps something went wrong!'));
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            await waitFor(() => result.current.removeBook(fakeBook));
        });
    });
});