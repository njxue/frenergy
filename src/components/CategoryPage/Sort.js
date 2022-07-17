import {
  Menu,
  MenuButton,
  Icon,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { MdSort } from "react-icons/md";

function Sort(props) {
  const { setSortOption } = props;
  const sort = { asc: 0, dsc: 1 };
  return (
    <Menu closeOnSelect={true}>
      <Tooltip label="Sort">
        <MenuButton
          as={Button}
          bg="transparent"
          _hover={{ backgroundColor: "transparent" }}
          _focus={{ backgroundColor: "transparent" }}
          _active={{ backgroundColor: "transparent" }}
        >
          <Icon as={MdSort} />
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuOptionGroup
          defaultValue="asc"
          type="radio"
          onChange={(e) => setSortOption(sort[e])}
        >
          <MenuItemOption value="asc" data-testid="asc">Most Recent</MenuItemOption>
          <MenuItemOption value="dsc" data-testid="dsc">Oldest</MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}
export default Sort;
