import { Button, Table, Nav } from "react-bootstrap";
import { THREADS } from "../utils/tmpapi";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate } from 'react-router-dom'
import { ref } from "../utils/firebase";

function CategoryMain(props) {
  const navigate = useNavigate();
  const threadsInModuleForumsRef = ref.child("moduleforums").child(props.mod).child(props.cat).child("threads");

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [threads, setThreads] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
 
   
  function createNew() {
    setModalIsOpen(true);
  }

  function loadThreads() {  
    threadsInModuleForumsRef.once("value", async snapshot => {
      const tmp = [];
      const listOfThreads = await snapshot.val();
      console.log(listOfThreads)
      for (const key in listOfThreads) {
        tmp.push(listOfThreads[key]);
      }
      setThreads(tmp);
      setIsLoading(false);
    })
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
              <th>Author</th>
              <th>Upvotes</th>
              <th>Downvotes</th>
            </tr>
        </thead>
        <tbody>
          {threads.map((t) => {
            return (
              <tr onClick={() => navigate()}>
                <td>{t.title}</td>
                <td>{t.author.displayName}</td>
                <td>{t.upvotes}</td>
                <td>{t.downvotes}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryMain;
