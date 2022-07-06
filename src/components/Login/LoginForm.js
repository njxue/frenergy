import { useRef, useState } from "react";

import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  VStack,
  Button,
  Heading,
  Divider,
  HStack,
  Text,
  Image,
} from "@chakra-ui/react";
import { useError, useWindowDimensions } from "../../utils/helper";

function LoginForm() {
  const navigate = useNavigate();
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const { setError } = useError();
  const { width } = useWindowDimensions();
  const [missingEmail, setMissingEmail] = useState(false);
  const [missingPassword, setMissingPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsLoading(true);
    setMissingEmail(false);
    setMissingPassword(false);

    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    if (email + password == "") {
      setMissingEmail(true);
      setMissingPassword(true);
      setIsLoading(false);
      return;
    }

    if (email == "") {
      setMissingEmail(true);
      setIsLoading(false);
      return;
    }

    if (password == "") {
      setMissingPassword(true);
      setIsLoading(false);
      return;
    }

    await login(email, password).then(() => navigate("/"));
    setIsLoading(false);
  }

  return (
    <VStack align="stretch">
      <HStack>
        <Heading as="h1" data-testid="header">
          Login
        </Heading>
        {width < 600 && (
          <Image
            boxSize="100px"
            objectFit="cover"
            src={require("../../static/logo.png")}
          />
        )}
      </HStack>

      <Divider h="1px" color="gray" />
      <form
        onSubmit={handleSubmit}
        style={{ paddingTop: "10px" }}
        data-testid="form"
      >
        <FormControl isInvalid={missingEmail}>
          <FormLabel>Email Address</FormLabel>
          <Input
            bg="white"
            border="solid"
            type="email"
            ref={emailRef}
            data-testid="email-input"
          />
          <FormErrorMessage data-testid="email-error">
            Email is required
          </FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={missingPassword}>
          <FormLabel>Password</FormLabel>

          <Input
            bg="white"
            border="solid"
            type="password"
            ref={passwordRef}
            data-testid="password-input"
          />

          <FormErrorMessage data-testid="password-error">
            Password is required
          </FormErrorMessage>
        </FormControl>

        <VStack align="stretch">
          <Link to="/resetpassword">
            <Text fontSize="xs">Forgot Password?</Text>
          </Link>
          <Button
            colorScheme="teal"
            type="submit"
            isLoading={isLoading}
            isDisabled={isLoading}
            marginTop={7}
            data-testid="login-btn"
          >
            Login
          </Button>
          <Button
            colorScheme="pink"
            onClick={() => navigate("/register")}
            data-testid="register-btn"
          >
            Register
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export default LoginForm;
