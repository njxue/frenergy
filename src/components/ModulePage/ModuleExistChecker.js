import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DoesNotExist from "../layout/DoesNotExist";
import ModuleMain from "./ModuleMain";
import { checkModuleExists } from "../../api/nusmods";
import Loader from "../layout/Loader";

function ModuleExistChecker(props) {
  const [exists, setExists] = useState();
  const { moduleCode } = useParams();

  useEffect(() => {
    checkModuleExists(moduleCode).then((response) => setExists(response));
  }, [moduleCode]);

  return exists == undefined ? (
    <Loader />
  ) : exists ? (
    props.children
  ) : (
    <DoesNotExist message={`The module code "${moduleCode}" does not exist`} />
  );
}

export default ModuleExistChecker;
