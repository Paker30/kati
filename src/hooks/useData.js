import { useContext } from 'react';
import { ContextData } from '../context/kati';

export const useData = () => useContext(ContextData);