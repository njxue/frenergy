import {
  Divider,
  Heading,
  StackDivider,
  VStack,

} from "@chakra-ui/react";
import MemberItem from "./MemberItem";

function MembersList(props) {
  let { groupData } = props;
  var { members } = groupData;

  members = Object.keys(members);
 
  return (
    <VStack align="start" maxW="max-content" padding={3}>
      <Heading size="sm">MEMBERS ({members.length}) </Heading>

      <Divider />
      <VStack align="start" divider={<StackDivider colorScheme="gray.200" />}>
        {members.map((memberUid) => (
          <MemberItem memberUid={memberUid} groupData={groupData} />
        ))}
      </VStack>
    </VStack>
  );
}

export default MembersList;
