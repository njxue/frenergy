import { formatDate } from "../../utils/helper";
import MembersAvatar from "./MembersAvatar";
import { VStack, Box, Flex, Text, Heading } from "@chakra-ui/react";
import LeaderName from "./LeaderName";
import ExpandedNotice from "./ExpandedNotice";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";

function NoticeDetails(props) {
  const { noticeData, leader, type } = props;
  const { event, details, applyby, size, noticeId } = noticeData;
  const formattedDate = formatDate(new Date(Date.parse(applyby)));
  const groupMembersRef = ref.child(`groups/${noticeId}/members`);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    groupMembersRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const tmp = [];
      for (const k in data) {
        tmp.push(k);
      }
      setMembers(tmp);
    });
  }, [noticeId]);

  return (
    <VStack
      alignItems="start"
      bg={type == "edit" ? "#FFFDDF" : "#DFFFE2"}
      padding={2}
      borderRadius="10px"
      shadow="md"
      w="200px"
    >
      <Flex
        direction="row"
        justifyContent="space-between"
        alignItems="top"
        gap={1}
        w="100%"
      >
        <Heading size="md" noOfLines={2}>
          {event}
        </Heading>

        <ExpandedNotice
          noticeData={noticeData}
          leader={leader}
          type={type}
          members={members}
        />
      </Flex>

      <Text>{details}</Text>

      <Text>
        <b>Apply By:</b>
        {formattedDate}
      </Text>
      <MembersAvatar members={members} leader={leader} />
    </VStack>
  );
}

export default NoticeDetails;
