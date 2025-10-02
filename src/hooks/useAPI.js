import { useContext } from 'react';
import { ContextAPI } from '../context/kati';

export const useAPI = () => useContext(ContextAPI);