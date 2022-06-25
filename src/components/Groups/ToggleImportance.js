import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { Icon, Tooltip } from "@chakra-ui/react";
import { ref } from "../../config/firebase";

function ToggleImportance(props) {
  const { task } = props;
  const { important, taskId, projectId } = task;
  const taskRef = ref.child(`projects/${projectId}/tasks/incomplete/${taskId}`);

  function handleClick() {
    taskRef.update({
      important: !important,
    });
  }

  return (
    <Tooltip
      shouldWrapChildren
      label={important ? "Important" : "Unmark important"}
    >
      <Icon
        as={important ? AiFillStar : AiOutlineStar}
        cursor="pointer"
        color={important ? "gold" : "black"}
        onClick={handleClick}
      />
    </Tooltip>
  );
}

export default ToggleImportance;
