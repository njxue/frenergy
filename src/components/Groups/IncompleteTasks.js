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

import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

function IncompleteTasks(props) {
  const { projectId, tasks } = props;

  return (
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
