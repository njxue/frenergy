import { increment } from "firebase/database";
import { ButtonGroup, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { ref } from "../../utils/firebase";

function Votes(props) {
  const post = props.post;
  const { currUser } = useAuth();
  const [voteCount, setVoteCount] = useState(props.post.votes);
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

    const updateObject = {};
    let n = 1;
    if (userHasUpvoted) {
      n = -1;
    }
    setVoteCount(voteCount + n);
    updateObject[
      "/posts/" + post.module + post.category + "/" + post.threadId + "/votes"
    ] = increment(n);
    updateObject[
      "/postsByUsers/" + currUser.uid + "/" + post.threadId + "/votes"
    ] = increment(n);
    updateObject["/threads/" + post.threadId + "/post/" + "votes"] =
      increment(n);

    updateObject["/upvotes/" + props.post.threadId + "/" + currUser.uid] =
      !userHasUpvoted;

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
