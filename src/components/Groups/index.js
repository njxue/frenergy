import {
  Divider,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Menu,
  MenuButton,
  Button,
  MenuList,
  MenuItem,
  Editable,
  EditablePreview,
  EditableInput,
  Accordion,
  AccordionItem,
  AccordionPanel,
  VStack,
  AccordionButton,
  AccordionIcon,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoesNotExist from "../layout/DoesNotExist";
import Requests from "./Requests";
import { useAuth } from "../../contexts/AuthContext";
import MembersList from "./MembersList";
import Chat from "./Chat";
import TaskManager from "./TaskManager";

import { useSuccess } from "../../utils/helper";
import { useError } from "../../utils/helper";
import Loader from "../layout/Loader";

function GroupMain() {
  const { groupId } = useParams();
  const { currUser } = useAuth();

  const groupRef = ref.child(`groups/${groupId}`);
  const [isMember, setIsMember] = useState();

  const [name, setName] = useState();
  const [groupData, setGroupData] = useState();
  const { setSuccess } = useSuccess();
  const { setError } = useError();
  const navigate = useNavigate();

  useEffect(() => {
    // check if such a group exists
    groupRef.on("value", async (snapshot) => {
      if (!snapshot.exists()) {
        navigate("/dne");
      }
      const data = await snapshot.val();
      if (!data.members || !data.members[currUser.uid]) {
        setIsMember(false);
      } else {
        setIsMember(true);
      }
      setGroupData(data);
    });
  }, []);

  useEffect(() => {
    if (groupData) {
      setName(groupData.name);
    }
  }, [groupData]);

  function handleNameChange(e) {
    if (e.trim().length > 0) {
      groupRef.update({ name: e });
    } else {
      setName(groupData.name);
      setError("Group name must contain at least 1 character");
    }
  }

  function handleLeave() {
    groupRef.transaction((groupData) => {
      navigate("/");

      if (Object.keys(groupData.members).length == 1) {
        groupData = null;
      } else {
        groupData.members[currUser.uid] = null;
      }

      if (groupData.leader == currUser.uid) {
        ref.child(`notices/${groupId}`).remove();
      } else {
        ref.child(`notices/${groupId}/size`).transaction((size) => {
          return size + 1;
        });
      }
      return groupData;
    });

    ref.child(`users/${currUser.uid}/groups/${groupId}`).remove();
    setSuccess(`You left ${groupData.name}`);
  }

  return isMember == undefined || groupData == undefined ? (
    <Loader />
  ) : !isMember ? (
    <div>You are not a member of this group</div>
  ) : (
    <>
      <HStack align="center" padding={3}>
        <Editable
          value={name}
          onChange={(e) => setName(e.target)}
          onSubmit={handleNameChange}
        >
          <Heading>
            <EditablePreview />
            <EditableInput />
          </Heading>
        </Editable>

        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <VStack align="start">
                {groupData.leader == currUser.uid && (
                  <Requests groupData={groupData} />
                )}
                <Button onClick={handleLeave}>Leave</Button>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </HStack>
      <Divider marginTop={5} color="gray.400" />
      <Flex directon="row" alignItems="top" wrap="wrap">
        <MembersList groupData={groupData} />
        <Tabs defaultIndex={0} isManual variant="line" w="100%">
          <TabList>
            <Tab>Chat</Tab>
            <Tab>Task Manager</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Chat />
            </TabPanel>
            <TabPanel>
              <TaskManager groupId={groupData.groupId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </>
  );
}

export default GroupMain;
