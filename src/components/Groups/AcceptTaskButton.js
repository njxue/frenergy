import { Button } from "@chakra-ui/react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useError } from "../../utils/helper";
import { useState } from "react";

function AcceptTaskButton(props) {
  const { task } = props;
  const { currUser } = useAuth();
  const { taskId, projectId } = task;
  const { setError } = useError();

  const [accepted, setAccepted] = useState(
    task.assignees && task.assignees[currUser.uid]
  );

  const taskRef = ref.child(`projects/${projectId}/tasks/incomplete/${taskId}`);

  function handleAccept() {
    setAccepted(true);
    taskRef.child(`assignees/${currUser.uid}`).set(true, (err) => {
      if (err) {
        setError("Unable to accept task");
        setAccepted(false);
      }
    });
  }

  function handleRetract() {
    setAccepted(false);
    taskRef.child(`assignees/${currUser.uid}`).set(null, (err) => {
      if (err) {
        setError("Unable to retract task");
        setAccepted(true);
      }
    });
  }
  return (
    <Button
      colorScheme={accepted ? "red" : "green"}
      onClick={accepted ? handleRetract : handleAccept}
      data-testid="taskBtn"
    >
      {accepted ? "Retract" : "I'll do it!"}
    </Button>
  );
}

export default AcceptTaskButton;
