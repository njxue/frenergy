import { Heading, VStack } from "@chakra-ui/react";

function UserGroups() {
  return (
    <VStack
      alignItems="start"
      maxH="60vh"
      border="solid"
      borderWidth="1px"
      padding={3}
      borderRadius="20px"
    >
      <Heading fontSize="lg" fontFamily="arial">
        MY GROUPS
      </Heading>
    </VStack>
  );
}

export default UserGroups;
