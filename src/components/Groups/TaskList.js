import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  VStack,
  Heading,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

function TaskList(props) {
  const { projectId } = props;

  const projectRef = ref.child(`projects/${projectId}`);

  const [projectData, setProjectData] = useState();

  useEffect(() => {
    projectRef.on("value", (snapshot) => {
      setProjectData(snapshot.val());
    });
  }, [projectId]);

  return projectData == undefined ? (
    <Loader />
  ) : (
    <VStack spacing={0} align="start" w="100%">
      <Heading>{projectData.name}</Heading>
      <TableContainer w="100%">
        <Table>
          <Thead>
            <Tr>
              <Th>Task</Th>
              <Th>Assignee</Th>
              <Th>Deadline</Th>
              <Th>Apply</Th>
            </Tr>
          </Thead>
          <Tbody>
            {projectData.tasks != undefined &&
              Object.values(projectData.tasks).map((task) => (
                <TaskItem task={task} />
              ))}
            <AddTask projectId={projectData.projectId} />
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default TaskList;
