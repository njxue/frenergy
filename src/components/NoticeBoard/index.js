import { HStack, Heading, Button, useDisclosure } from "@chakra-ui/react";
import NoticeForm from "./NoticeForm";
import NoticeList from "./NoticeList";

function NoticeBoard() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <HStack>
        <Heading>NoticeBoard</Heading>
        <Button onClick={onOpen}>Create new Notice</Button>
      </HStack>
      <NoticeForm isOpen={isOpen} onClose={onClose} />
      <NoticeList />
    </>
  );
}

export default NoticeBoard;
