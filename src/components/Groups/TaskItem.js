import { CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  HStack,
  Td,
  Tr,
  Text,
  Badge,
  Button,
  ButtonGroup,
  IconButton,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useFormatDate } from "../../utils/helper";
import DeleteButton from "../layout/DeleteButton";
import AcceptTaskButton from "./AcceptTaskButton";
import Assignees from "./Assignees";
import ToggleCompletion from "./ToggleCompletion";

function TaskItem(props) {
  const { task, completed } = props;
  const { name, deadline, taskId, projectId } = task;

  const formatDate = useFormatDate(new Date(Date.parse(deadline)));

  function handleDelete() {
    ref.child(`projects/${projectId}/tasks/incomplete/${taskId}`).remove();
  }

  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        <Assignees assignees={task.assignees} />
      </Td>
      <Td>{completed ? "Completed" : formatDate}</Td>
      <Td>
        <Flex justifyContent="space-between">
          {!completed ? (
            <ButtonGroup>
              <AcceptTaskButton task={task} />
              <DeleteButton
                action="delete this task"
                handleDelete={handleDelete}
              />
            </ButtonGroup>
          ) : (
            <Spacer />
          )}
          <ToggleCompletion task={task} completed={completed} />
        </Flex>
      </Td>
    </Tr>
  );
}

export default TaskItem;
