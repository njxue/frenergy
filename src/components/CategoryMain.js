import { Button, Table, Nav } from "react-bootstrap";
import { THREADS } from "../utils/tmpapi";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate } from 'react-router-dom'
import { ref } from "../utils/firebase";
import Loader from "./layout/Loader";

function CategoryMain(props) {
  const navigate = useNavigate();
  const postsRef = ref.child("posts").child(props.mod+props.cat);

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 
 
   
  function createNew() {
    setModalIsOpen(true);
  }

  function loadPosts() {  
    postsRef.once("value", async snapshot => {
      const tmp = [];
      const listOfPosts = await snapshot.val();
      console.log(listOfPosts)
      for (const key in listOfPosts) {
        tmp.push(listOfPosts[key]);
      }
      setPosts(tmp);
      setIsLoading(false);
    })
  }

  useEffect(loadPosts, []);
  if (isLoading) {
    return <Loader />
  }
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
          {posts.map((p) => {
            return (
              <tr onClick={() => navigate(p.threadId)}>
                <td>{p.title}</td>
                <td>{p.author.displayName}</td>
                <td>{p.upvotes}</td>
                <td>{p.downvotes}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CategoryMain;
