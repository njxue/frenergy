import { useRef, useState } from "react";
import { Link } from "react-router-dom";
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

function ResetPassword(props) {
  const emailRef = useRef();

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
          <AlertTitle>
            Instructions for password reset has been sent to your email!
          </AlertTitle>
        </Alert>
      )}
      <Wrap justify="center" align="center" direction="column">
        <Heading as="h1">Reset Password</Heading>
        <form onSubmit={handleSubmit} style={{ paddingTop: "10px" }}>
          <FormControl isRequired isInvalid={missingEmail}>
            <FormLabel>Email Address</FormLabel>
            <Input type="email" ref={emailRef} errorBorderColor="red.300" />
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
          <div className={classes.links}>
            Click <Link to="/login">here</Link> to login
          </div>
        </form>
      </Wrap>
    </>
  );
}

export default ResetPassword;
