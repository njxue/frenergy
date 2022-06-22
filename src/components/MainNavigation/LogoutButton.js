import { Tooltip, Icon, HStack, Text } from "@chakra-ui/react";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../../contexts/AuthContext";
import { useError } from "../../utils/helper";

function LogoutButton(props) {
  const { withText } = props;
  const { logout } = useAuth();
  const { setError } = useError();

  async function handleLogout() {
    try {
      setError("");
      await logout();
    } catch {
      setError("Failed to logout");
    }
  }

  return (
    <Tooltip label="Logout" shouldWrapChildren>
      <HStack align="center">
        <Icon
          as={IoIosLogOut}
          boxSize={6}
          onClick={handleLogout}
          cursor="pointer"
        />
        {withText && <Text>Logout</Text>}
      </HStack>
    </Tooltip>
  );
}

export default LogoutButton;
