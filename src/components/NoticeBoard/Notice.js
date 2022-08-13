import { VStack, Skeleton } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import NoticeDetails from "./NoticeDetails";
import NoticeAction from "./NoticeAction";

function Notice(props) {
  const { noticeId, isPublic, type } = props;

  const noticeRef = isPublic
    ? ref.child(`publicNotices/${noticeId}`)
    : ref.child(`privateNotices/${noticeId}`);

  const leaderRef = ref.child(`groups/${noticeId}/leader`);

  const [noticeData, setNoticeData] = useState({});
  const [leader, setLeader] = useState();

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

  return (
    <Skeleton isLoaded={Object.keys(noticeData).length !== 0}>
      <VStack shadow="lg" padding={2} borderWidth="2px" borderRadius="10px">
        <NoticeDetails noticeData={noticeData} type={type} />
        <NoticeAction type={type} noticeData={noticeData} leader={leader} />
      </VStack>
    </Skeleton>
  );
}

export default Notice;
