import React from 'react';
import ReactDOM from 'react-dom';
import { Auth0Provider } from "@auth0/auth0-react";

import App from './App.js';


ReactDOM.render(
  <Auth0Provider
    domain="dev-j-1d-jgx.us.auth0.com"
    clientId="dJVQIE1fnNyIOZKHk1UAMsqPyF2TyS1A"
    redirectUri="http://localhost:3000"
  >
    <App />
  </Auth0Provider>,
  document.getElementById("root")
);