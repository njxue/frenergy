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
      align="stretch"
      divider={<StackDivider borderColor="gray" borderWidth={1} />}
      minW="300px"
      maxW="90vw"
      w="100%"
      padding={2}
      shadow="lg"
      borderWidth="2px"
      borderRadius="7px"
      flexGrow={1}
      h="350px"
      maxH="350px"
    >
      <Heading size="md">
        {currUser.uid == uid ? "MY MODULES" : `${username}'s MODULES`}
      </Heading>
      <HStack align="top" justifyContent="space-between">
        <VStack alignItems="stretch" maxH="270px" overflow="auto" w="100%">
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

        {currUser.uid == uid && <SelectModules />}
      </HStack>
    </VStack>
  );
}

export default UserModules;
