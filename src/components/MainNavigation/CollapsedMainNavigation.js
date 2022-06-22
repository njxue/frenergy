import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import NotificationsDrawer from "./NotificationsDrawer";
import ProfileButton from "./ProfileButton";
import SearchUsers from "./SearchUsers";
import { HamburgerIcon } from "@chakra-ui/icons";

function CollapsedMainNavigation() {
  const navigate = useNavigate();
 
  return (
    <Menu>
      <MenuButton as={HamburgerIcon}></MenuButton>
      <MenuList bg="#051e3e">
        <MenuItem>
          <SearchUsers
            handleClick={(userData) => navigate(`/users/${userData.username}`)}
          />
        </MenuItem>
        <MenuItem>
          <NotificationsDrawer withText />
        </MenuItem>
        <MenuItem>
          <ProfileButton withText />
        </MenuItem>
        <MenuItem>
          <LogoutButton withText />
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default CollapsedMainNavigation;
