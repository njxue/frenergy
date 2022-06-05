import { PlusSquareIcon } from "@chakra-ui/icons";
import {
  Button,
  Popover,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  PopoverHeader,
  FormControl,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef } from "react";
import { ref } from "../../config/firebase";

function AddProject(props) {
  const { groupId } = props;
  const projectNameRef = useRef();
  const projectRef = ref.child(`groups/${groupId}/projects`);

  const { onToggle, onClose } = useDisclosure();

  function handleSubmit(e) {
    e.preventDefault();
    const projectId = projectRef.push().key;

    const project = {
      name: projectNameRef.current.value,
      projectId: projectId,
      groupId: groupId,
      deadline: "",
    };

    projectRef.child(projectId).set(true);

    ref.child(`projects/${projectId}`).set(project);

    onToggle();
  }
  return (
    <Popover
      initialFocusRef={projectNameRef}
      placement="right"
      returnFocusOnClose={false}
    >
      <PopoverTrigger>
        <Button
          rightIcon={<PlusSquareIcon />}
          onClick={onToggle}
          colorScheme="pink"
        >
          Add Project
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverHeader>New Project</PopoverHeader>
        <form onSubmit={handleSubmit}>
          <FormControl padding={2}>
            <Input
              placeholder="Project name"
              type="text"
              ref={projectNameRef}
            ></Input>
          </FormControl>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default AddProject;
