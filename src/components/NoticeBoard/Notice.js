import { VStack, Text, Skeleton, Heading, Flex, Box } from "@chakra-ui/react";

import { useEditRights, useFormatDate, useProfile } from "../../utils/helper";
import EditNotice from "./EditNotice";
import ExpandedNotice from "./ExpandedNotice";
import ApplyButton from "./ApplyButton";

function Notice(props) {
  const { data } = props;
  const { event, details, size, applyby, leader, membersRemaining } = data;

  const rawDate = new Date(Date.parse(applyby));
  const formatDate = useFormatDate(rawDate);

  const { username } = useProfile(leader);

  const canEdit = useEditRights(leader);
  

  return (
    <Skeleton isLoaded={username != undefined}>
      <VStack
        alignItems="start"
        bg={canEdit ? "#FFFDDF" : "#DFFFE2"}
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
            <Text>
              by <i>{username}</i>
            </Text>
          </Box>
          <ExpandedNotice notice={data} canEdit={canEdit} />
        </Flex>

        <Text>{details}</Text>
        <Text>
          <b>Group size:</b> {size}
        </Text>
        <Text>
          <b>Looking for:</b> {membersRemaining} more
        </Text>
        <Text>
          <b>Apply By:</b> {formatDate}
        </Text>

        {canEdit ? (
          <>
            <EditNotice notice={data} />
          </>
        ) : (
          <ApplyButton notice={data} />
        )}
      </VStack>
    </Skeleton>
  );
}

export default Notice;
