import { HStack, Wrap, Box, Center, Image, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSuccess, useWindowDimensions } from "../../utils/helper";

function PreLoginLayout(props) {
  const { setSuccess } = useSuccess();
  const { state } = useLocation();
  const { width } = useWindowDimensions();

  useEffect(() => {
    if (state && state.fromRegistration) {
      setSuccess("Yay! Your account has been created");
    }
  }, []);

  return (
    <>
      <Center
        bgImage={require("../../static/endless-constellation.png")}
        h="100vh"
      >
        <Center
          justifyContent="center"
          borderRadius="70px"
          bg="white"
          paddingRight={10}
          paddingLeft={10}
          w="800px"
          h="90%"
        >
          <Flex direction="row" align="center">
            {width >= 600 && (
              <Box>
                <Image
                  boxSize="100%"
                  objectFit="contain"
                  src={require("../../static/logo.png")}
                />
              </Box>
            )}

            <Box padding={10} shadow="md" bg="#f0ecec">
              {props.children}
            </Box>
          </Flex>
        </Center>
      </Center>
      {width >= 600 && (
        <Image
          src={require("../../static/dog-says-hello.gif")}
          position="absolute"
          bottom={0}
          left={0}
          boxSize="200px"
          objectFit="contain"
        />
      )}
    </>
  );
}

export default PreLoginLayout;
