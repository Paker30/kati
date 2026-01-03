import React from 'react';
import {vi} from 'vitest';
import { render, screen } from '@testing-library/react';
import {ListOfBooks} from './index';
import { test, expect} from 'vitest';

vi.mock('../../components/Book', () => ({ 'Book': () => <div data-testid="book">Mocked Book</div> }));

describe('List of books', () => {
    describe('render', () => {
        test('empty', () => {
            render(<ListOfBooks books={[]} />);
            expect(screen.queryByTestId('book')).toBeNull();
        });

        test('there are books', () => {
            render(<ListOfBooks books={[{
                id: 'fake-id',
                title: 'Valor y al toro',
                author: 'Author: Francisco Ibañez',
                isRead: false
            }]} />);
            expect(screen.getByTestId('book')).toBeInTheDocument();
        });
    });
});