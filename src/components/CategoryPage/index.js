import {
  Button,
  Table,
  TableContainer,
  Tr,
  Td,
  Th,
  Thead,
  Tbody,
  ThemeProvider,
  Heading,
  IconButton,
  HStack,
  Flex,
  Text,
  Spacer,
} from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate, useParams } from "react-router-dom";
import { ref } from "../../config/firebase";
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
        <TableContainer maxWidth="100%">
          <Table
            variant="striped"
            colorScheme="gray"
            style={{ "table-layout": "fixed" }}
          >
            <Thead>
              <Tr>
                <Th w="60%" overflowX="hidden" >Title</Th>
                <Th w="15%">Author</Th>
                <Th w="15%">Created on</Th>
                <Th w="10%">Votes</Th>
              </Tr>
            </Thead>
            <Tbody>
              {posts.map((p) => {
                return (
                  <Tr onClick={() => navigate(p.threadId)}>
                    <Td noOfLines={0}>{p.title}</Td>
                    <Td>{p.author.displayName}</Td>
                    <Td>{p.createdAt}</Td>
                    <Td>{p.votes}</Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}

export default CategoryMain;
