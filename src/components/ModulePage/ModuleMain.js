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
  Box,
} from "@chakra-ui/react";

import NusmodsLink from "./NusmodsLink";
import CategoryPageRenderer from "../../components/CategoryPage";
import { useNavigate, useParams, Outlet, useLocation } from "react-router-dom";
import { CATEGORIES } from "../../api/customapi";

import { useWindowDimensions } from "../../utils/helper";

function ModuleMain() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { moduleCode } = useParams();

  const { width } = useWindowDimensions();
  console.log("modulemain");
  return (
    <Tabs
      orientation={width >= 600 ? "vertical" : "horizontal"}
      defaultIndex={1}
      defaultChecked={1}
      isLazy
      maxW="100%"
    >
      <TabList minW="15%" maxW="100%" overflow="auto" overflowY="hidden">
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
            key={category}
          >
            {category}
          </Tab>
        ))}
      </TabList>
      <TabPanels minW="85%" maxW="100%">
        <Box maxW="100%" padding={2}>
          <CategoryPageRenderer />
        </Box>
      </TabPanels>
    </Tabs>
  );
}

export default ModuleMain;
