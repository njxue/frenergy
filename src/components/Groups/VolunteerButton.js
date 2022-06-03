import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function VolunteerButton(props) {
  const { task } = props;
  const { taskId, projectId } = task;
  const { currUser } = useAuth();
  const taskRef = ref.child(`projects/${projectId}/tasks/${taskId}`);

  function handleClick() {
    taskRef.child(`assignees/${currUser.uid}`).set(true);
  }
  return (
    <Button onClick={handleClick} disabled={task.assignees && task.assignees[currUser.uid]}>
      I'll do it!
    </Button>
  );
}

export default VolunteerButton;
