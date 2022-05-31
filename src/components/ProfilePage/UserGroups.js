import {
  Divider,
  Heading,
  Skeleton,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import GroupBox from "../Groups/GroupBox";
import Loader from "../layout/Loader";

function UserGroups() {
  const { currUser } = useAuth();
  const [groupIds, setGroupIds] = useState();

  useEffect(() => {
    ref.child(`users/${currUser.uid}/groups`).on("value", async (snapshot) => {
      const tmp = [];
      const data = snapshot.val();
      for (const k in data) {
        tmp.push(k);
      }
      setGroupIds(tmp);
    });
  }, [currUser]);

  return groupIds == undefined ? (
    <Loader />
  ) : (
    <VStack alignItems="start" maxH="60vh" padding={3}>
      <Heading fontSize="lg" fontFamily="arial">
        MY GROUPS
      </Heading>
      <Divider />
      <VStack divider={<StackDivider borderColor="gray.200" />}>
        {groupIds.map((groupId) => {
          return <GroupBox groupId={groupId} />;
        })}
      </VStack>
    </VStack>
  );
}

export default UserGroups;
