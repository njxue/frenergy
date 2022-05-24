import SelectModules from "./SelectModules";
import classes from "../../static/Profile.module.css";
import ModulesList from "../Dashboard/ModulesList";

function Profile() {
  return (
    <div>
      <div className={classes.modules}>
        <ModulesList editable={true} />
        <SelectModules />
      </div>
    </div>
  );
}

export default Profile;
