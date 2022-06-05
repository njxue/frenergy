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

function IncompleteTasks(props) {
  const { projectId } = props;

  const [tasks, setTasks] = useState();

  useEffect(() => {
    const incompleteTasksRef = ref.child(
      `projects/${projectId}/tasks/incomplete`
    );
    incompleteTasksRef.on("value", (snapshot) => {
      const tmp = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const k in data) {
          tmp.push(data[k]);
        }
      }

      tmp.reverse();
      tmp.sort((t1, t2) => {
        return t1.important
          ? -1
          : !t2.important && t1.taskId < t2.taskId
          ? -1
          : 1;
      });
      setTasks(tmp);
    });
  }, [projectId]);

  return tasks == undefined ? (
    <Loader />
  ) : (
    <TableContainer w="100%">
      <Table variant="striped">
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
            <TaskItem task={task} completed={false} key={task.taskId} />
          ))}
          <AddTask projectId={projectId} />
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default IncompleteTasks;
