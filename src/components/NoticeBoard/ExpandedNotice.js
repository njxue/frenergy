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
import { formatDate } from "../../utils/helper";
import ApplyButton from "./ApplyButton";
import EditNotice from "./EditNotice";
import LeaderName from "./LeaderName";
import MembersAvatar from "./MembersAvatar";
import NoticeAction from "./NoticeAction";

function ExpandedNotice(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { noticeData } = props;
  const { event, details, applyby, noticeId } = noticeData;

  const rawDate = new Date(Date.parse(applyby));
  const formattedDate = formatDate(rawDate);

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
                <Heading size="s">Apply By: </Heading>
                <Text>{formattedDate}</Text>
              </StackItem>
              <MembersAvatar groupId={noticeId} isExpanded />
            </VStack>
          </ModalBody>

          <ModalFooter>
            <NoticeAction noticeData={noticeData} />
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
