import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";
import { Center, Flex, Text } from "@chakra-ui/react";
import InviteItem from "./InviteItem";

function Invites() {
  const { currUser } = useAuth();
  const noticeIdsRef = ref.child(`invites/${currUser.uid}`);

  const [notices, setNotices] = useState();

  useEffect(() => {
    noticeIdsRef.on("value", async (snapshot) => {
      const tmp = [];
      const data = await snapshot.val();

      for (const k in data) {
        tmp.push({ isPublic: data[k] == "public", noticeId: k });
      }
      tmp.reverse();
      setNotices(tmp);
    });
  }, []);

  return notices == undefined ? (
    <SkeletonLoader />
  ) : notices[0] ? (
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="start"
      gap={7}
      flexBasis="25%"
      overflow="auto"
    >
      {notices.map((notice) => {
        return <InviteItem noticeId={notice.noticeId} />;
      })}
    </Flex>
  ) : (
    <Center display="flex" justifyContent="center">
      <Text color="gray" fontSize={20}>
        You have no invites (yet)!
      </Text>
    </Center>
  );
}

export default Invites;
