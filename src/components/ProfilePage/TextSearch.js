import WindowedSelect from "react-windowed-select";
import { createFilter, WindowedMenuList } from "react-windowed-select";
import CustomOption from "./CustomOption";
import { useEffect, useState } from "react";
import allModules from "../../utils/moduleCodesDropdown";
import keyByFaculty from "../../utils/keybyfaculty";

function TextSearch(props) {
  const { faculty, department, setSelectedModules, selectedModules } = props;
  const [filteredModules, setFilteredModules] = useState(allModules);


  function handleChange(selectedModules) {
    setSelectedModules(selectedModules);
  }

  useEffect(() => {
    if (faculty) {
      const modules = [];
      const departmentsInFaculty = keyByFaculty[faculty];

      if (!department) {
        for (const dpm in departmentsInFaculty) {
          const modulesInDepartment = Object.keys(departmentsInFaculty[dpm]);
          for (const module in modulesInDepartment) {
            modules.push({
              value: modulesInDepartment[module],
              label: modulesInDepartment[module],
            });
          }
        }
      } else {
        const modulesInDepartment = Object.keys(
          departmentsInFaculty[department]
        );
        for (const module in modulesInDepartment) {
          modules.push({
            value: modulesInDepartment[module],
            label: modulesInDepartment[module],
          });
        }
      }
      setFilteredModules(modules);
    }
  }, [faculty, department]);

  return (
    <div>
      <WindowedSelect
        isMulti={true}
        value={selectedModules}
        onChange={handleChange}
        styles={{ control: () => ({ width: "200px" }) }}
        filterOption={createFilter(false)}
        options={filteredModules}
        components={{ Option: CustomOption, MenuList: WindowedMenuList }}
      ></WindowedSelect>
    </div>
  );
}

export default TextSearch;
