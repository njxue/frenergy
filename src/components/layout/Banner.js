import classes from "../../static/Banner.module.css";

import { useNavigate } from "react-router-dom";
import MainNavigation from "../MainNavigation/index.js";
import CollapsedMainNavigation from "../MainNavigation/CollapsedMainNavigation";
import { useAuth } from "../../contexts/AuthContext";
import {
  Flex,
  Image,
  Box,
  Spacer,
  VStack,
  AspectRatio,
} from "@chakra-ui/react";
import ProfileButton from "../MainNavigation/ProfileButton";
import Navbar from "../MainNavigation/Navbar";

function Banner() {
  const navigate = useNavigate();
  const { currUser } = useAuth();

  return (
    <VStack spacing={0} >
      <Flex
        direction="row"
        w="100%"
        bg="#051e3e"
        color="white"
        justifyContent="space-between"
        h="100px"
        align="center"
      >
        <Box onClick={() => navigate("/")}>
          <AspectRatio w="250px" ratio={10 / 3}>
            <Image
              src={require("../../static/frenergylogo.png")}
              objectFit="cover"
            />
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
