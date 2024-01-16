import PouchDB, { fakeGetAll, fakePut, fakeFind, fakeGet } from 'pouchdb-browser';
jest.mock('pouchdb-browser');
import { getAll, insert, get, update, getBy } from './books';

describe('books service', () => {
    beforeEach(() => {
        PouchDB.mockClear();
    });

    test('get', () => {
        const fakeBook = {
            id: '1234',
            title: 'El quijote',
            author: 'Cervantes'
        };
        fakeGet.mockResolvedValueOnce(fakeBook);
        expect(get('1234')).resolves.toBe(fakeBook);
        expect(fakeGet).toBeCalledTimes(1);
        expect(fakeGet).toBeCalledWith(fakeBook.id);
    });

    test('getAll', () => {
        fakeGetAll.mockResolvedValueOnce({ rows: [] });
        expect(getAll()).resolves.toStrictEqual([]);
        expect(fakeGetAll).toBeCalledTimes(1);
    });

    test('input', () => {
        fakePut.mockResolvedValueOnce({ insert: true });
        const fakeBook = {
            id: '1234',
            title: 'El quijote',
            author: 'Cervantes'
        };
        expect(insert(fakeBook)).resolves.toStrictEqual({ insert: true });
        expect(fakePut).toBeCalledTimes(1);
    });

    test('update', () => {
        fakePut.mockResolvedValueOnce({ updated: true });
        const fakeBook = {
            id: '1234',
            title: 'El quijote',
            author: 'Cervantes',
            updated: new Date().getTime()
        };
        expect(update(fakeBook)).resolves.toStrictEqual({ updated: true });
        expect(fakePut).toBeCalledTimes(1);
        expect(fakePut).toBeCalledWith(fakeBook);
    });

    describe('find', () => {
        const fakeBook = { id: '1234', title: 'El quijote', author: 'Cervantes' };
        test('author', () => {
            fakeFind.mockResolvedValueOnce({ docs: [fakeBook] });
            expect(getBy.author('cervantes')).resolves.toStrictEqual([fakeBook]);
            expect(fakeFind).toBeCalledTimes(1);
        });

        test('author', () => {
            fakeFind.mockResolvedValueOnce({ docs: [fakeBook] });
            expect(getBy.title('el quijote')).resolves.toStrictEqual([fakeBook]);
            expect(fakeFind).toBeCalledTimes(1);
        });
    });
});