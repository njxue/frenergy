import { HStack, Switch, Text } from "@chakra-ui/react";

function VisibilityToggle(props) {
  const { privated, setPrivated } = props;
  return (
    <>
      <HStack>
        <Switch colorScheme="red" onChange={() => setPrivated(!privated)} />
        <Text as="b">{privated ? "Private" : "Public"}</Text>
      </HStack>
      <Text fontSize="xs">
        {privated
          ? "Your notice will only be visible to invited members"
          : "Your notice will only be visible to users"}
      </Text>
    </>
  );
}

export default VisibilityToggle;
