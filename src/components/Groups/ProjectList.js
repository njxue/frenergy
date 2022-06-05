import { StackDivider, Text, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import TaskList from "./TaskList";

function ProjectList(props) {
  const { projectIds, groupId } = props;

  return projectIds == undefined ? (
    <Loader />
  ) : (
    <VStack align="start" w="100%" divider={<StackDivider />} spacing={10}>
      {projectIds.length == 0 && <Text>No Projects</Text>}
      {projectIds.map((projectId) => {
        return <TaskList projectId={projectId} groupId={groupId} key={projectId} />;
      })}
    </VStack>
  );
}

export default ProjectList;
