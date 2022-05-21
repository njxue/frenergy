import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllFaculties } from "../../api/nusmods";

function FacultyFilter(props) {
  const [faculties, setFaculties] = useState([]);
  const { faculty, setFaculty } = props;
  //console.log("filter fac render");
  useEffect(() => {
    getAllFaculties(2021).then((f) => setFaculties(f));
  }, []);

  function handleFacultyChange(e) {
    setFaculty(e.target.value);
  }
  return (
    <Select
      variant={faculty ? "filled" : "outline"}
      bg={faculty ? "#E8FFE6" : "#EEEEEE"}
      value={faculty || ""}
      onChange={handleFacultyChange}
    >
      <option disabled value="">
        Select Faculty
      </option>
      {faculties.map((faculty) => {
        return <option value={faculty}>{faculty}</option>;
      })}
    </Select>
  );
}

export default FacultyFilter;
