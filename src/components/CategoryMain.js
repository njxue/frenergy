import { Button, Table, Nav } from "react-bootstrap";
import { THREADS } from "../utils/tmpapi";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate } from 'react-router-dom'

function CategoryMain(props) {
  const db = "https://study-e0762-default-rtdb.firebaseio.com";
  const path = db + "/" + props.mod + "/" + props.cat + ".json";
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [threads, setThreads] = useState([]);

  function loadThreads() {
    try {
      fetch(path)
        .then((response) => response.json())
        .then((data) => {
          const tmp = [];
          for (const key in data) {
            tmp.push(data[key]);
          }
          setThreads(tmp);
        });
    } catch {}
  }

  function createNew() {
    setModalIsOpen(true);
  }

  useEffect(loadThreads, []);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <section>
          <h1>{props.cat}</h1>
        </section>
        <section>
          <Button onClick={createNew}>Create new thread</Button>
        </section>
      </div>
      <CreateNewModal
        show={modalIsOpen}
        setShow={setModalIsOpen}
        cat={props.cat}
        mod={props.mod}
      />
      <Table striped hover>
        <thead>
            <tr>
              <th>Title</th>
              <th>Views</th>
              <th>Most Recent</th>
            </tr>
        </thead>
        <tbody>
          {threads.map((t) => {
            return (
              <tr onClick={() => navigate()}>
                <td>{t.title}</td>
                <td>{t.views}</td>
                <td>{t.recent}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryMain;
