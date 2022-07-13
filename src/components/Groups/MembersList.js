import {
  Divider,
  Heading,
  StackDivider,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import MemberItem from "./MemberItem";
import SkeletonLoader from "../layout/SkeletonLoader";
import { useWindowDimensions } from "../../utils/helper";

function MembersList(props) {
  const { groupData } = props;

  const { members, leader } = groupData;
  const { width } = useWindowDimensions();

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
