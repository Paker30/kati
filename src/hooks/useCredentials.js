import { useContext } from 'react';
import UserContext from '../context/credentials';
import { useGoogleLogin } from 'react-google-login';

export default function useCredentials () {
    const { credentials, setCredentials } = useContext(UserContext);

    return { credentials, setCredentials };
};