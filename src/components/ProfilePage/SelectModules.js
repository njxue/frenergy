import { useState, useEffect, useLayoutEffect } from "react";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { VStack, Button, ButtonGroup } from "@chakra-ui/react";
import TextSearch from "./TextSearch";
import FacultyFilter from "./FacultyFilter";
import DepartmentFilter from "./DepartmentFilter";
import Loader from "../layout/Loader";
import { useUserModules } from "../../utils/helper";
import { useAuth } from "../../contexts/AuthContext";

function SelectModules() {
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);

  const [selectedModules, setSelectedModules] = useState([]);

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { currUser } = useAuth();

  const { addModule } = useUserModules(currUser.uid);

  function handleAdd() {
    try {
      console.log("adding");
      setError("");
      for (const module in selectedModules) {
        addModule(selectedModules[module].value);
        console.log(module);
      }
      setSelectedModules([]);
    } catch (e) {
      setError(e);
    }
  }

  function resetAll() {
    setFaculty(null);
    setDepartment(null);
    setSelectedModules([]);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <VStack space={6}>
      <FacultyFilter setFaculty={setFaculty} faculty={faculty} />
      <DepartmentFilter
        faculty={faculty}
        department={department}
        setDepartment={setDepartment}
      />
      <TextSearch
        faculty={faculty}
        department={department}
        setSelectedModules={setSelectedModules}
        selectedModules={selectedModules}
      />
      <ButtonGroup>
        <Button
          onClick={() => handleAdd()}
          disabled={!module}
          colorScheme="green"
        >
          Add
        </Button>
        <Button onClick={resetAll} colorScheme="red">
          Reset
        </Button>
      </ButtonGroup>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </VStack>
  );
}

export default SelectModules;
