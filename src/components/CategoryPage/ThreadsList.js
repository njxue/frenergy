import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import ThreadItem from "./ThreadItem";
import EmptyPrompt from "../Dashboard/EmptyPrompt";

function ThreadsList(props) {
  const { moduleCode, category, filterOption, sortOption } = props;
  const postsIdsRef = ref.child(`postsByForums/${moduleCode}/${category}`);
  const [postIds, setPostIds] = useState();


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

  return postIds == undefined ? (
    <Loader />
  ) : postIds[0] ? (
    <VStack align="stretch">
      {postIds.map((postId) => (
        <ThreadItem postId={postId} />
      ))}
    </VStack>
  ) : (
    <EmptyPrompt group="discussions yet" message="Start one now!" />
  );
}

export default ThreadsList;
