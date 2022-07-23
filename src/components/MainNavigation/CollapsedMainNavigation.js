import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import NotificationsDrawer from "./NotificationsDrawer";
import ProfileButton from "./ProfileButton";
import SearchUsers from "./SearchUsers";
import { HamburgerIcon } from "@chakra-ui/icons";

function CollapsedMainNavigation() {
  const navigate = useNavigate();

  return (
    <Menu align="stretch">
      <MenuButton as={HamburgerIcon}></MenuButton>
      <MenuList bg="#051e3e" align="stretch">
        <VStack
          align="stretch"
          divider={<StackDivider borderColor="gray.300" />}
          padding={2}
        >
          <SearchUsers
            handleClick={(userData) => navigate(`/users/${userData.username}`)}
          />

          <NotificationsDrawer withText />

          <ProfileButton withText />

          <LogoutButton withText />
        </VStack>
      </MenuList>
    </Menu>
  );
}

export default CollapsedMainNavigation;
