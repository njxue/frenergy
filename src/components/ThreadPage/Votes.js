import { ButtonGroup, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref } from "../../config/firebase";
import { HStack, IconButton } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

function Votes(props) {
  const { currUser } = useAuth();
  const { threadId, initialCount, module, category } = props;

  const [voteCount, setVoteCount] = useState(initialCount);
  const [upvoted, setUpvoted] = useState();
  //const [isMounted, setIsMounted] = useState(false);

  const upvotesRef = ref.child("upvotes").child(threadId).child(currUser.uid);

  const votesRef = ref
    .child("posts")
    .child(module + category)
    .child(threadId)
    .child("votes");

  useEffect(() => {
    upvotesRef.on("value", async (snapshot) => {
      const hasUpvoted = await snapshot.val();
      if (!snapshot.exists() || !hasUpvoted) {
        setUpvoted(false);
      } else {
        setUpvoted(true);
      }
    });

    votesRef.on("value", async (snapshot) => {
      const count = await snapshot.val();
      setVoteCount(count);
    });

    return () => {
      votesRef.off();
      upvotesRef.off();
    };
  }, []);

  function handleClick() {
    const newVoteCount = upvoted ? voteCount - 1 : voteCount + 1;
    const updateObject = {
      [`/posts/${module + category}/${threadId}/votes`]: newVoteCount,
      [`/postsByUsers/${currUser.uid}/${threadId}/votes`]: newVoteCount,
      [`/threads/${threadId}/post/votes`]: newVoteCount,
      [`/upvotes/${threadId}/${currUser.uid}`]: !upvoted,
    };
    ref.update(updateObject).then(() => {
      setVoteCount(newVoteCount);
      setUpvoted(!upvoted);
    });
  }

  return upvoted == undefined ? (
    <div></div>
  ) : (
    <HStack>
      <IconButton
        size="xs"
        as={upvoted ? AiFillLike : AiOutlineLike}
        onClick={handleClick}
      />
      <div>{voteCount}</div>
    </HStack>
  );
}

export default Votes;
