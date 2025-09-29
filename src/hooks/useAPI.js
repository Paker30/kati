import { useContext } from 'react';
import { ContextAPI } from '../context/books';

export const useAPI = () => useContext(ContextAPI);