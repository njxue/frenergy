import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Notice from "./Notice";
import SkeletonLoader from "../layout/SkeletonLoader";

function NoticeList() {
  const noticeIdsRef = ref.child("notices");

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
        return <Notice noticeId={noticeId} key={noticeId} />;
      })}
    </Flex>
  );
}

export default NoticeList;
