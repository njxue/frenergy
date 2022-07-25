import { Select } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { getDepartmentsInFaculty } from "../../api/nusmods";
function DepartmentFilter(props) {
  const { faculty, department, setDepartment } = props;

  const [departments, setDepartments] = useState([]);

  function handleDepartmentChange(e) {
    setDepartment(e.target.value);
  }

  useEffect(() => {
    if (faculty) {
      getDepartmentsInFaculty(faculty).then((d) => setDepartments(d));
    } else {
      setDepartments([]);
    }
    setDepartment(null);
  }, [faculty]);

  return (
    <Select
      variant={department ? "filled" : "outline"}
      bg={department ? "#051e3e" : "white"}
      color={department ? "white" : "black"}
      value={department || ""}
      onChange={handleDepartmentChange}
      _focus={{ bg: "#051e3e", color: "white" }}
      _hover={{ borderColor: "#051e3e" }}
    >
      <option disabled value="">
        Select Department
      </option>
      {departments.map((department) => {
        return (
          <option
            style={{ color: "black" }}
            value={department}
            key={department}
          >
            {department}
          </option>
        );
      })}
    </Select>
  );
}

export default DepartmentFilter;
