import { Accordion, StackDivider, Text, VStack } from "@chakra-ui/react";
import Loader from "../layout/Loader";
import TaskList from "./TaskList";

function ProjectList(props) {
  const { projectIds, groupId } = props;

  return projectIds == undefined ? (
    <Loader />
  ) : (
    <VStack align="start" w="100%" divider={<StackDivider />} spacing={10}>
      {!projectIds[0] ? (
        <Text>No Projects</Text>
      ) : (
        <Accordion w="100%" allowMultiple>
          {projectIds.map((projectId) => (
            <TaskList projectId={projectId} groupId={groupId} key={projectId} />
          ))}
        </Accordion>
      )}
    </VStack>
  );
}

export default ProjectList;
