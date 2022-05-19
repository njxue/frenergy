import { increment } from "firebase/database";
import { ButtonGroup, Button } from "react-bootstrap";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref } from "../../utils/firebase";

function Votes(props) {
  //console.log("votes re-render");
  const { currUser } = useAuth();
  const { threadId, initialCount, module, category } = props;

  const [voteCount, setVoteCount] = useState(initialCount);
  const [userHasUpvoted, setUserHasUpvoted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buttonType, setButtonType] = useState("");
  const [buttonText, setButtonText] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  const upvotesRef = ref.child("upvotes").child(threadId).child(currUser.uid);

  const votesRef = ref
    .child("posts")
    .child(module + category)
    .child(threadId)
    .child("votes");

  //listener that updates the votes and buttons. Only start listening after initial mount
  useEffect(() => {
    console.log("userHasUpvoted: " + userHasUpvoted);
    if (isMounted) {
      setButtonText(userHasUpvoted ? "Downvote" : "Upvote");
      setButtonType(userHasUpvoted ? "danger" : "success");
      const newVoteCount = userHasUpvoted ? voteCount + 1 : voteCount - 1;
      setVoteCount(newVoteCount);
      console.log("here: " + newVoteCount);
      updateVotes(newVoteCount);
    }
  }, [userHasUpvoted]);

  //on mount, set the initial button type and text using userHasUpvotes status
  useEffect(() => {
    upvotesRef.on("value", async (snapshot) => {
      const hasUpvoted = await snapshot.val();
      if (!snapshot.exists() || !hasUpvoted) {
        setUserHasUpvoted(false);
        setButtonText("Upvote");
        setButtonType("success");
      } else {
        setUserHasUpvoted(true);
        setButtonText("Downvote");
        setButtonType("danger");
      }
      setIsLoading(false);
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

  function updateVotes(newVoteCount) {
    const updateObject = {
      [`/posts/${module + category}/${threadId}/votes`]: newVoteCount,
      [`/postsByUsers/${currUser.uid}/${threadId}/votes`]: newVoteCount,
      [`/threads/${threadId}/post/votes`]: newVoteCount,
      [`/upvotes/${threadId}/${currUser.uid}`]: userHasUpvoted,
    };
    ref.update(updateObject);
  }

  return (
    <ButtonGroup vertical size="sm" hidden={isLoading}>
      <Button
        variant={buttonType}
        onClick={() => {
          setIsMounted(true);
          setUserHasUpvoted(!userHasUpvoted);
        }}
      >
        {buttonText}
      </Button>
      <div>{voteCount}</div>
    </ButtonGroup>
  );
}

export default Votes;
