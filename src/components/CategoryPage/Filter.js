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
import { MdFilterList } from "react-icons/md";

function Filter(props) {
  const { setFilterOption } = props;

  const now = new Date();
  const today = now.setHours(0, 0, 0, 0);
  const thisWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + (now.getDay() == 0 ? -6 : 1)
  ).getTime();

  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const filter = { today: today, week: thisWeek, month: thisMonth, all: 0 };

  return (
    <Menu closeOnSelect={true}>
      <Tooltip label="Filter">
        <MenuButton
          as={Button}
          bg="transparent"
          _hover={{ backgroundColor: "transparent" }}
          _focus={{ backgroundColor: "transparent" }}
          _active={{ backgroundColor: "transparent" }}
        >
          <Icon as={MdFilterList} />
        </MenuButton>
      </Tooltip>
      <MenuList>
        <MenuOptionGroup
          defaultValue="all"
          type="radio"
          onChange={(e) => setFilterOption(filter[e])}
        >
          <MenuItemOption value="today" data-testId="today">
            Today
          </MenuItemOption>
          <MenuItemOption value="week" data-testId="week">
            This Week
          </MenuItemOption>
          <MenuItemOption value="month" data-testId="month">
            This Month
          </MenuItemOption>
          <MenuItemOption value="all" data-testId="all">
            All
          </MenuItemOption>
        </MenuOptionGroup>
      </MenuList>
    </Menu>
  );
}

export default Filter;
