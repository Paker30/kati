import React from 'react';
import { GoogleLogin, useGoogleLogin } from 'react-google-login';
import useCredentials from 'hooks/useCredentials';

export default function Login() {

  const { setCredentials } = useCredentials();
  const handleSuccess = (response) => {
    console.log(response);
    setCredentials(response.profileObj);
  };

  const handleFailure = (response) => {
    console.log(response);
    setCredentials({});
  };

  return (
    <div>
      <GoogleLogin
        clientId="700033872626-p4lqikt2b2k9eekcf578v58rt0o4mepp.apps.googleusercontent.com"
        buttonText="Login"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  )
}
