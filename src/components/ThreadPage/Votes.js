import { increment } from "firebase/database";
import { ButtonGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref } from "../../utils/firebase";

function Votes(props) {
  const post = props.post;
  const { module, category, threadId } = post;
  const { currUser } = useAuth();
  const [voteCount, setVoteCount] = useState(post.votes);
  const [userHasUpvoted, setUserHasUpvoted] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  const upvotesRef = ref
    .child("upvotes")
    .child(props.post.threadId)
    .child(currUser.uid);

  useEffect(() => {
    upvotesRef.once("value", async (snapshot) => {
      const hasUpvoted = await snapshot.val();
      if (!snapshot.exists() || !hasUpvoted) {
        setUserHasUpvoted(false);
      }
      setIsLoading(false);
    });
  }, []);

  function updateVotes() {
    setUserHasUpvoted(!userHasUpvoted);
    let n = userHasUpvoted ? -1 : 1;
    setVoteCount(voteCount + n);

    const updateObject = {
      [`/posts/${module}/${category}/${threadId}/votes`]: increment(n),
      [`/posts/${module + category}/${threadId}/votes`]: increment(n),
      [`/postsByUsers/${currUser.uid}/${threadId}/votes`]: increment(n),
      [`/threads/${threadId}/post/votes`]: increment(n),
      [`/upvotes/${threadId}/${currUser.uid}`]: !userHasUpvoted,
    };

    ref.update(updateObject).then((error) => {
      if (error) {
        setUserHasUpvoted(!userHasUpvoted);
        setVoteCount(voteCount - n);
      }
    });
  }

  return (
    <ButtonGroup vertical size="sm" hidden={isLoading}>
      <Button
        variant={userHasUpvoted ? "danger" : "success"}
        onClick={() => updateVotes()}
      >
        {userHasUpvoted ? "Downvote" : "Upvote"}
      </Button>
      <div>{voteCount}</div>
    </ButtonGroup>
  );
}

export default Votes;
