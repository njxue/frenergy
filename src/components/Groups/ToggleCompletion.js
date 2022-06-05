import { IconButton } from "@chakra-ui/react";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { ref } from "../../config/firebase";

function ToggleCompletion(props) {
  const { task, completed } = props;
  const { taskId, projectId } = task;

  const completedTasksRef = ref.child(`projects/${projectId}/tasks/completed`);
  const incompleteTasksRef = ref.child(
    `projects/${projectId}/tasks/incomplete`
  );

  function handleClick() {
    if (completed) {
      incompleteTasksRef.child(taskId).set(task);
      completedTasksRef.child(taskId).remove();
    } else {
      completedTasksRef.child(taskId).set(task);
      incompleteTasksRef.child(taskId).remove();
    }
  }

  return (
    <IconButton
      icon={completed ? <CloseIcon /> : <CheckIcon />}
      variant="ghost"
      onClick={handleClick}
    />
  );
}

export default ToggleCompletion;
