import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Heading,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import Requests from "./Requests";
import { useAuth } from "../../contexts/AuthContext";
import MembersList from "./MembersList";
import { TabPane } from "react-bootstrap";
import Chat from "./Chat";
import TaskManager from "./TaskManager";

function GroupMain() {
  const { groupId } = useParams();
  const groupRef = ref.child(`groups/${groupId}`);
  const { currUser } = useAuth();
  const [groupData, setGroupData] = useState();

  useEffect(() => {
    groupRef.on("value", async (snapshot) => {
      setGroupData(await snapshot.val());
    });
  }, []);

  return groupData == undefined ? (
    <Loader />
  ) : (
    <>
      <HStack align="start">
        <Heading>{groupData.name}</Heading>
        {groupData.leader == currUser.uid && (
          <Accordion allowToggle>
            <AccordionItem>
              <h1>
                <AccordionButton>
                  <AccordionIcon />
                </AccordionButton>
              </h1>
              <AccordionPanel>
                <Requests groupData={groupData} />
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
        )}
      </HStack>
      <Divider marginTop={5} color="gray.400" />
      <HStack alignItems="top">
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
      </HStack>
    </>
  );
}

export default GroupMain;
