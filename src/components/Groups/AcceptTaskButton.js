import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function AcceptTaskButton(props) {
  const { task } = props;
  const { taskId, projectId } = task;
  const { currUser } = useAuth();
  const taskRef = ref.child(`projects/${projectId}/tasks/${taskId}`);

  const hasAccepted = task.assignees && task.assignees[currUser.uid];

  function handleAccept() {
    taskRef.child(`assignees/${currUser.uid}`).set(true);
  }

  function handleRetract() {
    taskRef.child(`assignees/${currUser.uid}`).set(null);
  }
  return hasAccepted ? (
    <Button colorScheme="red" onClick={handleRetract}>
      Retract
    </Button>
  ) : (
    <Button colorScheme="green" onClick={handleAccept}>
      I'll do it!
    </Button>
  );
}

export default AcceptTaskButton;
