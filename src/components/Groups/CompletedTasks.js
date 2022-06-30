import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  VStack,
  Heading,
  Text,
  Divider,
  Icon,
  HStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import { MdOutlineDownloadDone } from "react-icons/md";
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
    <VStack spacing={3} align="start" w="100%">
      <HStack>
        <Heading size="xs">Completed</Heading>
        <Icon as={MdOutlineDownloadDone} />
      </HStack>
      <Divider color="gray.300" />
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
