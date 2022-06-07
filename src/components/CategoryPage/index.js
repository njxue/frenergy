import { Button, Heading, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { ref } from "../../config/firebase";
import BreadCrumb from "../layout/BreadCrumb";
import ThreadsTable from "./ThreadsTable";
import { CATEGORIES } from "../../api/customapi";
import Loader from "../layout/Loader";
import DoesNotExist from "../layout/DoesNotExist";

function CategoryMain() {
  const { moduleCode, category } = useParams();
  const navigate = useNavigate();
  
  const postsIdsRef = ref.child(`postsByForums/${moduleCode}/${category}`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const routeHistory = [
    {
      route: "/",
      text: "Dashboard",
    },
    {
      route: `/${moduleCode}`,
      text: `${moduleCode}`,
    },
    {
      route: `/${moduleCode}/${category}`,
      text: `${category}`,
    },
  ];

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

  return !CATEGORIES.includes(category) ? (
    <DoesNotExist />
  ) : (
    <>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <BreadCrumb routeHistory={routeHistory} />
      </div>
      <div>
        <CreateNewModal
          category={category}
          moduleCode={moduleCode}
          isOpen={isOpen}
          onClose={onClose}
        />
        <Flex direction="row">
          <Heading paddingLeft="3">{category}</Heading>
          <Spacer />
          <Button
            leftIcon={<SmallAddIcon />}
            onClick={onOpen}
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
