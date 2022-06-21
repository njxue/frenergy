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
 

import MembersAvatar from "./MembersAvatar";
import NoticeAction from "./NoticeAction";

function ExpandedNotice(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { noticeData } = props;
  const { event, details, noticeId } = noticeData;

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
              <Text>{details}</Text>

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
