import MembersAvatar from "./MembersAvatar";
import {
  VStack,
  Box,
  Flex,
  Text,
  Heading,
  StackItem,
  HStack,
  Divider,
} from "@chakra-ui/react";
import ExpandedNotice from "./ExpandedNotice";

function NoticeDetails(props) {
  const { noticeData } = props;
  const { event, details, noticeId, module } = noticeData;

  return (
    <VStack
      alignItems="stretch"
      w="200px"
      justifyContent="space-between"
      h="200px"
    >
      <StackItem>
        <Flex
          direction="row"
          justifyContent="space-between"
          alignItems="top"
          gap={1}
          w="100%"
        >
          <Heading size="md" noOfLines={2} maxWidth="80%">
            {event}
          </Heading>

          <ExpandedNotice noticeData={noticeData} />
        </Flex>
        <HStack spacing={0} marginTop={2} w="100%">
          <Divider color="gray.200" />
          {module !== "None" && (
            <Text paddingLeft={1} paddingRight={1} fontSize="sm">
              {module}
            </Text>
          )}
        </HStack>

        <Text noOfLines={4} marginTop={3}>
          {details}
        </Text>
      </StackItem>
      <MembersAvatar groupId={noticeId} />
    </VStack>
  );
}

export default NoticeDetails;
