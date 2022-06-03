import { Box, HStack, Td, Tr, Text, Badge, Button } from "@chakra-ui/react";
import { useFormatDate } from "../../utils/helper";
import VolunteerButton from "./VolunteerButton";
import Assignees from "./Assignees";

function TaskItem(props) {
  const { task } = props;
  const { name, deadline } = task;
   
  const formatDate = useFormatDate(new Date(Date.parse(deadline)));
  return (
    <Tr>
      <Td>{name}</Td>
      <Td>
        <Assignees assignees={task.assignees} />
      </Td>
      <Td>{formatDate}</Td>
      <Td>
        <VolunteerButton task={task} />
      </Td>
    </Tr>
  );
}

export default TaskItem;
