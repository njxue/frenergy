import {
  Button,
  Menu,
  MenuButton,
  MenuList,
  StackDivider,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import RequestItem from "./RequestItem";
import SkeletonLoader from "../layout/SkeletonLoader";

function Requests(props) {
  const { groupData } = props;
  const { groupId, visibility } = groupData;
  const [requests, setRequests] = useState();
  const [eventName, setEventName] = useState("");

  useEffect(() => {
    const noticeRef = ref.child(`${visibility}Notices/${groupId}`);
    noticeRef.on("value", async (snapshot) => {
      var tmp = [];
      if (snapshot.exists()) {
        const data = await snapshot.val();
        if (data.applicants) {
          tmp = Object.keys(data.applicants);
        }
        setEventName(data.event);
      }
      setRequests(tmp);
    });
  }, [groupId, visibility]);

  return requests == undefined ? (
    <SkeletonLoader />
  ) : (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<ChevronRightIcon />}
        colorScheme="teal"
      >
        Requests
      </MenuButton>

      <MenuList>
        <VStack align="stretch" spacing={2} divider={<StackDivider />}>
          {requests.length > 0 ? (
            requests.map((req) => (
              <RequestItem
                applicantUid={req}
                groupData={groupData}
                eventName={eventName}
              />
            ))
          ) : (
            <Text textAlign="center" color="gray">
              No requests
            </Text>
          )}
        </VStack>
      </MenuList>
    </Menu>
  );
}

export default Requests;
