import {
  Divider,
  HStack,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Flex,
  Box,
  Accordion,
  AccordionItem,
  AccordionPanel,
  VStack,
  AccordionButton,
  AccordionIcon,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DoesNotExist from "../layout/DoesNotExist";
import Requests from "./Requests";
import { useAuth } from "../../contexts/AuthContext";
import MembersList from "./MembersList";
import Chat from "../Chat";
import TaskManager from "./TaskManager";
import ManageNotice from "./ManageNotice";
import Loader from "../layout/Loader";
import LeaveButton from "./LeaveButton";
import EditableName from "./EditableName";
import { useWindowDimensions } from "../../utils/helper";
import { ChevronDownIcon } from "@chakra-ui/icons";

function GroupMain() {
  const { groupId } = useParams();
  const { currUser } = useAuth();

  const groupRef = ref.child(`groups/${groupId}`);

  const [groupData, setGroupData] = useState();

  const navigate = useNavigate();
  const { width } = useWindowDimensions();

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
    <Box h="100%">
      <HStack align="center" padding={3}>
        <EditableName groupData={groupData} />
        <Popover>
          <PopoverTrigger>
            <ChevronDownIcon cursor="pointer" />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverBody>
              <VStack align="stretch">
                {groupData.leader == currUser.uid && (
                  <>
                    <ManageNotice groupData={groupData} />
                    <Requests groupData={groupData} />
                  </>
                )}
                <LeaveButton groupData={groupData} />
              </VStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      </HStack>
      <Divider marginTop={5} color="gray.400" />
      <Flex directon="row" alignItems="top" overflow="hidden">
        {width >= 600 && <MembersList groupData={groupData} />}
        <Tabs defaultIndex={0} isManual variant="line" flexGrow={1}>
          <TabList>
            <Tab>Chat</Tab>
            <Tab>Task Manager</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Chat chatId={groupData.groupId} />
            </TabPanel>
            <TabPanel>
              <TaskManager groupId={groupData.groupId} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Flex>
    </Box>
  );
}

export default GroupMain;
