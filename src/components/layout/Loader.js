import { Box, Image, Center } from "@chakra-ui/react";

function Loader() {
  return (
    <Center
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="100%"
      padding={0}
      margin={0}
      bg="#e3e3e3"
      zIndex={2147483647}
    >
      <Box w="50%" h="50%">
        <Image
          src={require("../../static/loadinggif.gif")}
          boxSize="100%"
          objectFit="contain"
        />
      </Box>
    </Center>
  );
}

export default Loader;
