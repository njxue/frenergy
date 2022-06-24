import { HStack, Wrap, Box, Center, Image, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSuccess, useWindowDimensions } from "../../utils/helper";
import LoginForm from "./LoginForm";

function Login() {
  const { setSuccess } = useSuccess();
  const { state } = useLocation();
  const { width } = useWindowDimensions();
  useEffect(() => {
    if (state && state.fromRegistration) {
      setSuccess("Yay! Your account has been created");
    }
  }, []);

  return (
    <Center bg="#051e3e" h="100vh">
      <Box
        justifyContent="center"
        borderRadius="70px"
        bg="white"
        paddingRight={10}
        paddingLeft={10}
      >
        <Flex direction="row" align="center">
          {width >= 600 && (
            <Box>
              <Image
                boxSize="100%"
                objectFit="contain"
                src={require("../../static/logo.png")}
              />
            </Box>
          )}

          <Box padding={10} shadow="md" bg="#f0ecec">
            <LoginForm />
          </Box>
        </Flex>
      </Box>
    </Center>
  );
}

export default Login;
