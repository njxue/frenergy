import { Input, Td, Tr, Button } from "@chakra-ui/react";
import { forwardRef, useRef, useState } from "react";
import { ref } from "../../config/firebase";
import DatePicker from "react-datepicker";

function AddTask(props) {
  const { projectId } = props;
  const [taskName, setTaskName] = useState();

  const today = new Date();
  const [deadline, setDeadline] = useState(today);

  const incompleteTasksRef = ref.child(`projects/${projectId}/tasks/incomplete`);

  function handleSumbit(e) {
    e.preventDefault();

    const taskId = incompleteTasksRef.push().key;

    const taskObj = {
      name: taskName,
      deadline: deadline.toString(),
      projectId: projectId,
      taskId: taskId,
    };

    incompleteTasksRef.child(taskId).set(taskObj);
    setTaskName("");

    setDeadline(today);
  }

  const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
    <Button onClick={onClick} ref={ref} variant="ghost">
      {value}
    </Button>
  ));
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
            bg="transparent"
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
          customInput={<CustomDateInput />}
        />
      </Td>
      <Td></Td>
    </Tr>
  );
}

export default AddTask;
