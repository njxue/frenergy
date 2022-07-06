import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Button,
  Heading,
  Divider,
  VStack,
  Text,
  Flex,
  InputGroup,
  InputLeftElement,
  Icon,
} from "@chakra-ui/react";
import { useSuccess, useError } from "../../utils/helper";
import { EmailIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import { AiFillLock } from "react-icons/ai";

function RegisterForm() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordcfRef = useRef();
  const [username, setUsername] = useState("");

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
    usernamesRef.on("value", (snapshot) => {
      if (snapshot.exists() && snapshot.val()[username]) {
        setUsernameTaken(true);
      } else {
        setUsernameTaken(false);
      }
    });
  }, [username]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setIsLoading(false);
    setSuccess(false);
    setMissingEmail(false);
    setMissingUsername(false);

    const password = passwordRef.current.value;
    const passwordCf = passwordcfRef.current.value;
    const trimmedUsername = username.trim();
    const email = emailRef.current.value;

    if (usernameTaken) {
      return;
    }

    if (password.length < 6) {
      setError("Password must have at least 6 characters");
      return;
    }

    if (password !== passwordCf) {
      setError("Passwords do not match!");
      return;
    }

    if (trimmedUsername.length == 0) {
      setError("Username must contain at least 1 non-empty character!");
      return;
    }

    if (email == "") {
      setMissingEmail(true);
      return;
    }

    if (email.substring(email.indexOf("@") + 1) != "u.nus.edu") {
      setError("This email is not a valid NUS email address!");
      return;
    }

    setIsLoading(true);
    await register(email, password, trimmedUsername);

    setIsLoading(false);
  }

  return (
    <VStack align="stretch">
      <Heading as="h1" data-testid="header">
        Register
      </Heading>
      <Divider />
      <form
        onSubmit={handleSubmit}
        style={{ paddingTop: "10px" }}
        data-testid="form"
      >
        <VStack>
          <FormControl isRequired isInvalid={missingEmail}>
            <FormLabel>Email Address</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<EmailIcon />} />
              <Input
                bg="white"
                borderWidth="1px"
                type="email"
                ref={emailRef}
                errorBorderColor="red.300"
              />
            </InputGroup>
            <FormErrorMessage>Email is required</FormErrorMessage>
          </FormControl>
          <FormControl isRequired isInvalid={missingUsername || usernameTaken}>
            <FormLabel>Username</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={FaUser} />}
              />
              <Input
                bg="white"
                borderWidth="1px"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                errorBorderColor="red.300"
              />
            </InputGroup>
            <FormErrorMessage>
              {missingUsername
                ? "Username is required"
                : "This username has been taken"}
            </FormErrorMessage>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={AiFillLock} />}
              />
              <Input
                bg="white"
                borderWidth="1px"
                type="password"
                ref={passwordRef}
                width="auto"
                errorBorderColor="red"
              />
            </InputGroup>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<Icon as={AiFillLock} />}
              />
              <Input
                bg="white"
                borderWidth="1px"
                type="password"
                ref={passwordcfRef}
                errorBorderColor="red"
              />
            </InputGroup>
          </FormControl>
        </VStack>
        <Button
          colorScheme="pink"
          isLoading={isLoading}
          isDisabled={isLoading}
          type="submit"
          marginTop={7}
          width="100%"
          data-testid="register-btn"
        >
          Register
        </Button>
        <Flex align="center">
          <Divider />
          <Text padding={2}>or</Text>
          <Divider />
        </Flex>
        <Button
          colorScheme="teal"
          onClick={() => navigate("/login")}
          w="100%"
          data-testid="login-btn"
        >
          Login
        </Button>
      </form>
    </VStack>
  );
}

export default RegisterForm;
