import MembersAvatar from "./MembersAvatar";
import { VStack, Box, Flex, Text, Heading } from "@chakra-ui/react";
import ExpandedNotice from "./ExpandedNotice";

function NoticeDetails(props) {
  const { noticeData } = props;
  const { event, details, noticeId } = noticeData;

  return (
    <VStack
      alignItems="start"
      padding={2}
      borderRadius="10px"
      shadow="md"
      w="200px"
      borderWidth="1px"
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

        <ExpandedNotice noticeData={noticeData} />
      </Flex>

      <Text>{details}</Text>

      <MembersAvatar groupId={noticeId} />
    </VStack>
  );
}

export default NoticeDetails;
