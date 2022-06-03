import {
  Heading,
  IconButton,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Text,
  Flex,
  ModalBody,
  VStack,
  StackItem,
  ModalFooter,
  Divider,
} from "@chakra-ui/react";
import { BiExpandAlt } from "react-icons/bi";
import { useProfile, useFormatDate } from "../../utils/helper";
import ApplyButton from "./ApplyButton";
import EditNotice from "./EditNotice";
import MembersAvatar from "./MembersAvatar";

function ExpandedNotice(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { notice, canEdit } = props;
  const { event, details, size, applyby, leader, noticeId } = notice;
  const { username } = useProfile(leader);

  const rawDate = new Date(Date.parse(applyby));
  const formatDate = useFormatDate(rawDate);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Flex
              direction="row"
              wrap="wrap"
              alignItems="center"
              justifyContent="space-between"
            >
              <Heading>{event}</Heading>
              <Text fontSize="xs">
                by <i>{username}</i>
              </Text>
            </Flex>
          </ModalHeader>
          <Divider />
          <ModalBody>
            <VStack alignItems="start" spacing={10}>
              <StackItem>
                <Heading>Event Description</Heading>
                <Text>{details}</Text>
              </StackItem>
              <StackItem>
                <Heading size="md">Looking for</Heading>
                <Text>{size} more</Text>
              </StackItem>
              <StackItem>
                <Heading size="s">Apply By: </Heading>
                <Text>{formatDate}</Text>
              </StackItem>
              <MembersAvatar groupId={noticeId} isExpanded/>
            </VStack>
          </ModalBody>

          <ModalFooter>
            {canEdit ? (
              <EditNotice notice={notice} />
            ) : (
              <ApplyButton notice={notice} />
            )}
          </ModalFooter>
          <ModalCloseButton />
        </ModalContent>
      </Modal>
      <IconButton
        as={BiExpandAlt}
        variant="ghost"
        size="2xs"
        cursor="pointer"
        onClick={onOpen}
      />
    </>
  );
}

export default ExpandedNotice;
