import { useRef, useState } from "react";
import { AiOutlineLogin } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Alert,
  VStack,
  AlertTitle,
  Button,
  AlertIcon,
  Heading,
  Wrap,
  Divider,
  ButtonGroup,
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

  async function handleSubmit() {
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
        <Heading as="h1">Login</Heading>
        {width < 600 && (
          <Image
            boxSize="100px"
            objectFit="cover"
            src={require("../../static/logo.png")}
          />
        )}
      </HStack>

      <Divider h="1px" color="gray" />
      <form onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
        <FormControl isRequired isInvalid={missingEmail}>
          <FormLabel>Email Address</FormLabel>
          <Input bg="white" border="solid" type="email" ref={emailRef} />
          <FormErrorMessage>Email is required</FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={missingPassword}>
          <FormLabel>Password</FormLabel>
          <Input bg="white" border="solid" type="password" ref={passwordRef} />
          <FormErrorMessage>Password is required</FormErrorMessage>
        </FormControl>

        <VStack align="stretch">
          <Link to="/resetpassword">
            <Text fontSize="xs">Forgot Password?</Text>
          </Link>
          <Button
            colorScheme="teal"
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handleSubmit}
            marginTop={7}
          >
            Login
          </Button>
          <Button colorScheme="pink" onClick={() => navigate("/register")}>
            Register
          </Button>
        </VStack>
      </form>
    </VStack>
  );
}

export default LoginForm;
