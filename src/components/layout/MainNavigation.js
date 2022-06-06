import {
  Button,
  IconButton,
  Alert,
  AlertIcon,
  AlertTitle,
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import NotificationsDrawer from "./NotificationsDrawer";
import { HStack } from "@chakra-ui/react";
import SearchUsers from "./SearchUsers";


function MainNavigation() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [error, setError] = useState("");

  async function handleLogout() {
    try {
      setError("");
      await logout().then(() => navigate("/login"));
    } catch {
      setError("Failed to logout");
    }
  }
  return (
    <>
      {error && (
        <Alert>
          <AlertIcon />
          <AlertTitle>{error}</AlertTitle>
        </Alert>
      )}
      <HStack spacing={6} padding={3}>
        <SearchUsers />
        <NotificationsDrawer />
        <Button
          color="white"
          variant="link"
          onClick={() => navigate("/profile")}
        >
          Profile
        </Button>
        <Button color="white" variant="link" onClick={handleLogout}>
          Logout
        </Button>
      </HStack>
    </>
  );
}

export default MainNavigation;
