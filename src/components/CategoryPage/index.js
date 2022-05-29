import { Button, Heading, Flex, Spacer } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { useNavigate, useParams } from "react-router-dom";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import NavBack from "../layout/NavBack";
import ThreadsTable from "./ThreadsTable";

function CategoryMain() {
 

  const { moduleCode, category } = useParams();
  const postsIdsRef = ref.child(`postsByForums/${moduleCode}/${category}`);
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
  const [postIds, setPostIds] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  function loadPosts() {
    postsIdsRef.orderByKey().on("value", async (snapshot) => {
      if (snapshot.val()) {
        const tmp = Object.keys(snapshot.val());
        tmp.reverse();
        setPostIds(tmp);
      }
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
        <ThreadsTable postIds={postIds} />
      </div>
    </>
  );
}

export default CategoryMain;
