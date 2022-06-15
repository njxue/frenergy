import {
  VStack,
  Text,
  Skeleton,
  Heading,
  Flex,
  Box,
  Icon,
  HStack,
  AvatarGroup,
} from "@chakra-ui/react";

import { formatDate } from "../../utils/helper";
import EditNotice from "./EditNotice";
import ExpandedNotice from "./ExpandedNotice";

import MembersAvatar from "./MembersAvatar";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";
import LeaderName from "./LeaderName";
import { useAuth } from "../../contexts/AuthContext";
import ApplyButton from "./ApplyButton";

function Notice(props) {
  const { noticeId } = props;
  const noticeRef = ref.child(`notices/${noticeId}`);
  const leaderRef = ref.child(`groups/${noticeId}/leader`);
  const { currUser } = useAuth();
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
        <VStack
          alignItems="start"
          bg={leader == currUser.uid ? "#FFFDDF" : "#DFFFE2"}
          padding={2}
          borderRadius="20px"
        >
          <Flex
            direction="row"
            justifyContent="space-between"
            alignItems="top"
            gap={1}
            w="100%"
          >
            <Box>
              <Heading size="md" noOfLines={2}>
                {noticeData.event}
              </Heading>
              <LeaderName leader={leader} />
            </Box>
            <ExpandedNotice
              notice={noticeData}
              leader={leader}
              canEdit={leader == currUser.uid}
            />
          </Flex>

          <Text>{noticeData.details}</Text>

          <Text>
            <b>Looking for:</b> {noticeData.size} more
          </Text>
          <Text>
            <b>Apply By:</b>
            {formatDate(new Date(Date.parse(noticeData.applyby)))}
          </Text>
          <MembersAvatar groupId={noticeId} />

          {currUser.uid == leader ? (
            <>
              <EditNotice notice={noticeData} />
            </>
          ) : (
            <ApplyButton notice={noticeData} leader={leader} />
          )}
        </VStack>
      </Skeleton>
    )
  );
}

export default Notice;
