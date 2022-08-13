import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";
import { VStack } from "@chakra-ui/react";

function TaskManager(props) {
  const { groupId } = props;

  const [projectIds, setProjectIds] = useState();
  useEffect(() => {
    ref.child(`groups/${groupId}/projects`).on("value", (snapshot) => {
      const tmp = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const k in data) {
          tmp.push(k);
        }
      }
      tmp.reverse();
      setProjectIds(tmp);
    });
  }, [groupId]);

  return projectIds == undefined ? (
    <Loader />
  ) : (
    <VStack spacing={4} align="start">
      <AddProject groupId={groupId} />
      <ProjectList projectIds={projectIds} groupId={groupId} />
    </VStack>
  );
}

export default TaskManager;
