import {
  Button,
  Heading,
  Flex,
  Spacer,
  useDisclosure,
  VStack,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  Icon,
  Tooltip,
  MenuOptionGroup,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useParams, Outlet } from "react-router-dom";
import { MdSort, MdFilterList } from "react-icons/md";
import { CATEGORIES } from "../../api/customapi";

import DoesNotExist from "../layout/DoesNotExist";

import ThreadsList from "./ThreadsList";

function CategoryMain(props) {
  const { category } = props;
  const { moduleCode } = useParams();
  //console.log(category + moduleCode);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filterOption, setFilterOption] = useState(3);
  const [sortOption, setSortOption] = useState(0);

  const now = new Date();
  const today = now.setHours(0, 0, 0, 0);
  const thisWeek = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() - now.getDay() + (now.getDay() == 0 ? -6 : 1)
  ).getTime();

  const thisMonth = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const filter = { today: today, week: thisWeek, month: thisMonth, all: 0 };
  const sort = { asc: 0, dsc: 1 };

  return !CATEGORIES.includes(category) ? (
    <DoesNotExist />
  ) : (
    <>
      <Outlet />
      <VStack align="stretch">
        <CreateNewModal
          category={category}
          moduleCode={moduleCode}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Flex direction="row">
          <Heading paddingLeft="3">{category}</Heading>
          <Spacer />
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
                <MenuItemOption value="today">Today</MenuItemOption>
                <MenuItemOption value="week">This Week</MenuItemOption>
                <MenuItemOption value="month">This Month</MenuItemOption>
                <MenuItemOption value="all">All</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
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
                <MenuItemOption value="asc">Most recent</MenuItemOption>
                <MenuItemOption value="dsc">Oldest</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>

          <Button
            leftIcon={<SmallAddIcon />}
            onClick={onOpen}
            colorScheme="green"
            data-testid="newPostBtn"
          >
            Create new thread
          </Button>
        </Flex>
        <Divider color="gray.300" />
        <ThreadsList
          moduleCode={moduleCode}
          category={category}
          filterOption={filterOption}
          sortOption={sortOption}
        />
      </VStack>
    </>
  );
}

export default CategoryMain;
