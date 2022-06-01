import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Divider,
  Heading,
  HStack,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";
import Requests from "./Requests";
import { useAuth } from "../../contexts/AuthContext";
import MembersList from "./MembersList";

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
      <MembersList groupData={groupData} />
    </>
  );
}

export default GroupMain;
