import { Select } from "@chakra-ui/react";
import { getAllModules, transformToMenuItems } from "../../api/nusmods";
import { useEffect, useMemo, useState } from "react";
import WindowedSelect from "react-windowed-select";
import { createFilter, WindowedMenuList } from "react-windowed-select";
import CustomOption from "../ProfilePage/CustomOption";

function ModuleFilter(props) {
  const [modules, setModules] = useState([]);
  const { module, setModule } = props;

  useEffect(() => {
    getAllModules(2021).then((allModules) => {
      setModules(transformToMenuItems(allModules));
    });
  }, []);

  const general = {
    value: {
      moduleCode: "None",
      title: "None",
    },
    label: "None",
  };
  return (
    <WindowedSelect
      defaultValue={general}
      value={module}
      onChange={(e) => setModule(e)}
      options={[general, ...modules]}
      filterOption={createFilter(false)}
      styles={{ control: () => ({ width: "200px" }) }}
      components={{ Option: CustomOption, MenuList: WindowedMenuList }}
    />
  );
}

export default ModuleFilter;
