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
  Text,
  HStack,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useParams, Outlet } from "react-router-dom";
import { MdSort, MdFilterList } from "react-icons/md";
import { CATEGORIES } from "../../api/customapi";
import { getExamDate } from "../../api/nusmods";
import DoesNotExist from "../layout/DoesNotExist";
import ThreadsList from "./ThreadsList";
import Filter from "./Filter";
import { formatDate } from "../../utils/helper";
import Sort from "./Sort";

function CategoryMain(props) {
  const { category } = props;
  const { moduleCode } = useParams();
  const [examDate, setExamDate] = useState("");
  const [remainingDays, setRemainingDays] = useState(0);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [filterOption, setFilterOption] = useState(3);
  const [sortOption, setSortOption] = useState(0);

  useEffect(() => {
    async function callAPI() {
      const res = await getExamDate(moduleCode);
      const date = res == "" ? "NIL" : formatDate(new Date(res), false, true);
      const diffTime = Math.max(new Date(res) - new Date(), 0);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      setRemainingDays(diffDays);
      setExamDate(date);
    }
    if (category == "Exams") {
      try {
        callAPI();
      } catch (err) {
        console.log(err);
      }
    }
  }, [category]);

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
          <VStack align="start" spacing={0} paddingLeft="3">
            <Heading>{category}</Heading>
            {category == "Exams" && examDate != "" && (
              <Text fontSize="sm">
                Final Exam: {examDate}
                {examDate != "NIL" && remainingDays >= 0
                  ? `, (in ${remainingDays} ${
                      remainingDays == 1 ? "day" : "days"
                    })`
                  : ""}
              </Text>
            )}
          </VStack>
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
