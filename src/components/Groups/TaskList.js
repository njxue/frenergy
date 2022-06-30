import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Icon,
  VStack,
  Heading,
  HStack,
  CircularProgress,
  CircularProgressLabel,
  Editable,
  EditableInput,
  EditablePreview,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Button,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
} from "@chakra-ui/react";
import { ViewOffIcon, ViewIcon } from "@chakra-ui/icons";
import { useEffect, useRef, useState } from "react";
import { ButtonGroup, PopoverBody } from "react-bootstrap";
import { ref } from "../../config/firebase";
import DeleteButton from "../layout/DeleteButton";
import Loader from "../layout/Loader";
import CompletedTasks from "./CompletedTasks";
import IncompleteTasks from "./IncompleteTasks";
import { useSuccess, useError } from "../../utils/helper";
import { MdOutlineDownloadDone } from "react-icons/md";

function TaskList(props) {
  const { projectId, groupId } = props;
  const initFocus = useRef();
  const projectRef = ref.child(`projects/${projectId}`);
  const { setSuccess } = useSuccess();
  const { setError } = useError();

  const [projectName, setProjectName] = useState();

  const [progress, setProgress] = useState(0);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    projectRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setProjectName(data.name);

      var numCompleted = 0;
      var numIncomplete = 0;
      if (data.tasks) {
        if (data.tasks.completed) {
          numCompleted += Object.keys(data.tasks.completed).length;
        }

        if (data.tasks.incomplete) {
          numIncomplete += Object.keys(data.tasks.incomplete).length;
        }
        setProgress(
          Math.round((numCompleted * 100) / (numCompleted + numIncomplete))
        );
      }
    });
  }, [projectId]);

  function handleNameChange(e) {
    if (e.trim().length > 0) {
      projectRef.update({
        name: e,
      });
    } else {
      setProjectName("<Name>");
      setError("Group name must contain at least 1 character");
    }
  }

  function handleDelete() {
    const updateObj = {
      [`projects/${projectId}`]: null,
      [`groups/${groupId}/projects/${projectId}`]: null,
    };

    ref.update(updateObj, (error) => {
      if (error) {
        setError("Unable to delete project. Please try again later");
      } else {
        setSuccess("Deleted " + projectName);
      }
    });
  }

  return projectName == undefined ? (
    <Loader />
  ) : (
    <AccordionItem>
      <AccordionButton>
        <HStack justifyContent="space-between" w="100%">
          <HStack>
            <Editable
              value={projectName}
              onChange={(e) => setProjectName(e)}
              onSubmit={handleNameChange}
            >
              <Heading size="md">
                <EditablePreview />
                <EditableInput />
              </Heading>
            </Editable>
            <HStack>
              <CircularProgress
                value={progress}
                color={progress == 100 ? "darkblue" : "red"}
              >
                <CircularProgressLabel>{progress}%</CircularProgressLabel>
              </CircularProgress>
              {progress == 100 && <Icon as={MdOutlineDownloadDone} />}
            </HStack>
          </HStack>
          <AccordionIcon />
        </HStack>
      </AccordionButton>

      <AccordionPanel>
        <Popover placement="bottom-start" initialFocusRef={initFocus}>
          <PopoverTrigger>
            <ChevronDownIcon />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverBody>
              <HStack margin={0}>
                <DeleteButton
                  action="delete this project"
                  text="Delete"
                  handleDelete={handleDelete}
                />
                <Button
                  colorScheme={hidden ? "green" : "blue"}
                  leftIcon={hidden ? <ViewIcon /> : <ViewOffIcon />}
                  ref={initFocus}
                  onClick={() => {
                    setHidden(!hidden);
                  }}
                >
                  {hidden ? "Show Completed" : "Hide Completed"}
                </Button>
              </HStack>
            </PopoverBody>
          </PopoverContent>
        </Popover>
        <VStack w="100%" align="start" spacing={10}>
          <IncompleteTasks projectId={projectId} />
          {!hidden && <CompletedTasks projectId={projectId} />}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default TaskList;
