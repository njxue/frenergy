import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";
import Notice from "./Notice";
import { Flex } from "@chakra-ui/react";

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
      console.log(tmp);
      setNotices(tmp);
    });
  }, []);

  return notices == undefined ? (
    <SkeletonLoader />
  ) : (
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="start"
      gap={7}
      flexBasis="25%"
    >
      {notices.map((notice) => {
        return (
          <Notice
            noticeId={notice.noticeId}
            key={notice.noticeId}
            isPublic={notice.isPublic}
          />
        );
      })}
    </Flex>
  );
}

export default Invites;
