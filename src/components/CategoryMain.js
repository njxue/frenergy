import { Button, Table, Nav } from "react-bootstrap";
import { THREADS } from "../utils/tmpapi";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate } from "react-router-dom";
import { ref } from "../utils/firebase";

function CategoryMain(props) {
  const navigate = useNavigate();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [threads, setThreads] = useState([]);

  const threadsInCategoryRef = ref
    .child("moduleforums")
    .child(props.mod)
    .child(props.cat)
    .child("threads");

  function createNew() {
    setModalIsOpen(true);
  }

  async function loadThreads() {
    let listOfThreadKeys = [];
    await threadsInCategoryRef.once("value", (snapshot) => {
      listOfThreadKeys = snapshot.val();
    });
 
    const tmp = [];
    console.log(listOfThreadKeys);  
    for (const key in listOfThreadKeys) {
      await ref
        .child("threads")
        .child(listOfThreadKeys[key])
        .once("value", (snapshot) => {
          const threadObject = snapshot.val();
          tmp.push(threadObject);
          console.log(tmp);
        });
    }
    setThreads(tmp);
  }

  useEffect(() => {loadThreads()}, []); 

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
          {threads &&
            threads.map((t) => {
              return (
                <tr>
                  <td>{t.title}</td>
                  <td>{t.author}</td>
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
