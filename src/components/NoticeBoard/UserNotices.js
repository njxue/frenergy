import { ref } from "../../config/firebase";
import { useState, useEffect } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";
import Notice from "./Notice";
import { Flex } from "@chakra-ui/react";
import { useAuth } from "../../contexts/AuthContext";

function UserNotices() {
  const { currUser } = useAuth();
  const userNoticesRef = ref.child(`userNotices/${currUser.uid}`);

  const [publicNoticeIds, setPublicNoticeIds] = useState();
  const [privateNoticeIds, setPrivateNoticeIds] = useState();

  useEffect(() => {
    userNoticesRef.on("value", async (snapshot) => {
      if (snapshot.exists()) {
        const publicTmp = [];
        const privateTmp = [];
        const data = await snapshot.val();
        const publicNotices = data.public;
        const privateNotices = data.private;

        for (const k in publicNotices) {
          publicTmp.push(k);
        }

        for (const k in privateNotices) {
          privateTmp.push(k);
        }

        publicTmp.reverse();
        privateTmp.reverse();
        setPublicNoticeIds(publicTmp);
        setPrivateNoticeIds(privateTmp);
      }
    });
  }, []);

  return publicNoticeIds == undefined || privateNoticeIds == undefined ? (
    <SkeletonLoader />
  ) : (
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="start"
      gap={7}
      flexBasis="25%"
    >
      {publicNoticeIds.map((noticeId) => {
        return (
          <Notice noticeId={noticeId} key={noticeId} type="edit" isPublic />
        );
      })}
      {privateNoticeIds.map((noticeId) => {
        return (
          <Notice noticeId={noticeId} key={noticeId} type="edit" isPrivate />
        );
      })}
    </Flex>
  );
}

export default UserNotices;
