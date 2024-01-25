import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import ListOfBooks from './index';

jest.mock('components/Book');

import Book from 'components/Book';

describe('List of books', () => {
    describe('render', () => {
        test('empty', async () => {
            Book.mockReturnValue();
            render(<ListOfBooks books={[]} />);
            expect(Book).toHaveBeenCalledTimes(0);
        });

        test('there are books', async () => {
            Book.mockReturnValue();
            render(<ListOfBooks books={[{
                id: 'fake-id',
                title: 'Valor y al toro',
                author: 'Author: Francisco Ibañez',
                isRead: false
            }]} />);
            expect(Book).toHaveBeenCalledTimes(1);
        });
    });
});