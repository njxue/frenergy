import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Padder from "../layout/Padder";
import classes from "../../static/Auth.module.css";
import { useAuth } from "../../contexts/AuthContext";
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
  AlertDescription,
} from "@chakra-ui/react";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordcfRef = useRef();
  const usernameRef = useRef();

  const { register } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingUsername, setMissingUsername] = useState(false);

  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError("");
    setIsLoading(false);
    setSuccess(false);
    setMissingEmail(false);
    setMissingUsername(false);

    if (passwordRef.current.value !== passwordcfRef.current.value) {
      setError("Passwords do not match!");
      setIsLoading(false);
      return;
    }

    if (passwordRef.current.value.length < 6) {
      setError("Password must have at least 6 characters");
      setIsLoading(false);
      return;
    }

    if (usernameRef.current.value == "") {
      setMissingUsername(true);
      return;
    }

    if (emailRef.current.value == "") {
      setMissingEmail(true);
      return;
    }

    try {
      setError("");
      setIsLoading(true);
      await register(
        emailRef.current.value,
        passwordRef.current.value,
        usernameRef.current.value
      );
      setSuccess(true);
    } catch {
      setError("Failed to Register");
    }

    setIsLoading(false);
  }

  return (
    <>
      {error && (
        <Alert status="error">
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      {success && (
        <Alert status="success">
          <AlertIcon />
          <AlertTitle>Yay! Your account has been created!</AlertTitle>
          <AlertDescription>
            Click <Link to="/login">here</Link> to login
          </AlertDescription>
        </Alert>
      )}
      <Wrap justify="center" align="center" direction="column">
        <Heading as="h1">Register</Heading>
        <form onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
          <FormControl isRequired isInvalid={missingEmail}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" ref={emailRef} errorBorderColor="red.300" />
            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={missingUsername}>
            <FormLabel>Username</FormLabel>
            <Input type="text" ref={usernameRef} errorBorderColor="red.300" />
            <FormErrorMessage>Username is required</FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              ref={passwordRef}
              width="auto"
              errorBorderColor="red"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <Input type="password" ref={passwordcfRef} errorBorderColor="red" />
          </FormControl>

          <Button
            colorScheme="red"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handleSubmit}
            marginTop={7}
            width="100%"
          >
            Register
          </Button>
        </form>
        <div className={classes.links}>
          Already have an account? <Link to="/login">Login</Link>
        </div>
      </Wrap>
    </>
  );
}

export default Register;
