import { Heading, Text, Center, VStack, HStack, Image } from "@chakra-ui/react";

function DoesNotExist(props) {
  const { message } = props;
  return (
    <Center display="flex" justifyContent="center" h="inherit">
      <VStack>
        <HStack align="center">
          <Heading size="2xl">404 :(</Heading>
          <Image
            boxSize="100px"
            src={require("../../static/headtilt.png")}
            objectFit="contain"
          />
        </HStack>
        <Text>{message ? message : "Page was not found"}</Text>
      </VStack>
    </Center>
  );
}

export default DoesNotExist;
