import { formatDate } from "../../utils/helper";
import MembersAvatar from "./MembersAvatar";
import { VStack, Box, Flex, Text, Heading } from "@chakra-ui/react";
import LeaderName from "./LeaderName";
import ExpandedNotice from "./ExpandedNotice";

function NoticeDetails(props) {
  const { noticeData, leader, type } = props;
  const { event, details, applyby, size, noticeId } = noticeData;
  const formattedDate = formatDate(new Date(Date.parse(applyby)));

  return (
    <VStack
      alignItems="start"
      bg={type == "edit" ? "#FFFDDF" : "#DFFFE2"}
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
            {event}
          </Heading>
          <LeaderName leader={leader} />
        </Box>
        <ExpandedNotice noticeData={noticeData} leader={leader} type={type} />
      </Flex>

      <Text>{details}</Text>

      <Text>
        <b>Looking for:</b> {size} more
      </Text>
      <Text>
        <b>Apply By:</b>
        {formattedDate}
      </Text>
      <MembersAvatar groupId={noticeId} />
    </VStack>
  );
}

export default NoticeDetails;
