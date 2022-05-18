import MODULES from "../../utils/modules";
import FACULTIES from "../../utils/faculties.json";
import { useEffect, useState } from "react";
import classes from "../../static/SelectModules.module.css";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { useAuth } from "../../contexts/AuthContext";
import { VStack, Select, Button } from "@chakra-ui/react";

function SelectModules() {
  FACULTIES.sort();
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [module, setModule] = useState(null);
  const [error, setError] = useState("");
  const { addModule } = useUserInfoContext();

  function handleAdd(module) {
    try {
      setError("");
      addModule(module);
    } catch (e) {
      setError(e);
    }
  }

  function resetAll() {
    setFaculty(null);
    setDepartment(null);
    setModule(null);
  }

  function handleFacultyChange(e) {
    setFaculty(e.target.value);
  }

  function handleDepartmentChange(e) {
    setDepartment(e.target.value);
  }

  function handleModuleChange(e) {
    setModule(e.target.value);
  }

  useEffect(() => {
    setDepartment(null);
    setModule(null);
    if (faculty) {
      const departments = Object.keys(MODULES[faculty]);
      departments.sort();
      console.log(departments);
      setFilteredDepartments(departments);
    }
  }, [faculty]);

  useEffect(() => {
    setModule(null);
    if (department) {
      const modules = Object.keys(MODULES[faculty][department]);
      modules.sort();
      setFilteredModules(modules);
    }
  }, [department]);

  return (
    <VStack space={6}>
      <Select
        variant={faculty ? "filled" : "outline"}
        bg={faculty ? "#E8FFE6" : "#EEEEEE"}
        value={faculty}
        defaultValue="Select Faculty"
        selec
        onChange={handleFacultyChange}
      >
        <option selected={!faculty} disabled>
          Select Faculty
        </option>
        {FACULTIES.map((faculty) => {
          return <option value={faculty}>{faculty}</option>;
        })}
      </Select>
      <Select
        variant={department ? "filled" : "outline"}
        bg={department ? "#E8FFE6" : "#EEEEEE"}
        value={department}
        onChange={handleDepartmentChange}
        disabled={!faculty}
        defaultValue="Select Department"
      >
        <option selected={!department} disabled>
          Select Department
        </option>
        {filteredDepartments.map((department) => {
          return <option value={department}>{department}</option>;
        })}
      </Select>
      <Select
        variant={module ? "filled" : "outline"}
        bg={module ? "#E8FFE6" : "#EEEEEE"}
        value={module}
        onChange={handleModuleChange}
        disabled={!department}
        defaultValue="Select Module"
      >
        <option selected={!module} disabled>
          Select Module
        </option>
        {filteredModules.map((module) => {
          return <option value={module}>{module}</option>;
        })}
      </Select>
      <div className={classes.btn}>
        <Button
          onClick={() => handleAdd(module)}
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
  );
}

export default SelectModules;
