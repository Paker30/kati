import { useContext } from 'react';
import UserContext from '../context/credentials';

export default function useCredentials () {
    const { credentials, setCredentials } = useContext(UserContext);

    return { credentials, setCredentials };
};