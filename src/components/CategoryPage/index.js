import {
  Button,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  Heading,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate, useParams } from "react-router-dom";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import NavBack from "../layout/NavBack";
import ThreadRow from "./ThreadRow";
import ThreadsTable from "./ThreadsTable";

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
    postsRef.orderByKey().on("value", async (snapshot) => {
      const tmp = [];
      snapshot.forEach((child) => {
        tmp.push(child.val());
      });
      tmp.reverse();
      setPosts(tmp);
      setIsLoading(false);
    });
  }

  useEffect(loadPosts, []);

  return (
    <>
      <Loader hidden={!isLoading} />
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <NavBack routeHistory={routeHistory} />
      </div>
      <div>
        <CreateNewModal
          show={modalIsOpen}
          setShow={setModalIsOpen}
          category={category}
          moduleCode={moduleCode}
          loadPosts={loadPosts}
        />
        <Flex direction="row">
          <Heading paddingLeft="3">{category}</Heading>
          <Spacer />
          <Button
            leftIcon={<SmallAddIcon />}
            onClick={() => setModalIsOpen(true)}
            colorScheme="green"
          >
            Create new thread
          </Button>
        </Flex>
        <ThreadsTable posts={posts} />
      </div>
    </>
  );
}

export default CategoryMain;
