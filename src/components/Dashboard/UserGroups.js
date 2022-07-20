import {
  VStack,
  StackDivider,
  HStack,
  Heading,
  Icon,
  Center,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import LoungeItem from "./LoungeItem";
import { MdOutlineGroups } from "react-icons/md";
import EmptyPrompt from "./EmptyPrompt";
import Loader from "../layout/Loader";

function UserGroups() {
  const { currUser } = useAuth();
  const userGroupsRef = ref.child(`users/${currUser.uid}/groups`);
  const [groupIds, setGroupIds] = useState();

  useEffect(() => {
    userGroupsRef.on("value", (snapshot) => {
      const tmp = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const k in data) {
          tmp.push(k);
        }
      }
      setGroupIds(tmp);
    });
  }, []);

  return groupIds == undefined ? (
    <Loader />
  ) : (
    <VStack
      align="stretch"
      divider={<StackDivider />}
      borderWidth="2px"
      shadow="md"
      padding={3}
      flexGrow="1"
      h="500px"
    >
      <HStack>
        <Heading fontSize="lg" fontFamily="arial">
          MY STUDY LOUNGES
        </Heading>
        <Icon as={MdOutlineGroups} />
      </HStack>
      <VStack maxH="inherit" align="stretch" overflow="auto">
        {groupIds[0] ? (
          groupIds.map((groupId) => (
            <LoungeItem groupId={groupId} key={groupId} />
          ))
        ) : (
          <EmptyPrompt
            group="study lounges"
            message={'Find and join study lounges under the "Study Lounge" tab'}
          />
        )}
      </VStack>
    </VStack>
  );
}

export default UserGroups;
