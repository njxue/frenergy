import { HStack, Wrap, Box, Center, Image, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSuccess, useWindowDimensions } from "../../utils/helper";
import PreLoginLayout from "../layout/PreLoginLayout";
import LoginForm from "./LoginForm";

function Login() {
  return (
    <PreLoginLayout>
      <LoginForm />
    </PreLoginLayout>
  );
}

export default Login;
