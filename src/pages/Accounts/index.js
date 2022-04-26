import React from 'react';
import Login from 'components/Login';
import LogOut from 'components/Logout';
import { useGoogleLogin, useGoogleLogout } from 'react-google-login';

export default function Accounts() {
  const { loaded: sigIn } = useGoogleLogin({});
  const { loaded: sigOff } = useGoogleLogout({});
  console.log(sigIn);
  console.log(sigOff);
  return (
    <>
      <Login />
      <LogOut />
    </>
  )
};
