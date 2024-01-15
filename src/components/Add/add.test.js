import { cleanup, fireEvent, render } from '@testing-library/react';
import Add from './index';

const mockSync = jest.fn();
const mockSetModal = jest.fn();
const mockAddBook = jest.fn();

jest.mock('../../hooks/useRemote', () => () => ({
    sync: mockSync
}));
jest.mock('../../hooks/useModal', () => () => ({
    shoModal: false,
    setModal: mockSetModal
}));
jest.mock('../../hooks/useBooks', () => ({
    useBooks: () => ({ addBook: mockAddBook })
}));

describe('Add component', () => {
    beforeEach(() => {
        mockSync.mockReset();
        mockSetModal.mockReset();
        mockAddBook.mockReset();
    });

    test('render', () => {
        render(<Add />);
        expect(mockSync).toBeCalledTimes(0);
        expect(mockSetModal).toBeCalledTimes(0);
        expect(mockAddBook).toBeCalledTimes(0);
    });

    
});