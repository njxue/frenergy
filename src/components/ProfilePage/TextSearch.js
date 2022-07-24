import WindowedSelect from "react-windowed-select";
import { createFilter, WindowedMenuList } from "react-windowed-select";
import CustomOption from "./CustomOption";
import { useMemo, useState } from "react";
import {
  transformToMenuItems,
  getAllModules,
  getModulesInDepartment,
  getModulesInFaculty,
} from "../../api/nusmods";
import { Box } from "@chakra-ui/react";

function TextSearch(props) {
  const { faculty, department, setSelectedModules, selectedModules } = props;
  const [modules, setModules] = useState([]);

  const allModules = useMemo(() => {
    if (!faculty && !department) {
      getAllModules().then((m) => {
        setModules(transformToMenuItems(m));
      });
    }
  }, [faculty, department]);

  const modulesInDepartment = useMemo(() => {
    if (faculty && department) {
      getModulesInDepartment(faculty, department).then((m) => {
        setModules(transformToMenuItems(m));
      });
    }
  }, [department]);

  const modulesInFaculty = useMemo(() => {
    if (faculty && !department) {
      getModulesInFaculty(2021, faculty).then((m) => {
        setModules(transformToMenuItems(m));
      });
    }
  }, [faculty]);

  function handleChange(e) {
    setSelectedModules(e);
  }

  return (
    <Box w="100%">
      <WindowedSelect
        isMulti={true}
        value={selectedModules}
        onChange={handleChange}
        menuPlacement="top"
        styles={{
          control: (base) => ({ ...base, width: "100%" }),
          option: (base) => ({ ...base, position: "fixed" }),
        }}
        filterOption={createFilter(false)}
        options={modules}
        components={{ Option: CustomOption, MenuList: WindowedMenuList }}
      ></WindowedSelect>
    </Box>
  );
}

export default TextSearch;
