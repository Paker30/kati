import React from 'react';
import { render, screen } from '@testing-library/react';
import {vi, describe, test} from 'vitest';
import Login from './index';

const mockSetCredentials = vi.fn();
const mockPushLocation = vi.fn();
const mockCredentials = { access_token: '' }

vi.mock('wouter', () => ({
    useLocation: () => [null, mockPushLocation]
}));
vi.mock('@react-oauth/google');
vi.mock('../../hooks/useCredentials', () => ({
    useCredentials: () => ({
    credentials: mockCredentials,
    setCredentials: mockSetCredentials
})
}));

describe('Add component', () => {
    beforeEach(() => {
        mockSetCredentials.mockRestore();
        mockPushLocation.mockRestore();
        mockCredentials.access_token = '';
    });

    describe('render', () => {
        test('user is log out', async () => {
            const sparseArray = new Array(2);
            sparseArray[1] = mockPushLocation;
            mockPushLocation.mockReturnValue(sparseArray);
            render(<Login />);
            expect(mockPushLocation).toHaveBeenCalledTimes(0);
            expect(await screen.findByRole('button')).toBeVisible();
            expect(await screen.findByText('Sign in with Google')).toBeVisible();
        });

        test('user is log in', async () => {
            const sparseArray = new Array(2);
            sparseArray[1] = mockPushLocation;
            mockPushLocation.mockReturnValue(sparseArray);
            mockCredentials.access_token = 'fake access token'
            render(<Login />);
            expect(mockPushLocation).toHaveBeenCalledTimes(1);
            expect(mockPushLocation).toHaveBeenCalledWith('/');
            expect(await screen.findByRole('button')).toBeVisible();
            expect(await screen.findByText('Sign in with Google')).toBeVisible();
        });
    });
});