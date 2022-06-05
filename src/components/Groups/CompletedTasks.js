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

import TaskItem from "./TaskItem";

function CompletedTasks(props) {
  const { projectId } = props;
  const completedTasksRef = ref.child(`projects/${projectId}/tasks/completed`);

  const [tasks, setTasks] = useState();
  useEffect(() => {
    completedTasksRef.on("value", (snapshot) => {
      const tmp = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const k in data) {
          tmp.push(data[k]);
        }
      }
      setTasks(tmp);
    });
  }, []);
  return tasks == undefined ? (
    <Loader />
  ) : (
    <VStack spacing={0} align="start" w="100%">
      <Heading size="sm">Completed</Heading>
      <TableContainer w="100%">
        <Table variant="striped" colorScheme="green">
          <Thead>
            <Tr>
              <Th>Task</Th>
              <Th>Assignee</Th>
              <Th>Deadline</Th>
              <Th></Th>
            </Tr>
          </Thead>
          <Tbody>
            {tasks.map((task) => (
              <TaskItem task={task} completed={true} key={task.taskId} />
            ))}
          </Tbody>
        </Table>
      </TableContainer>
    </VStack>
  );
}

export default CompletedTasks;
