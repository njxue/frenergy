import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";
import Loader from "./layout/Loader";
import { Outlet } from "react-router-dom";
import Banner from "./layout/Banner";
import { VStack, Box, StackItem } from "@chakra-ui/react";

function PrivateRoute() {
  const { loggedIn } = useAuth();

  if (loggedIn == undefined) {
    return <Loader />;
  }
  return (
    <Box margin={0} padding={0} maxW="100vw">
      {loggedIn ? (
        <VStack h="100%" align="stretch" spacing={0}>
          <StackItem h="15%">
            <Banner />
          </StackItem>
          <StackItem h="85%">
            <Outlet />
          </StackItem>
        </VStack>
      ) : (
        <Login />
      )}
    </Box>
  );
}

export default PrivateRoute;
