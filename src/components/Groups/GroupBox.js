import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import { Text } from "@chakra-ui/react";
import Loader from "../layout/Loader";
import { useNavigate } from "react-router-dom";

function GroupBox(props) {
  const { groupId } = props;
  const [groupData, setGroupData] = useState();
  const groupRef = ref.child(`groups/${groupId}`);
  const navigate = useNavigate();

  useEffect(() => {
    groupRef.on("value", async (snapshot) => {
  
      setGroupData(await snapshot.val());
      console.log(snapshot.val())
    });
  }, [groupId]);

  return groupData == undefined ? (
    <Loader />
  ) : (
    <Text cursor="pointer" onClick={() => navigate(`/group/${groupId}`)}>
      {groupData.name}
    </Text>
  );
}

export default GroupBox;
