import { Select } from "@chakra-ui/react";
import keyByFaculty from "../../utils/keybyfaculty";
import { useState, useEffect } from "react";

function DepartmentFilter(props) {
  const { faculty, department, setDepartment } = props;
  const [filteredDepartments, setFilteredDepartments] = useState([]);

  function handleDepartmentChange(e) {
    setDepartment(e.target.value);
  }

  useEffect(() => {
    if (faculty) {
      const departmentsInFaculty = keyByFaculty[faculty];
      setFilteredDepartments(Object.keys(departmentsInFaculty));
    }
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
      {filteredDepartments.map((department) => {
        return <option value={department}>{department}</option>;
      })}
    </Select>
  );
}

export default DepartmentFilter;
