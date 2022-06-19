import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  VStack,
  StackItem,
  StackDivider,
  Text,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import NusmodsLink from "./NusmodsLink";
import { useEffect } from "react";
import {
  Routes,
  useNavigate,
  useParams,
  Route,
  Link,
  Outlet,
  useLocation,
} from "react-router-dom";
import { CATEGORIES } from "../../api/customapi";

import CategoryMain from "../CategoryPage";
import Thread from "../ThreadPage";
import CreateNewModal from "../CategoryPage/CreateNewModal";

function ModuleMain() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  let title;
  if (state) {
    title = state.title;
  }
  const { moduleCode } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Tabs orientation="vertical">
      <TabList w="20%">
        <VStack
          align="start"
          divider={<StackDivider />}
          spacing={2}
          marginTop={4}
        >
          <HStack align="center">
            <VStack spacing={0}>
              <Heading>{moduleCode}</Heading>
              <Text>Discussion Forum</Text>
            </VStack>
            <NusmodsLink moduleCode={moduleCode} />
          </HStack>

          <StackItem>
            {CATEGORIES.map((category) => (
              <Tab onClick={() => navigate(`${category}`)}>{category}</Tab>
            ))}
          </StackItem>
        </VStack>
      </TabList>
      <TabPanels>
        {CATEGORIES.map((category) => (
          <TabPanel>
            <Outlet />
            {pathname == `/${moduleCode}` && (
              <CategoryMain category="General" />
            )}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}

export default ModuleMain;
