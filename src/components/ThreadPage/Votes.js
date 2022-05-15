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
  const [buttonType, setButtonType] = useState("success");
  const [buttonText, setButtonText] = useState("upvote");

  const hasMounted = useRef(false);

  const upvotesRef = ref
    .child("upvotes")
    .child(props.threadId)
    .child(currUser.uid);

  //on mount
  useEffect(() => {
    upvotesRef.on("value", async (snapshot) => {
      const hasUpvoted = await snapshot.val();
      if (!snapshot.exists() || !hasUpvoted) {
        setUserHasUpvoted(false);
      }
      setIsLoading(false);
    });
  }, []);

  //upvote listener: change button type and text
  useEffect(() => {
    setButtonText(!userHasUpvoted ? "Downvote" : "Upvote");
    setButtonType(!userHasUpvoted ? "danger" : "success");
    let newVoteCount = 0;
    if (!hasMounted.current) {
      newVoteCount = userHasUpvoted ? voteCount - 1 : voteCount + 1;
    } else {
      newVoteCount = voteCount;
    }
    setVoteCount(newVoteCount);
    updateVotes(newVoteCount);
  }, [userHasUpvoted]);

  function updateVotes(newVoteCount) {
    const updateObject = {
      [`/posts/${module}/${category}/${threadId}/votes`]: newVoteCount,
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
        onClick={() => setUserHasUpvoted(!userHasUpvoted)}
      >
        {buttonText}
      </Button>
      <div>{voteCount}</div>
    </ButtonGroup>
  );
}

export default Votes;
