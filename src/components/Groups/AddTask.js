import { Input, Td, Tr } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { ref } from "../../config/firebase";
import DatePicker from "react-datepicker";
import { Button } from "bootstrap";

function AddTask(props) {
  const { projectId } = props;
  const [taskName, setTaskName] = useState();

  const today = new Date();
  const [deadline, setDeadline] = useState(today);

  const tasksRef = ref.child(`projects/${projectId}/tasks`);

  function handleSumbit(e) {
    e.preventDefault();

    const taskId = tasksRef.push().key;

    const taskObj = {
      name: taskName,
      
      deadline: deadline.toString(),
      projectId: projectId,
      taskId: taskId,
    };

    tasksRef.child(taskId).set(taskObj);
    setTaskName("");

    setDeadline(today);
  }

  return (
    <Tr>
      <Td padding={0}>
        <form onSubmit={handleSumbit}>
          <Input
            type="text"
            placeholder="Add task"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            variant="ghost"
          />
        </form>
      </Td>
      <Td padding={0}></Td>
      <Td>
        <DatePicker
          selected={deadline}
          onChange={(deadline) => setDeadline(deadline)}
          minDate={today}
          dateFormat="d MMMM, yyyy"
        />
      </Td>
    </Tr>
  );
}

export default AddTask;
