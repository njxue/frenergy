import { useProfile } from "../../utils/helper";
import { HStack, Text, Icon } from "@chakra-ui/react";
import { RiVipCrownFill } from "react-icons/ri";

function LeaderName(props) {
  const { leader } = props;
  const { username } = useProfile(leader);

  return (
    <HStack>
      <Icon as={RiVipCrownFill} color="gold" />
      <Text as="i">
        <b>{username}</b>
      </Text>
    </HStack>
  );
}

export default LeaderName;
