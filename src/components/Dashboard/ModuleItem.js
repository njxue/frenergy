import { HStack, Button, Flex, Text, Heading, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ModuleItem(props) {
  const { module } = props;
  const { moduleCode, title } = module;
  const navigate = useNavigate();

  const [background, setBackground] = useState("white");

  return (
    <Box
      onClick={() => navigate(`/${moduleCode}`)}
      shadow="md"
      color="black"
      padding={3}
      cursor="pointer"
      borderWidth="1px"
      bg={background}
      onMouseOver={() => setBackground("#EFEDED")}
      onMouseLeave={() => setBackground("white")}
      w="100%"
    >
      <Heading size="md">{moduleCode}</Heading>
      <Text fontSize="sm" noOfLines={1} marginTop={3}>
        {title}
      </Text>
    </Box>
  );
}

export default ModuleItem;
