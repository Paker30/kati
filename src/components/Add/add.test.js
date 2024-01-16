import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Add from './index';

let mockPut = jest.fn().mockResolvedValue(true);
let mockSetModal = jest.fn();
let mockAddBook;

jest.mock('../../hooks/useRemote', () => () => ({
    sync: { put: mockPut }
}));
jest.mock('../../hooks/useModal', () => () => ({
    showModal: false,
    setModal: mockSetModal
}));
jest.mock('../../hooks/useBooks', () => ({
    useBooks: () => ({ addBook: mockAddBook})
}));

describe('Add component', () => {
    beforeEach(() => {
        mockPut.mockRestore();
        mockSetModal.mockRestore();
    });
    test('render', async () => {
        mockAddBook = jest.fn().mockResolvedValue({ id: 'fake id', rev: 'fake rev'});
        const { findByText, findByPlaceholderText } = render(<Add />);
        expect(mockPut).toBeCalledTimes(0);
        expect(mockSetModal).toBeCalledTimes(0);
        expect(mockAddBook).toBeCalledTimes(0);
        expect(await findByText('Author')).toBeVisible();
        expect(await findByText('Title')).toBeVisible();
        expect(await findByText('Add')).toBeVisible();
        expect(await findByPlaceholderText('Enter author')).toBeVisible();
        expect(await findByPlaceholderText('Enter title')).toBeVisible();
    });

    test('submit form', async () => {
        mockAddBook = jest.fn().mockResolvedValue({ id: 'fake id', rev: 'fake rev'});
        const { getByPlaceholderText, getByRole } = render(<Add />);
        const authorInput = getByPlaceholderText('Enter author');
        const titleInput = getByPlaceholderText('Enter title');
        fireEvent.change(authorInput, { target: { value: 'Arthur' } });
        fireEvent.change(titleInput, { target: { value: 'Sherlock Holmes' } });
        const button = getByRole('button', {name: 'Add'});
        button.click();
        expect(mockAddBook).toBeCalledTimes(1);
        await waitFor( () => expect(mockPut).toBeCalledTimes(1));
        await waitFor(() => expect(mockSetModal).toBeCalledTimes(1));
    });
});