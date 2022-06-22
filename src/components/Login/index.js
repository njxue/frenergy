import { HStack, Wrap } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSuccess } from "../../utils/helper";
import LoginForm from "./LoginForm";

function Login() {
  const { setSuccess } = useSuccess();
  const { state } = useLocation();

  useEffect(() => {
    if (state && state.fromRegistration) {
      setSuccess(
        "Yay! Your account has been created"
      );
    }
  }, []);

  return <LoginForm />;
}

export default Login;
