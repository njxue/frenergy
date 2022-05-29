import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
 
import { HStack, IconButton } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

function Votes(props) {
  const { currUser } = useAuth();
  const { postRef } = props;

  const [voteCount, setVoteCount] = useState();
  const [hasUpvoted, setHasUpvoted] = useState();

  useEffect(() => {
    postRef.on("value", async (snapshot) => {
      const post = await snapshot.val();
      if (post.voters && post.voters[currUser.uid]) {
        setHasUpvoted(true);
      } else {
        setHasUpvoted(false);
      }

      setVoteCount(post.voteCount);
    });
    return () => {
      postRef.off();
    };
  }, []);

  function handleClick() {
    setHasUpvoted(!hasUpvoted);
    postRef.transaction((post) => {
      if (post) {
        if (post.voters && post.voters[currUser.uid]) {
          post.voteCount--;
          post.voters[currUser.uid] = null;
        } else {
          post.voteCount++;
          if (!post.voters) {
            post.voters = {};
          }
          post.voters[currUser.uid] = true;
        }
      }
      return post;
    });
  }

  return hasUpvoted == undefined ? (
    <div></div>
  ) : (
    <HStack>
      <IconButton
        cursor="pointer"
        size="xs"
        as={hasUpvoted ? AiFillLike : AiOutlineLike}
        onClick={handleClick}
        bg="F7F7F7"
      />
      <div>{voteCount}</div>
    </HStack>
  );
}

export default Votes;
