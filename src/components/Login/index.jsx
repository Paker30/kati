import React, { useEffect } from 'react';
import { useLocation } from 'wouter';
import { useGoogleLogin  } from '@react-oauth/google';
import useCredentials from '../../hooks/useCredentials';

export default function Login() {

  const { setCredentials, credentials } = useCredentials();
  const [_,pushLocation] = useLocation();

  const login = useGoogleLogin({
    onSuccess: setCredentials,
  });

  useEffect(() => {
    if (credentials.access_token) {
      pushLocation('/');
    }
  }, [credentials, pushLocation]);

  return (
    <div>
      <button onClick={ () => login() }>
        Sign in with Google
      </button>
    </div>
  )
}
