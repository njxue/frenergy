import { Select } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getAllFaculties } from "../../api/nusmods";

function FacultyFilter(props) {
  const [faculties, setFaculties] = useState([]);
  const { faculty, setFaculty } = props;
  //console.log("filter fac render");
  useEffect(() => {
    getAllFaculties().then((f) => setFaculties(f));
  }, []);

  function handleFacultyChange(e) {
    setFaculty(e.target.value);
  }
  return (
    <Select
      variant={faculty ? "filled" : "outline"}
      bg={faculty ? "#051e3e" : "white"}
      color={faculty ? "white" : "black"}
      value={faculty || ""}
      onChange={handleFacultyChange}
      _focus={{ bg: "#051e3e", color: "white" }}
      _hover={{ borderColor: "#051e3e" }}
    >
      <option disabled value="">
        Select Faculty
      </option>
      {faculties.map((faculty) => {
        return (
          <option style={{ color: "black" }} value={faculty}>
            {faculty}
          </option>
        );
      })}
    </Select>
  );
}

export default FacultyFilter;
