import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Book from './index';

let mockPut = jest.fn().mockResolvedValue(true);
let mockSetRead;

jest.mock('../../hooks/useRemote', () => () => ({
    sync: { put: mockPut }
}));
jest.mock('../../hooks/useBooks', () => ({
    useBooks: () => ({ setRead: mockSetRead})
}));

describe('Add component', () => {
    beforeEach(() => {
        mockPut.mockRestore();
    });
    describe('render', () => {
        test('read', async () => {
            mockSetRead = jest.fn().mockResolvedValue({ id: 'fake id', rev: 'fake rev'});
            const { findByText, findByPlaceholderText, getByRole } = render(<Book title="Valor y al toro" author="Francisco Ibañez" isRead={true} id="fake-id"/>);
            expect(mockPut).toBeCalledTimes(0);
            expect(mockSetRead).toBeCalledTimes(0);
            expect(await findByText('Valor y al toro')).toBeVisible();
            expect(await findByText('Francisco Ibañez')).toBeVisible();
            expect(await findByText('📖')).toBeVisible();
            const button = getByRole('button', {name: '📖'});
            button.click();
            expect(mockSetRead).toBeCalledTimes(1);
            await waitFor( () => expect(mockPut).toBeCalledTimes(1));
        });

        test('not read', async () => {
            mockSetRead = jest.fn().mockResolvedValue({ id: 'fake id', rev: 'fake rev'});
            const { findByText, findByPlaceholderText, getByRole } = render(<Book title="Valor y al toro" author="Francisco Ibañez" isRead={false} id="fake-id"/>);
            expect(mockPut).toBeCalledTimes(0);
            expect(mockSetRead).toBeCalledTimes(0);
            expect(await findByText('Valor y al toro')).toBeVisible();
            expect(await findByText('Francisco Ibañez')).toBeVisible();
            expect(await findByText('📘')).toBeVisible();
            const button = getByRole('button', {name: '📘'});
            button.click();
            expect(mockSetRead).toBeCalledTimes(1);
            await waitFor( () => expect(mockPut).toBeCalledTimes(1));
        });
    });
});