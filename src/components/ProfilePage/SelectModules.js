import keyByFaculty from "../../utils/keybyfaculty";
import moduleCodesDropdown from "../../utils/moduleCodesDropdown.json";

import { useEffect, useState } from "react";
import classes from "../../static/SelectModules.module.css";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { VStack, Select, Button } from "@chakra-ui/react";
import TextSearch from "./TextSearch";
import FacultyFilter from "./FacultyFilter";
import DepartmentFilter from "./DepartmentFilter";

function SelectModules() {
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [selectedModules, setSelectedModules] = useState([]);
  const [error, setError] = useState("");
  const { addModule } = useUserInfoContext();

  function handleAdd(selectModules) {
    try {
      setError("");
      for (const module in selectedModules) {
        addModule(selectModules[module].value);
      }
    } catch (e) {
      setError(e);
    }
  }

  function resetAll() {
    setFaculty(null);
    setDepartment(null);
    setSelectedModules([]);
    //console.log(selectedModules)
  }

  function handleFacultyChange(e) {
    setFaculty(e.target.value);
    setDepartment(null);
  }

  return (
    <>
      <VStack space={6}>
        <FacultyFilter
          handleFacultyChange={handleFacultyChange}
          faculty={faculty}
        />
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
        <div className={classes.btn}>
          <Button
            onClick={() => handleAdd(selectedModules)}
            disabled={!module}
            colorScheme="green"
          >
            Add
          </Button>
          <Button onClick={resetAll} colorScheme="red">
            Reset
          </Button>
        </div>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </VStack>
    </>
  );
}

export default SelectModules;
