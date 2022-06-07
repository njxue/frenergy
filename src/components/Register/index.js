import { useEffect, useRef, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
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
import { useSuccess, useError } from "../../utils/helper";

function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordcfRef = useRef();
  const [username, setUsername] = useState();

  const usernamesRef = ref.child("usernames");
  const { register } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingUsername, setMissingUsername] = useState(false);
  const [usernameTaken, setUsernameTaken] = useState(false);
  const { setSuccess } = useSuccess();
  const { setError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    console.log(username);
    usernamesRef.on("value", (snapshot) => {
      if (snapshot.exists() && snapshot.val()[username]) {
        setUsernameTaken(true);
      } else {
        setUsernameTaken(false);
      }
    });
  }, [username]);

  async function handleSubmit() {
    setError("");
    setIsLoading(false);
    setSuccess(false);
    setMissingEmail(false);
    setMissingUsername(false);

    if (usernameTaken) {
      return;
    }

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

    if (username == "") {
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
        username
      );
      navigate("/profile", { state: { fromRegistration: true } });
    } catch {
      setError("Failed to Register");
    }

    setIsLoading(false);
  }

  return (
    <>
      <Wrap justify="center" align="center" direction="column">
        <Heading as="h1">Register</Heading>
        <form onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
          <FormControl isRequired isInvalid={missingEmail}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" ref={emailRef} errorBorderColor="red.300" />
            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={missingUsername || usernameTaken}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              errorBorderColor="red.300"
            />
            <FormErrorMessage>
              {missingUsername
                ? "Username is required"
                : "This username has been taken"}
            </FormErrorMessage>
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
