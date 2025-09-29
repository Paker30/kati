import { useContext } from 'react';
import { ContextData } from '../context/books';

export const useData = () => useContext(ContextData);