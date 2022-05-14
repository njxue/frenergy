import { ref } from "../../utils/firebase";

import { useAuth } from "../../contexts/AuthContext";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { useEffect, useState } from "react";
import { Card, CloseButton, ListGroup } from "react-bootstrap";
import SelectModules from "./SelectModules";
import classes from "../../static/Profile.module.css";

function Profile() {
  const { currUser } = useAuth();
  const { addModule, removeModule, modules } = useUserInfoContext();
  
  function handleRemove(module) {
    removeModule(module);
  }

  return (
    <div>
      <h1>{currUser.displayName}</h1>
      <div className={classes.modules}>
        <div className={classes.selectedModules}>
          <ListGroup>
            {modules &&
              modules.map((m) => (
                <ListGroup.Item>
                  {m}
                  <CloseButton onClick={() => handleRemove(m)} />
                </ListGroup.Item>
              ))}
          </ListGroup>
        </div>
        <SelectModules className={classes.selectModules} />
      </div>
    </div>
  );
}

export default Profile;
