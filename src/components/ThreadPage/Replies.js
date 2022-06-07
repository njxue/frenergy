import { VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";
import Reply from "./Reply";

function Replies(props) {
  const { commentId } = props;
  const repliesRef = ref.child(`replies/${commentId}`);
  const [replies, setReplies] = useState();

  useEffect(() => {
    repliesRef.on("value", (snapshot) => {
      const tmp = [];
      const data = snapshot.val();
      for (const k in data) {
        tmp.push(data[k]);
      }
      setReplies(tmp);
    });

    return () => repliesRef.off();
  }, [commentId]);

  return replies == undefined ? (
    <Loader />
  ) : (
    <VStack align="end">
      {replies.map((reply) => (
        <Reply reply={reply} key={reply.replyId} />
      ))}
    </VStack>
  );
}

export default Replies;
