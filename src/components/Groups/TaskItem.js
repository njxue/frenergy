import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  Td,
  Tr,
  ButtonGroup,
  Flex,
  Spacer,
  Icon,
  HStack,
  Text,
} from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { formatDate } from "../../utils/helper";
import DeleteButton from "../layout/DeleteButton";
import AcceptTaskButton from "./AcceptTaskButton";
import Assignees from "./Assignees";
import ToggleCompletion from "./ToggleCompletion";
import ToggleImportance from "./ToggleImportance";
import { WarningIcon } from "@chakra-ui/icons";

function TaskItem(props) {
  const { task, completed } = props;
  const { name, deadline, taskId, projectId } = task;
  const today = new Date();
  const rawDeadlineDate = new Date(Date.parse(deadline));
  const passedDeadline = today > rawDeadlineDate;

  today.setHours(0, 0, 0, 0);

  const formattedDate = formatDate(rawDeadlineDate, true);

  function handleDelete() {
    ref.child(`projects/${projectId}/tasks/incomplete/${taskId}`).remove();
  }

  return (
    <Tr>
      <Td data-testid="name">{name}</Td>
      <Td>
        <Assignees assignees={task.assignees} />
      </Td>
      <Td>
        <HStack>
          <Text>{completed ? "Completed" : formattedDate}</Text>
          {passedDeadline && !completed && <WarningIcon color="red" />}
        </HStack>
      </Td>
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
          <HStack>
            {!completed && <ToggleImportance task={task} />}
            <ToggleCompletion task={task} completed={completed} />
          </HStack>
        </Flex>
      </Td>
    </Tr>
  );
}

export default TaskItem;
