import { VStack, Skeleton } from "@chakra-ui/react";

import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";
import ExpandedNotice from "./ExpandedNotice";

import NoticeDetails from "./NoticeDetails";
import NoticeAction from "./NoticeAction";

function Notice(props) {
  const { noticeId, isPublic, isPrivate, type } = props;
  const noticeRef = isPublic
    ? ref.child(`publicNotices/${noticeId}`)
    : ref.child(`privateNotices/${noticeId}`);

  const leaderRef = ref.child(`groups/${noticeId}/leader`);

  const [noticeData, setNoticeData] = useState();
  const [leader, setLeader] = useState();

  const now = new Date();

  useEffect(() => {
    noticeRef.on("value", (snapshot) => {
      setNoticeData(snapshot.val());
    });

    leaderRef.on("value", (snapshot) => {
      setLeader(snapshot.val());
    });
    return () => {
      leaderRef.off();
      noticeRef.off();
    };
  }, [noticeId]);

  return noticeData == undefined ? (
    <SkeletonLoader />
  ) : (
    now < new Date(Date.parse(noticeData.applyby)) && (
      <Skeleton isLoaded={leader != undefined}>
        <VStack>
          <NoticeDetails noticeData={noticeData} leader={leader} type={type} />
          <NoticeAction type={type} noticeData={noticeData} leader={leader} />
        </VStack>
      </Skeleton>
    )
  );
}

export default Notice;
