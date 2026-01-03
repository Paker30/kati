import React from 'react';
import { screen, render } from '@testing-library/react';
import {describe, test, expect, vi} from 'vitest';
import Add from './index';

const mockPut = vi.fn(() => true);
const mockSetModal = vi.fn();
const mockAddBook = vi.fn().mockResolvedValue({ id: 'fake id', rev: 'fake rev'});

vi.mock('../../hooks/useRemote', () => ({
    default: () => ({async: { put: mockPut }})
}));
vi.mock('../../hooks/useModal', () => ({
    default: () => ({
    showModal: false,
    setModal: mockSetModal
})
}));
vi.mock('../../hooks/useBooks', () => ({
    useBooks: () => ({ addBook: mockAddBook})
}));

describe('Add component', () => {
    beforeEach(() => {
        mockPut.mockRestore();
        mockSetModal.mockRestore();
        mockAddBook.mockRestore();
    });

    test('render', async () => {
        render(<Add />);
        expect(mockPut).toBeCalledTimes(0);
        expect(mockSetModal).toBeCalledTimes(0);
        expect(mockAddBook).toBeCalledTimes(0);
        expect(await screen.findByText('Author')).toBeVisible();
        expect(await screen.findByText('Title')).toBeVisible();
        expect(await screen.findByText('Add')).toBeVisible();
        expect(await screen.findByPlaceholderText('Enter author')).toBeVisible();
        expect(await screen.findByPlaceholderText('Enter title')).toBeVisible();
    });
});