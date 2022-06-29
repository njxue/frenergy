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
import { useWindowDimensions } from "../../utils/helper";

function ModuleMain() {
  const navigate = useNavigate();
  const { pathname, state } = useLocation();
  let title;
  if (state) {
    title = state.title;
  }
  const { moduleCode } = useParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { width } = useWindowDimensions();

  return (
    <Tabs
      orientation={width >= 600 ? "vertical" : "horizontal"}
      defaultIndex={1}
    >
      <TabList w="20%">
        <Tab isDisabled _disabled={{ color: "black" }}>
          <HStack align="center">
            <VStack spacing={0}>
              <Heading>{moduleCode}</Heading>
              <Text>Discussion Forum</Text>
            </VStack>
            <NusmodsLink moduleCode={moduleCode} />
          </HStack>
        </Tab>

        {CATEGORIES.map((category) => (
          <Tab onClick={() => navigate(`${category}`)}>{category}</Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel> </TabPanel>
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
