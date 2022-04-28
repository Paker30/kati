import React from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import useCredentials from 'hooks/useCredentials';

export default function Login() {

  const { setCredentials } = useCredentials();
  const handleSuccess = (response) => {
    setCredentials(response);
  };

  const handleFailure = (response) => {
    console.error(response);
    setCredentials({});
  };

  return (
    <div>
      <GoogleLogin
        clientId="700033872626-pqcb1sglplgciuujlpjql7p5bmrcdns8.apps.googleusercontent.com"
        scope='https://www.googleapis.com/auth/drive.appdata'
        buttonText="Login"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
