import React from "react";
import { HeadProvider, Meta } from "react-head";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from "@react-oauth/google";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <HeadProvider>
    <Meta
      name="google-signin-client_id"
      content="700033872626-3luf86l08cdbcr5a1r3ktbf3i2tfrm9l.apps.googleusercontent.com"
    />
    <React.StrictMode>
      <GoogleOAuthProvider clientId="700033872626-3luf86l08cdbcr5a1r3ktbf3i2tfrm9l.apps.googleusercontent.com">
        <App />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </HeadProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
