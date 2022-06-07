import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";

import { HStack, Icon, IconButton, Tooltip } from "@chakra-ui/react";
import { AiFillLike, AiOutlineLike } from "react-icons/ai";

function Votes(props) {
  const { currUser } = useAuth();
  const { contentRef, disabled } = props;

  const [voteCount, setVoteCount] = useState();
  const [hasUpvoted, setHasUpvoted] = useState();

  useEffect(() => {
    contentRef.on("value", async (snapshot) => {
      const content = await snapshot.val();
      if (content.voters && content.voters[currUser.uid]) {
        setHasUpvoted(true);
      } else {
        setHasUpvoted(false);
      }

      setVoteCount(content.voteCount);
    });
    return () => {
      contentRef.off();
    };
  }, []);

  function handleClick() {
    setHasUpvoted(!hasUpvoted);
    contentRef.transaction((content) => {
      if (content) {
        if (content.voters && content.voters[currUser.uid]) {
          content.voteCount--;
          content.voters[currUser.uid] = null;
        } else {
          content.voteCount++;
          if (!content.voters) {
            content.voters = {};
          }
          content.voters[currUser.uid] = true;
        }
      }
      return content;
    });
  }

  return hasUpvoted == undefined ? (
    <div></div>
  ) : (
    <HStack align="center">
      <Tooltip label={hasUpvoted ? "Remove like" : "Like"}>
        <span>
          <Icon
            cursor="pointer"
            size="xs"
            as={hasUpvoted ? AiFillLike : AiOutlineLike}
            onClick={!disabled ? handleClick : null}
            bg="F7F7F7"
            disabled={disabled}
          />
        </span>
      </Tooltip>
      <div>{voteCount}</div>
    </HStack>
  );
}

export default Votes;
