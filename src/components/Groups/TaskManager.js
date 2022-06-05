import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import AddProject from "./AddProject";
import ProjectList from "./ProjectList";

function TaskManager(props) {
  const { groupId } = props;

  const [projectIds, setProjectIds] = useState();
  useEffect(() => {
    ref.child(`groups/${groupId}/projects`).on("value", (snapshot) => {
      const tmp = [];
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const k in data) {
          tmp.push(k);
        }
      }
      tmp.reverse();
      setProjectIds(tmp);
     
    });
  }, [groupId]);

  //useEffect(() => console.log(projectIds), [projectIds]);
  return projectIds == undefined ? (
    <Loader />
  ) : (
    <>
      <AddProject groupId={groupId} />
      <ProjectList projectIds={projectIds} />
    </>
  );
}

export default TaskManager;
