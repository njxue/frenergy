import {
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
  Tbody,
  VStack,
  Heading,
  HStack,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import CompletedTasks from "./CompletedTasks";
import IncompletedTasks from "./IncompletedTasks";

function TaskList(props) {
  const { projectId } = props;
  
  const projectRef = ref.child(`projects/${projectId}`);

  const [projectName, setProjectName] = useState();

  const [progress, setProgress] = useState(0);

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

  return projectName == undefined ? (
    <Loader />
  ) : (
    <VStack w="100%" align="start">
      <HStack>
        <Heading>{projectName}</Heading>
        <CircularProgress value={progress}>
          <CircularProgressLabel>{progress}%</CircularProgressLabel>
        </CircularProgress>
      </HStack>
      <IncompletedTasks projectId={projectId} />
      <CompletedTasks projectId={projectId} />
    </VStack>
  );
}

export default TaskList;
