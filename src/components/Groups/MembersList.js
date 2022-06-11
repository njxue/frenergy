import { Divider, Heading, StackDivider, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import MemberItem from "./MemberItem";
import SkeletonLoader from "../layout/SkeletonLoader";

function MembersList(props) {
  const { groupData } = props;
  const { groupId } = groupData;
  const groupMembersRef = ref.child(`groupMembers/${groupId}`);
  const [members, setMembers] = useState();

  useEffect(() => {
    groupMembersRef.on("value", (snapshot) => {
      const tmp = [];
      const data = snapshot.val();
      for (const k in data) {
        tmp.push(k);
      }
      setMembers(tmp);
    });
  }, [groupId]);

  return members == undefined ? (
    <SkeletonLoader />
  ) : (
    <VStack align="start" maxW="max-content" padding={3} wrap="wrap">
      <Heading size="sm">MEMBERS ({members.length}) </Heading>

      <Divider />
      <VStack align="start" divider={<StackDivider colorScheme="gray.200" />}>
        {members.map((memberUid) => (
          <MemberItem
            memberUid={memberUid}
            groupData={groupData}
            key={memberUid}
          />
        ))}
      </VStack>
    </VStack>
  );
}

export default MembersList;
