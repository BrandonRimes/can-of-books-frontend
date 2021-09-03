import { useAuth0 } from "@auth0/auth0-react";

import Button from 'react-bootstrap/Button';


const LoginButton = (props) => {
  const { loginWithRedirect } = useAuth0();
  return <Button onClick={() => loginWithRedirect()}>Login</Button>;
}

export default LoginButton;
