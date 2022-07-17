import {
  TabList,
  Tabs,
  Tab,
  TabPanels,
  TabPanel,
  Heading,
  VStack,
  Text,
  HStack,
} from "@chakra-ui/react";

import NusmodsLink from "./NusmodsLink";

import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../api/customapi";

import CategoryMain from "../CategoryPage";

import { useWindowDimensions } from "../../utils/helper";

function ModuleMain() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { moduleCode } = useParams();

  const { width } = useWindowDimensions();

  return (
    <Tabs
      orientation={width >= 600 ? "vertical" : "horizontal"}
      defaultIndex={1}
      defaultChecked={1}
      isLazy
    >
      <TabList w="20%">
        <Tab isDisabled _disabled={{ color: "black" }}>
          <HStack align="center">
            <VStack spacing={0}>
              <Heading data-testid="moduleCodeHeader">{moduleCode}</Heading>
              <Text data-testid="forumHeader">Discussion Forum</Text>
            </VStack>
            <NusmodsLink moduleCode={moduleCode} />
          </HStack>
        </Tab>

        {CATEGORIES.map((category) => (
          <Tab
            data-testid={`${category}Category`}
            _focus={{ backgroundColor: "#EFEDED" }}
            onClick={() => {
              navigate(category);
            }}
          >
            {category}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel></TabPanel>
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
