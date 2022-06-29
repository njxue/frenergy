import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import ThreadItem from "./ThreadItem";

function ThreadsList(props) {
  const { moduleCode, category } = props;
  const postsIdsRef = ref.child(`postsByForums/${moduleCode}/${category}`);
  const [postIds, setPostIds] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    postsIdsRef.on("value", async (snapshot) => {
      const tmp = [];
      if (await snapshot.val()) {
        const data = snapshot.val();
        for (const k in data) {
          tmp.push(k);
        }
        tmp.reverse();
      }
      setPostIds(tmp);
    });
    setIsLoading(false);
  }, [category]);

  return isLoading || postIds == undefined ? (
    <Loader />
  ) : (
    <VStack align="stretch">
      {postIds.map((postId) => (
        <ThreadItem postId={postId} />
      ))}
    </VStack>
  );
}

export default ThreadsList;
