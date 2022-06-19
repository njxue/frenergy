import { Button, Heading, Flex, Spacer, useDisclosure } from "@chakra-ui/react";
import { SmallAddIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import CreateNewModal from "./CreateNewModal";
import {
  Navigate,
  Route,
  Routes,
  useNavigate,
  useParams,
  Outlet,
} from "react-router-dom";
import { ref } from "../../config/firebase";
import BreadCrumb from "../layout/BreadCrumb";
import ThreadsTable from "./ThreadsTable";
import { CATEGORIES } from "../../api/customapi";
import Loader from "../layout/Loader";
import DoesNotExist from "../layout/DoesNotExist";
import Thread from "../ThreadPage";

function CategoryMain(props) {
  const { category } = props;

  const { moduleCode } = useParams();
  const navigate = useNavigate();

  const postsIdsRef = ref.child(`postsByForums/${moduleCode}/${category}`);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [postIds, setPostIds] = useState([]);

  function loadPosts() {
    postsIdsRef.orderByKey().on("value", async (snapshot) => {
      const tmp = [];
      if (snapshot.val()) {
        const data = snapshot.val();
        for (const k in data) {
          tmp.push(k);
        }
        tmp.reverse();
      }
      setPostIds(tmp);
    });
  }

  useEffect(loadPosts, [category]);

  return !CATEGORIES.includes(category) ? (
    <DoesNotExist />
  ) : (
    <>
      <Outlet></Outlet>
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
        <ThreadsTable
          postIds={postIds}
          moduleCode={moduleCode}
          category={category}
        />
      </div>
    </>
  );
}

export default CategoryMain;
