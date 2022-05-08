import { storageRef } from "../utils/firebase";
import { uploadBytes, uploadString } from "firebase/storage";
import { useAuth } from "../contexts/AuthContext";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import { useEffect, useState } from "react";
import { Dropdown, Card, CloseButton, ListGroup } from "react-bootstrap";
import context from "react-bootstrap/esm/AccordionContext";
import MODULES from "../utils/tmpapi";

function Profile() {
  const { currUser } = useAuth();
  const { addModule, removeModule, getModules, modules } = useUserInfoContext();

 
  function handleAdd(module) {
    addModule(module);
  }

  function handleRemove(module) {
    removeModule(module);
  }

  return (
    <div>
      <h1>{currUser.displayName}</h1>
      <div>
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
      <div>
        <Dropdown>
          <Dropdown.Toggle variant="secondary" id="dropdown-basic">
            Select Modules
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {MODULES.map((m) => (
              <Dropdown.Item onClick={() => handleAdd(m)}>{m}</Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Profile;
