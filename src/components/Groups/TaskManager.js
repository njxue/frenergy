import AddProject from "./AddProject";
import ProjectList from "./ProjectList";

function TaskManager(props) {
  const { groupId } = props;
  return (
    <>
      <AddProject groupId={groupId} />
      <ProjectList groupId={groupId} />
    </>
  );
}

export default TaskManager;
