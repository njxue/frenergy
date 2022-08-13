import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import {
  Flex,
  Image,
  Box,
  Spacer,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import Navbar from "../MainNavigation/Navbar";

function Banner() {
  const navigate = useNavigate();
  const { currUser } = useAuth();

  return (
    <VStack spacing={0} h="100%" overflow="hidden">
      <Flex
        direction="row"
        w="100%"
        bg="#051e3e"
        color="white"
        justifyContent="space-between"
        maxH="100%"
        align="center"
        padding={2}
      >
        <Box onClick={() => navigate("/")} cursor="pointer">
          <AspectRatio w="250px" ratio={10 / 3} objectFit="contain">
            <Image src={require("../../static/frenergylogo.png")} />
          </AspectRatio>
        </Box>

        <Spacer />
        {currUser && <Navbar />}
      </Flex>
      <Box h="5px" background="orange" w="100%"></Box>
    </VStack>
  );
}

export default Banner;
