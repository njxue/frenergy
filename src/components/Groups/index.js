import { Heading, VStack } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../layout/Loader";

function GroupMain() {
  const { groupId } = useParams();
  const groupRef = ref.child(`groups/${groupId}`);

  const [groupData, setGroupData] = useState();

  useEffect(() => {
    groupRef.on("value", async (snapshot) => {
      setGroupData(await snapshot.val());
    });
  }, [groupId]);

  return groupData == undefined ? (
    <Loader />
  ) : (
    <VStack>
      <Heading>{groupData.name}</Heading>
    </VStack>
  );
}

export default GroupMain;
