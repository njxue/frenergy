import { Dropdown, Button } from "react-bootstrap";
import MODULES from "../../utils/modules";
import FACULTIES from "../../utils/faculties.json";
import { useEffect, useState } from "react";
import classes from "../../static/SelectModules.module.css";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { useAuth } from "../../contexts/AuthContext";

function SelectModules() {
  FACULTIES.sort();
  const [faculty, setFaculty] = useState(null);
  const [department, setDepartment] = useState(null);
  const [filteredDepartments, setFilteredDepartments] = useState([]);
  const [filteredModules, setFilteredModules] = useState([]);
  const [module, setModule] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const { currUser } = useAuth();
  const { addModule } = useUserInfoContext();

  function handleAdd(module) {
    addModule(module);
  }

  function resetAll() {
    setFaculty(null);
    setDepartment(null);
    setModule(null);
  }

  function handleChooseFaculty(faculty) {
    setIsLoading(true);
    setFaculty(faculty);
    if (department || module) {
      setDepartment(null);
      setModule(null);
    }
    const departments = Object.keys(MODULES[faculty]);
    departments.sort();
    setFilteredDepartments(departments);
    setIsLoading(false);
  }

  function handleChooseDepartment(department) {
    setIsLoading(true);
    setDepartment(department);
    if (module) {
        setModule(null);
    }
    const modules = Object.keys(MODULES[faculty][department]);
    modules.sort();
    setFilteredModules(modules);
    setIsLoading(false);
  }

  function handleChooseModule(module) {
    setIsLoading(true);
    setModule(module);
    setIsLoading(false);
    console.log(module);
  }

  return (
    <div className={classes.selectModules}>
      <Dropdown className={classes.dropdown}>
        <Dropdown.Toggle
          variant={faculty ? "success" : "secondary"}
          id="dropdown-basic"
        >
          {faculty ? faculty : "Select Faculty"}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ overflow: "scroll", maxHeight: "200px" }}>
          {FACULTIES.map((faculty) => {
            return (
              <Dropdown.Item onClick={() => handleChooseFaculty(faculty)}>
                {faculty}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className={classes.dropdown}>
        <Dropdown.Toggle
          variant={department ? "success" : "secondary"}
          id="dropdown-basic"
          disabled={!faculty || isLoading}
        >
          {department ? department : "Select Department"}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ overflow: "scroll", maxHeight: "200px" }}>
          {filteredDepartments.map((department) => {
            return (
              <Dropdown.Item onClick={() => handleChooseDepartment(department)}>
                {department}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <Dropdown className={classes.dropdown}>
        <Dropdown.Toggle
          variant={module ? "success" : "secondary"}
          id="dropdown-basic"
          disabled={!department}
        >
          {module ? module : "Select Module"}
        </Dropdown.Toggle>
        <Dropdown.Menu style={{ overflow: "scroll", maxHeight: "200px" }}>
          {filteredModules.map((module) => {
            return (
              <Dropdown.Item onClick={() => handleChooseModule(module)}>
                {module}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Dropdown>
      <div className={classes.btn}>
        <Button
          onClick={() => handleAdd(module)}
          disabled={!module}
          variant="primary"
        >
          Add
        </Button>
        <Button onClick={resetAll} variant="danger">
          Reset
        </Button>
      </div>
    </div>
  );
}

export default SelectModules;
