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
import ManageNotice from "./ManageNotice";
import Loader from "../layout/Loader";
import LeaveButton from "./LeaveButton";
import EditableName from "./EditableName";

function GroupMain() {
  const { groupId } = useParams();
  const { currUser } = useAuth();

  const groupRef = ref.child(`groups/${groupId}`);

  const [groupData, setGroupData] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    groupRef.on("value", (snapshot) => {
      // group does not exist
      if (!snapshot.exists()) {
        navigate("/dne");
      } else {
        const data = snapshot.val();
        setGroupData(data);
      }
    });
    return () => {
      groupRef.off();
    };
  }, []);

  return groupData == undefined ? (
    <Loader />
  ) : !groupData.members || !groupData.members[currUser.uid] ? (
    <div>You are not a member of this group</div>
  ) : (
    <>
      <HStack align="center" padding={3}>
        <EditableName groupData={groupData} />
        <Accordion allowToggle>
          <AccordionItem>
            <AccordionButton>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel>
              <VStack align="start">
                {groupData.leader == currUser.uid && (
                  <>
                    <ManageNotice groupData={groupData} />
                    <Requests groupData={groupData} />
                  </>
                )}
                <LeaveButton groupData={groupData} />
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
