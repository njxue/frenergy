import { useRef, useState } from "react";

import classes from "../../static/Auth.module.css";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Alert,
  AlertTitle,
  Button,
  AlertIcon,
  Heading,
  Wrap,
} from "@chakra-ui/react";
import { useError } from "../../utils/helper";
function LoginForm() {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const { setError } = useError();
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setIsLoading(true);
    setMissingEmail(false);
    setMissingPassword(false);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email == "") {
      setMissingEmail(true);
    }

    if (password == "") {
      setMissingPassword(true);
    }

    try {
      setIsLoading(true);

      await login(email, password);
      navigate("/");
    } catch {
      setError("Failed to Login");
    }
    setIsLoading(false);
  }

  return (
    <>
      <Wrap justify="center" align="center" direction="column">
        <Heading as="h1">Login</Heading>
        <form onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
          <FormControl isRequired isInvalid={missingEmail}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" ref={emailRef} />
            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={missingPassword}>
            <FormLabel>Password</FormLabel>
            <Input type="password" ref={passwordRef} />
            <FormErrorMessage>Password is required</FormErrorMessage>
          </FormControl>

          <Button
            colorScheme="red"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handleSubmit}
            marginTop={7}
            width="100%"
          >
            Login
          </Button>
        </form>
        <div className={classes.links}>
          Need an account? <Link to="/register">Register here!</Link>
        </div>
        <div className={classes.links}>
          Forgot password? <Link to="/resetpassword">Reset password here</Link>
        </div>
      </Wrap>
    </>
  );
}

export default LoginForm;
