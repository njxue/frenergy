import FACULTIES from "../../utils/faculties.json";
import { Select } from "@chakra-ui/react";

function FacultyFilter(props) {
  const { handleFacultyChange, faculty } = props;
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
      {FACULTIES.map((faculty) => {
        return <option value={faculty}>{faculty}</option>;
      })}
    </Select>
  );
}

export default FacultyFilter;
