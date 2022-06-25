import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  VStack,
  Divider,
  Flex,
  Text,
} from "@chakra-ui/react";

function ResetPasswordForm(props) {
  const emailRef = useRef();
  const navigate = useNavigate();
  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [missingEmail, setMissingEmail] = useState(false);

  async function handleSubmit() {
    setIsLoading(false);
    setSuccess(false);
    setMissingEmail(false);

    if (emailRef.current.value == "") {
      setMissingEmail(true);
      return;
    }

    try {
      setIsLoading(true);
      await resetPassword(emailRef.current.value);
      setError("");
      setSuccess(true);
    } catch {
      setError("Account does not exist");
    }

    setIsLoading(false);
  }

  return (
    <VStack align="stretch">
      <Heading as="h1">Reset Password</Heading>
      <Divider />
      <form onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
        <FormControl isRequired isInvalid={missingEmail}>
          <FormLabel>Email Address</FormLabel>
          <Input
            bg="white"
            borderW="1px"
            type="email"
            ref={emailRef}
            errorBorderColor="red.300"
          />
          <FormErrorMessage>Email is required</FormErrorMessage>
        </FormControl>
        <Button
          colorScheme="red"
          isLoading={isLoading}
          isDisabled={isLoading}
          onClick={handleSubmit}
          marginTop={7}
          width="100%"
        >
          Reset Password
        </Button>
      </form>
      <Flex align="center">
        <Divider />
        <Text padding={2}>or</Text>
        <Divider />
      </Flex>
      <Button colorScheme="teal" onClick={() => navigate("/login")}>
        Login
      </Button>
    </VStack>
  );
}

export default ResetPasswordForm;
