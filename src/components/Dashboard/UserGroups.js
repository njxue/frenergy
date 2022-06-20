import { VStack, StackDivider, HStack, Heading, Icon } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import LoungeItem from "./LoungeItem";
import { MdOutlineGroups } from "react-icons/md";

function UserGroups() {
  const { currUser } = useAuth();
  const userGroupsRef = ref.child(`users/${currUser.uid}/groups`);
  const [groupIds, setGroupIds] = useState([]);

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

  return (
    <VStack
      align="stretch"
      divider={<StackDivider />}
      borderWidth="2px"
      shadow="md"
      padding={3}
      flexGrow="1"
    >
      <HStack>
        <Heading fontSize="lg" fontFamily="arial">
          MY STUDY LOUNGES
        </Heading>
        <Icon as={MdOutlineGroups} />
      </HStack>
      {groupIds.map((groupId) => (
        <LoungeItem groupId={groupId} />
      ))}
    </VStack>
  );
}

export default UserGroups;
