import { HStack, Button, Flex, Text, Heading, Box } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function ModuleItem(props) {
  const { module } = props;
  const { moduleCode, title } = module;
  const navigate = useNavigate();

  return (
    <Box
      onClick={() => navigate(`/${moduleCode}/General`)}
      shadow="md"
      color="black"
      padding={3}
      cursor="pointer"
      borderWidth="1px"
      _hover={{ backgroundColor: "#EFEDED" }}
      w="100%"
      data-testid="moduleItem"
    >
      <Heading size="md" data-testid="moduleCode">
        {moduleCode}
      </Heading>
      <Text fontSize="sm" noOfLines={2} marginTop={3} data-testid="moduleTitle">
        {title}
      </Text>
    </Box>
  );
}

export default ModuleItem;
