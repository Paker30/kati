import { fireEvent, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Login from './index';

let mockSetCredentials = jest.fn();
const mockCredentials = { access_token: '' }

jest.mock('wouter');
jest.mock('@react-oauth/google');
jest.mock('../../hooks/useCredentials', () => () => ({
    credentials: mockCredentials,
    setCredentials: mockSetCredentials
}));

import { useLocation } from 'wouter';
import { useGoogleLogin  } from '@react-oauth/google';

describe('Add component', () => {
    beforeEach(() => {
        mockSetCredentials.mockRestore();
        mockCredentials.access_token = '';
    });

    describe('render', () => {
        test('user is log out', async () => {
            const mockPushLocation = jest.fn();
            const sparseArray = new Array(2);
            sparseArray[1] = mockPushLocation;
            useLocation.mockReturnValue(sparseArray);
            const { findByText, findByRole } = render(<Login />);
            expect(mockPushLocation).toHaveBeenCalledTimes(0);
            expect(await findByRole('button')).toBeVisible();
            expect(await findByText('Sign in with Google')).toBeVisible();
        });

        test('user is log in', async () => {
            const mockPushLocation = jest.fn();
            const sparseArray = new Array(2);
            sparseArray[1] = mockPushLocation;
            useLocation.mockReturnValue(sparseArray);
            mockCredentials.access_token = 'fake access token'
            const { findByText, findByRole } = render(<Login />);
            expect(mockPushLocation).toHaveBeenCalledTimes(1);
            expect(mockPushLocation).toHaveBeenCalledWith('/');
            expect(await findByRole('button')).toBeVisible();
            expect(await findByText('Sign in with Google')).toBeVisible();
        });
    });
});