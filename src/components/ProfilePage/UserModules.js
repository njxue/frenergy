import {
  Box,
  Flex,
  VStack,
  Heading,
  HStack,
  Button,
  Text,
  Center,
  StackDivider,
  Divider,
} from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import SelectModules from "./SelectModules";
import { useNavigate, useParams } from "react-router-dom";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { useUserModules } from "../../utils/helper";
import { useAuth } from "../../contexts/AuthContext";
import ModuleItem from "../Dashboard/ModuleItem";
import Loader from "../layout/Loader";

function UserModules(props) {
  const { uid } = props;
  const { currUser } = useAuth();
  const { username } = useParams();

  const { modules, removeModule } = useUserModules(uid);
  const navigate = useNavigate();

  function handleRemove(module) {
    removeModule(module);
  }

  return modules == undefined ? (
    <Loader />
  ) : (
    <VStack
      align="start"
      divider={<StackDivider borderColor="white" borderWidth={1} />}
      minW="300px"
      w="100%"
      maxW="90vw"
      padding={2}
      bg="#F0ECEC"
      flexGrow={1}
      h="350px"
      maxH="350px"
      borderRadius="10px"
    >
      <Heading size="md">
        {currUser.uid == uid ? "MY MODULES" : `${username}'s MODULES`}
      </Heading>
      <Flex
        direction="row"
        alignItems="top"
        wrap="wrap"
        padding={3}
        justifyContent="space-between"
        w="100%"
      >
        <Box w={currUser.uid == uid ? "60%" : "100%"}>
          <VStack alignItems="stretch" maxH="270px" overflow="auto">
            {modules.length > 0 ? (
              modules.map((m) => (
                <HStack>
                  <ModuleItem module={m} />
                  {currUser.uid == uid && (
                    <Center
                      bg="white"
                      h="100%"
                      padding={1}
                      shadow="md"
                      onClick={() => handleRemove(m.moduleCode)}
                      cursor="pointer"
                      _hover={{ backgroundColor: "#AE0000", color: "white" }}
                    >
                      <SmallCloseIcon />
                    </Center>
                  )}
                </HStack>
              ))
            ) : (
              <Center>
                <VStack spacing={0}>
                  <Text color="gray">No modules</Text>
                  <Text color="gray">¯\_(ツ)_/¯</Text>
                </VStack>
              </Center>
            )}
          </VStack>
        </Box>
        {currUser.uid == uid && (
          <Box w="37%">
            <SelectModules />
          </Box>
        )}
      </Flex>
    </VStack>
  );
}

export default UserModules;
