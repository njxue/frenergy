import { StackDivider, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import TaskList from "./TaskList";

function ProjectList(props) {
  const { groupId } = props;
  const projectsRef = ref.child(`groups/${groupId}/projects`);
  const [projectIds, setProjectIds] = useState();

  useEffect(() => {
    projectsRef.on("value", (snapshot) => {
      const data = snapshot.val();
      const tmp = [];
      for (const k in data) {
        tmp.push(k);
      }
      tmp.reverse();
      setProjectIds(tmp);
    });
  }, [groupId]);

  return projectIds == undefined ? (
    <Loader />
  ) : (
    <VStack align="start" w="100%" divider={<StackDivider />} spacing={10}>
      {projectIds.length == 0 && <Text>No Projects</Text>}
      {projectIds.map((projectId) => (
        <TaskList projectId={projectId} />
      ))}
    </VStack>
  );
}

export default ProjectList;
