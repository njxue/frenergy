import {
  VStack,
  Input,
  HStack,
  Text,
  FormControl,
  FormLabel,
  Box,
  Container,
  Center,
  Image,
} from "@chakra-ui/react";
import { useState } from "react";

function ModuleInfo() {
  const [moduleCode, setModuleCode] = useState("");

  return (
    <VStack>
      <FormControl>
        <HStack wrap="wrap">
          <FormLabel>Module Code: </FormLabel>
          <Input
            type="text"
            value={moduleCode}
            onChange={(e) => setModuleCode(e.target.value)}
            maxW="100vw"
            w="50vw"
            borderWidth="2px"
          />
        </HStack>
      </FormControl>
      <Box w="100%" h="70vh">
        {moduleCode ? (
          <embed
            src={`https://nusmods.com/modules/${moduleCode}`}
            style={{ width: "100%", height: "inherit" }}
          />
        ) : (
          <Center display="flex" justifyContent="center" h="inherit">
            <VStack>
              <Image
                src={require("../../static/nusmodslogo.png")}
                boxSize="150px"
              />
              <Text>Enter a module code</Text>
            </VStack>
          </Center>
        )}
      </Box>
    </VStack>
  );
}

export default ModuleInfo;
