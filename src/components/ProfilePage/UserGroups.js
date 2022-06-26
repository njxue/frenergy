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
import LoungeItem from "../Dashboard/LoungeItem";
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
    <VStack
      divider={<StackDivider borderColor="white" borderWidth={1} />}
      align="stretch"
      minW="300px"
      w="500px"
      maxW="90vw"
      bg="#F0ECEC"
      borderRadius="10px"
      padding={2}
      maxH="600px"
    >
      <Heading size="md">STUDY LOUNGES</Heading>
      <VStack shouldWrapChildren overflow="auto" maxH="inherit" align="stretch">
        {groupIds.map((groupId) => {
          return <LoungeItem groupId={groupId} key={groupId} />;
        })}
      </VStack>
    </VStack>
  );
}

export default UserGroups;
