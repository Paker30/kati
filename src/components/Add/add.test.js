import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
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

    test('render', async () => {
        const { findByText, findByPlaceholderText } = render(<Add />);
        expect(mockSync).toBeCalledTimes(0);
        expect(mockSetModal).toBeCalledTimes(0);
        expect(mockAddBook).toBeCalledTimes(0);
        expect(await findByText('Author')).toBeVisible();
        expect(await findByText('Title')).toBeVisible();
        expect(await findByPlaceholderText('Enter author')).toBeVisible();
        expect(await findByPlaceholderText('Enter title')).toBeVisible();
    });

    test('submit form', () => {
        const { getByPlaceholderText, getByRole } = render(<Add />);
        const authorInput = getByPlaceholderText('Enter author');
        const titleInput = getByPlaceholderText('Enter title');
        fireEvent.change(authorInput, { target: { value: 'Arthur' } });
        fireEvent.change(titleInput, { target: { value: 'Sherlock Holmes' } });
        const button = getByRole('button', {name: 'Add'});
        button.click();
        expect(mockAddBook).toBeCalledTimes(1);
        expect(mockSync).toBeCalledTimes(1);
        expect(setModal).toBeCalledTimes(1);
    });
});