import {
  Divider,
  Heading,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import MemberItem from "./MemberItem";
import SkeletonLoader from "../layout/SkeletonLoader";

function MembersList(props) {
  const { groupData } = props;

  const { members, leader } = groupData;

  return members == undefined ? (
    <SkeletonLoader />
  ) : (
    <VStack align="start" padding={3} wrap="wrap">
      <Heading size="sm">MEMBERS ({Object.keys(members).length}) </Heading>
      <Divider />

      <VStack align="start" divider={<StackDivider colorScheme="gray.200" />}>
        {Object.keys(members).map((memberUid) => (
          <MemberItem
            memberUid={memberUid}
            key={memberUid}
            leader={leader}
            groupData={groupData}
          />
        ))}
      </VStack>
    </VStack>
  );
}

export default MembersList;
