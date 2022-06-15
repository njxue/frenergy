import { ref } from "../../config/firebase";
import { useState, useEffect } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";
import Notice from "./Notice";
import { Flex } from "@chakra-ui/react";

function PublicNotices() {
  const noticeIdsRef = ref.child("publicNoticeIds");

  const [noticeIds, setNoticeIds] = useState();

  useEffect(() => {
    noticeIdsRef.on("value", async (snapshot) => {
      const tmp = [];
      const data = await snapshot.val();
      for (const k in data) {
        tmp.push(k);
      }
      tmp.reverse();
      setNoticeIds(tmp);
    });
  }, []);

  return noticeIds == undefined ? (
    <SkeletonLoader />
  ) : (
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="start"
      gap={7}
      flexBasis="25%"
    >
      {noticeIds.map((noticeId) => {
        return (
          <Notice noticeId={noticeId} key={noticeId} isPublic type="apply" />
        );
      })}
    </Flex>
  );
}

export default PublicNotices;
