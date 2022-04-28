import React from 'react';
import { GoogleLogout } from 'react-google-login';
import useCredentials from 'hooks/useCredentials';

export default function Login() {

    const { setCredentials } = useCredentials();

    const handleSuccess = (response) => {
        setCredentials({});
    };

    return (
        <div>
            <GoogleLogout
                clientId="700033872626-p4lqikt2b2k9eekcf578v58rt0o4mepp.apps.googleusercontent.com"
                buttonText="Logout"
                onLogoutSuccess={handleSuccess}
            >
            </GoogleLogout>
        </div>
    )
}
