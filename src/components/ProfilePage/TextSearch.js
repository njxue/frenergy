import WindowedSelect from "react-windowed-select";
import { createFilter, WindowedMenuList } from "react-windowed-select";
import CustomOption from "./CustomOption";
import { useEffect, useMemo, useState } from "react";
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
        placeholder="Select module"
        filterOption={createFilter(false)}
        options={modules}
        components={{ Option: CustomOption, MenuList: WindowedMenuList }}
      />
    </Box>
  );
}

export default TextSearch;
