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
import Filter from "./Filter";
import Sort from "./Sort";

function CategoryMain(props) {
  const { category } = props;
  const { moduleCode } = useParams();
  //console.log(category + moduleCode);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filterOption, setFilterOption] = useState(3);
  const [sortOption, setSortOption] = useState(0);

  

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

          <Filter setFilterOption={setFilterOption} />
          <Sort setSortOption={setSortOption} />

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
