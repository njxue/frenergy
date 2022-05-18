import { ref } from "../../utils/firebase";

import { useAuth } from "../../contexts/AuthContext";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { useEffect, useState } from "react";
import { Card, CloseButton, ListGroup } from "react-bootstrap";
import SelectModules from "./SelectModules";
import classes from "../../static/Profile.module.css";
import { Heading, TableContainer } from "@chakra-ui/react";
import ModulesList from "../Dashboard/ModulesList";

function Profile() {
  const { currUser } = useAuth();

  return (
    <div>
      <div className={classes.modules}>
        <ModulesList editable={true} />
        <SelectModules className={classes.selectModules} />
      </div>
    </div>
  );
}

export default Profile;
