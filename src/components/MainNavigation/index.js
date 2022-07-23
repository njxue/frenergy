import { useNavigate } from "react-router-dom";

import NotificationsDrawer from "./NotificationsDrawer";
import { HStack, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import SearchUsers from "./SearchUsers";

import ProfileButton from "./ProfileButton";

import LogoutButton from "./LogoutButton";

function MainNavigation() {
  const navigate = useNavigate();

  return (
    <>
      <HStack spacing={6} padding={3}>
        <SearchUsers
          handleClick={(userData) => navigate(`/users/${userData.username}`)}
        />
        <ProfileButton />
        <NotificationsDrawer />
        <LogoutButton />
      </HStack>
    </>
  );
}

export default MainNavigation;
