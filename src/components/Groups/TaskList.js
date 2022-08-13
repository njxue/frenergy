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
import { PopoverBody } from "react-bootstrap";
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
  const [completedTasks, setCompletedTasks] = useState();
  const [incompleteTasks, setIncompleteTasks] = useState();
  const [progress, setProgress] = useState(0);

  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    projectRef.on("value", (snapshot) => {
      const data = snapshot.val();
      setProjectName(data.name);

      let numCompleted = 0;
      let numIncomplete = 0;

      let completed = [];
      let incomplete = [];

      if (data.tasks) {
        if (data.tasks.completed) {
          for (const k in data.tasks.completed) {
            numCompleted++;
            completed.push(data.tasks.completed[k]);
          }
        }
        if (data.tasks.incomplete) {
          for (const k in data.tasks.incomplete) {
            numIncomplete++;
            incomplete.push(data.tasks.incomplete[k]);
          }
        }
        setProgress(
          Math.round((numCompleted * 100) / (numCompleted + numIncomplete))
        );
      }
      completed.reverse();
      incomplete.reverse();

      incomplete.sort((t1, t2) => {
        return t1.important
          ? -1
          : !t2.important && t1.taskId < t2.taskId
          ? -1
          : 1;
      });
      setCompletedTasks(completed);
      setIncompleteTasks(incomplete);
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
          <IncompleteTasks projectId={projectId} tasks={incompleteTasks} />
          {!hidden && <CompletedTasks tasks={completedTasks} />}
        </VStack>
      </AccordionPanel>
    </AccordionItem>
  );
}

export default TaskList;
