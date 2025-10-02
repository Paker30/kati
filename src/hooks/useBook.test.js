import { renderHook, waitFor } from '@testing-library/react';
import { useBooks } from './useBooks';
import { KatiContextProvider } from '../context/kati';
import * as booksService from '../services/books';

jest.mock('../services/books');

describe('useBooks', () => {
    const fakeBook = {
        id: 'fakeId',
        key: 'fakeKey',
        doc: 'fakeDoc',
        author: 'Douglas Adam',
        title: 'The Hitchhiker\'s Guide to the Galaxy'
    };
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
            booksService.getAll.mockResolvedValueOnce([]);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.loading).toBe(false);
            expect(booksService.getAll).toHaveBeenCalledTimes(1);
            expect(result.current.books.length).toBe(0);
        });

        test('There are books', async () => {
            booksService.getAll.mockResolvedValueOnce([fakeBook]);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.loading).toBe(false);
            expect(booksService.getAll).toHaveBeenCalledTimes(1);
            expect(result.current.books.length).toBe(1);
        });

        test('There was an error', async () => {
            booksService.getAll.mockRejectedValueOnce(new Error('Oppps, something has gone wrong!'));
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.loading).toBe(false);
            expect(booksService.getAll).toHaveBeenCalledTimes(1);
            expect(result.current.books.length).toBe(0);
        });
    });

    describe('addBook', () => {
        test('Add one book', async () => {
            booksService.insert.mockResolvedValueOnce(true);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook(fakeBook));
            expect(result.current.loading).toBe(false);
            expect(booksService.insert).toHaveBeenCalledTimes(1);
            expect(result.current.books.length).toBe(1);
        });

        test('There was an error', async () => {
            booksService.insert.mockRejectedValueOnce(new Error('Oppps, something has gone wrong!'));
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook({ id: '', key: '', doc: '', author: '', title: '' }));
            expect(result.current.loading).toBe(false);
            expect(booksService.insert).toHaveBeenCalledTimes(1);
            expect(result.current.books.length).toBe(0);
        });
    });

    describe('setRead', () => {
        test('Set book as unread', async () => {
            booksService.insert.mockResolvedValueOnce(true);
            booksService.update.mockResolvedValueOnce(true);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook({...fakeBook, isRead: true}));
            expect(result.current.books.length).toBe(1);
            await waitFor(() => result.current.setRead(fakeBook.id));
            expect(booksService.update).toHaveBeenCalledTimes(1);
            expect(result.current.books[0].isRead).toBeFalsy();
        });

        test('Set book as read', async () => {
            booksService.insert.mockResolvedValueOnce(true);
            booksService.update.mockResolvedValueOnce({rev: '123'});
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.addBook({...fakeBook, isRead: false}));
            expect(result.current.books.length).toBe(1);
            await waitFor(() => result.current.setRead(fakeBook.id));
            expect(booksService.update).toHaveBeenCalledTimes(1);
            expect(result.current.books[0].isRead).toBeTruthy();
        });
    });

    describe('removeBook', () => {
        test('Book is removed', async () => {
            booksService.getAll.mockResolvedValueOnce([fakeBook]);
            booksService.remove.mockResolvedValueOnce(true);
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.books.length).toBe(1);
            await waitFor(() => result.current.removeBook(fakeBook));
            expect(result.current.books.length).toBe(0);
        });

        test('Removing book fails', async () => {
            booksService.getAll.mockResolvedValueOnce([fakeBook]);
            booksService.remove.mockRejectedValueOnce(new Error('Oppps something went wrong!'));
            const wrapper = ({ children }) => <KatiContextProvider>{children}</KatiContextProvider>
            const { result } = renderHook(() => useBooks(), { wrapper });
            await waitFor(() => result.current.loadBooks());
            expect(result.current.books.length).toBe(1);
            await waitFor(() => result.current.removeBook(fakeBook));
            expect(result.current.books.length).toBe(0);
        });
    });
});