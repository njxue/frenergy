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
      getDepartmentsInFaculty(2021, faculty).then((d) => setDepartments(d));
    } else {
      setDepartments([]);
    }
    setDepartment(null);
  }, [faculty]);

  return (
    <Select
      variant={department ? "filled" : "outline"}
      bg={department ? "#E8FFE6" : "#EEEEEE"}
      value={department || ""}
      onChange={handleDepartmentChange}
    >
      <option disabled value="">
        Select Department
      </option>
      {departments.map((department) => {
        return <option value={department}>{department}</option>;
      })}
    </Select>
  );
}

export default DepartmentFilter;
