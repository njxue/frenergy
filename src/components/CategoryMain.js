import { Button, Table, Nav } from "react-bootstrap";
import { THREADS } from "../utils/tmpapi";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate } from "react-router-dom";
import { ref } from "../utils/firebase";

function CategoryMain(props) {
  const navigate = useNavigate();
  const moduleForumsRef = ref.child("moduleforums");
  const threadsRef = ref.child("threads");

  const [threads, setThreads] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  
  function createNew() {}


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
            <th>Author</th>
            <th>Upvotes</th>
          </tr>
        </thead>
        <tbody>
          {threads &&
            threads.map((t) => {
              console.log(threads);
              return (
                <tr>
                  <td>{t.title}</td>
                  <td>{t.author.displayName}</td>
                  <td>{t.upvotes}</td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryMain;
