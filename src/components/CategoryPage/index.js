import { Button, Table, Nav } from "react-bootstrap";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate, useParams } from "react-router-dom";
import { ref } from "../../utils/firebase";
import Loader from "../layout/Loader";
import NavBack from "../layout/NavBack";

function CategoryMain() {
  const navigate = useNavigate();

  const { moduleCode, category } = useParams();
  const postsRef = ref.child("posts").child(moduleCode + category);
  const routeHistory = [
    {
      route: "/",
      text: "Dashboard",
    },
    {
      route: `/${moduleCode}`,
      text: `${moduleCode}`,
    },
  ];
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function loadPosts() {
    postsRef.orderByChild("timestamp").on("value", async (snapshot) => {
      const tmp = [];
      snapshot.forEach((child) => {
        tmp.push(child.val());
      });

      setPosts(tmp);
      console.log(tmp);
      setIsLoading(false);
    });
  }

  useEffect(loadPosts, []);

  return (
    <>
      <Loader hidden={!isLoading} />
      <NavBack routeHistory={routeHistory} />
      <div>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <section>
            <h1 onClick={() => navigate("/" + moduleCode)}>
              {moduleCode + ">" + category}
            </h1>
          </section>
          <section>
            <Button onClick={() => setModalIsOpen(true)}>
              Create new thread
            </Button>
          </section>
        </div>
        <CreateNewModal
          show={modalIsOpen}
          setShow={setModalIsOpen}
          category={category}
          moduleCode={moduleCode}
          loadPosts={loadPosts}
        />
        <Table striped hover>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Created on</th>
              <th>Votes</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((p) => {
              return (
                <tr onClick={() => navigate(p.threadId)}>
                  <td>{p.title}</td>
                  <td>{p.author.displayName}</td>
                  <td>{p.createdAt}</td>
                  <td>{p.votes}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default CategoryMain;
