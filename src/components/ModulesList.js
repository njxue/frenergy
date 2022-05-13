import { useEffect, useState } from "react";
import { ListGroup, Nav } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useUserInfoContext } from "../contexts/UserInfoContext";
import SelectModules from "./SelectModules";

function ModulesList() {
  const { modules } = useUserInfoContext();
  const navigate = useNavigate();
  return (
    <div>
      <h1>My Modules</h1>
      <ListGroup>
        {modules.map((m) => (
          <ListGroup.Item key={m}>
            <Nav.Link href={m}>{m}</Nav.Link>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
}

export default ModulesList;
