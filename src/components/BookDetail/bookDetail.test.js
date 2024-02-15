import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import BookDetail from './index';

describe('Book detail', () => {
    describe('render', () => {
        test('read', async () => {
            const { findByText, findByPlaceholderText, getByRole } = render(<BookDetail title="Valor y al toro" author="Francisco Ibañez" isReaded={true}/>);
            expect(await findByText('Valor y al toro')).toBeVisible();
            expect(await findByText('Author: Francisco Ibañez')).toBeVisible();
            expect(await findByText('📖')).toBeVisible();
        });

        test('not read', async () => {
            const { findByText, findByPlaceholderText, getByRole } = render(<BookDetail title="Valor y al toro" author="Francisco Ibañez" isReaded={false} id="fake-id"/>);
            expect(await findByText('Valor y al toro')).toBeVisible();
            expect(await findByText('Author: Francisco Ibañez')).toBeVisible();
            expect(await findByText('📘')).toBeVisible();
        });
    });
});