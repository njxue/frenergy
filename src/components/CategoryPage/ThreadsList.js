import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import ThreadItem from "./ThreadItem";
import EmptyPrompt from "../Dashboard/EmptyPrompt";
import Pagination from "../layout/Pagination";

function ThreadsList(props) {
  const { moduleCode, category, filterOption, sortOption } = props;
  const postsIdsRef = ref.child(`postsByForums/${moduleCode}/${category}`);
  const [postIds, setPostIds] = useState();

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 7;

  useEffect(() => {
    postsIdsRef
      .orderByChild("timestamp")
      .startAt(filterOption)
      .on("value", async (snapshot) => {
        const tmp = [];
        if (await snapshot.val()) {
          const data = snapshot.val();
          for (const k in data) {
            tmp.push(k);
          }
          if (sortOption == 0) {
            tmp.reverse();
          }
        }
        setPostIds(tmp);
      });
  }, [category, filterOption, sortOption]);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;

  return postIds == undefined ? (
    <Loader />
  ) : postIds[0] ? (
    <VStack align="end" w="100%">
      <VStack align="stretch" w="100%">
        {postIds.slice(indexOfFirstPost, indexOfLastPost).map((postId) => (
          <ThreadItem postId={postId} />
        ))}
      </VStack>
      <Pagination
        numPerPage={postsPerPage}
        totalNum={postIds.length}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    </VStack>
  ) : (
    <EmptyPrompt group="discussions yet" message="Start one now!" />
  );
}

export default ThreadsList;
