import {
  VStack,
  Text,
  Skeleton,
  Button,
  Heading,
  useDisclosure,
  Alert,
  AlertIcon,
  AlertTitle,
  CloseButton,
  HStack,
} from "@chakra-ui/react";

import { useAuth } from "../../contexts/AuthContext";
import { useFormatDate, useProfile } from "../../utils/helper";
import EditNotice from "./EditNotice";
import { useState } from "react";

function Notice(props) {
  const { data } = props;

  const { event, details, size, applyby, leader, noticeId } = data;
  const { onOpen, isOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState("");

  const rawDate = new Date(Date.parse(applyby));
  const formatDate = useFormatDate(rawDate);

  const { username } = useProfile(leader);
  const { currUser } = useAuth();

  return (
    <Skeleton isLoaded={username != undefined}>
      <VStack alignItems="start">
        <HStack>
          <Heading size="md" noOfLines={2}>{event}</Heading>
          {success && (
            <Alert status="success" padding={1}>
              <AlertTitle>{success}</AlertTitle>
              <CloseButton onClick={() => setSuccess("")} />
            </Alert>
          )}
        </HStack>

        <Text>Details: {details}</Text>
        <Text>Size: {size}</Text>
        <Text>Apply By: {formatDate}</Text>
        <Text>Created By: {username} </Text>
      </VStack>
      {currUser.uid == leader ? (
        <>
          <Button w="100%" onClick={onOpen} colorScheme="yellow">
            Edit
          </Button>
          <EditNotice
            notice={data}
            isOpen={isOpen}
            onClose={onClose}
            setSuccess={setSuccess}
          />
        </>
      ) : (
        <Button w="100%" colorScheme="green">Apply</Button>
      )}
    </Skeleton>
  );
}

export default Notice;
