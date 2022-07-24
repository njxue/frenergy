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

function ModuleSearch(props) {
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
      getModulesInFaculty(faculty).then((m) => {
        setModules(transformToMenuItems(m));
      });
    }
  }, [faculty]);

  function handleChange(e) {
    setSelectedModules(e);
  }

  return (
    <div>
      <WindowedSelect
        isMulti={true}
        value={selectedModules}
        onChange={handleChange}
        styles={{ control: () => ({ width: "200px" }) }}
        filterOption={createFilter(false)}
        options={modules}
        components={{ Option: CustomOption, MenuList: WindowedMenuList }}
      ></WindowedSelect>
    </div>
  );
}

export default ModuleSearch;
