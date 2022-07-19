import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  ButtonGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import { ref } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { useTime } from "../../utils/helper";
import { useProfile } from "../../utils/helper";

function ReplyForm(props) {
  const { comment, setIsReplying } = props;
  const { postId, commentId, author, body, location } = comment;
  const { moduleCode, category } = location;
  const { username } = useProfile(author);

  const repliesRef = ref.child(`replies/${commentId}`);
  const [reply, setReply] = useState("");
  const { currUser } = useAuth();
  const notifRef = ref.child(`notifications/${author}`);
  const timeNow = useTime();

  function handleSubmit() {
    const replyId = repliesRef.push().key;

    const replyObj = {
      body: reply,
      author: currUser.uid,
      createdAt: timeNow,
      replyId: replyId,
      deleted: false,

      postId: postId,
      commentId: commentId,
    };

    const notifTitle = `${currUser.displayName} replied to your comment ${body}`;
    const notifBody = reply;

    if (currUser.uid != author) {
      notifRef.push({
        title: notifTitle,
        body: notifBody,
        link: `/${moduleCode}/${category}/${postId}`,
        type: "forum",
      });
    }

    repliesRef.child(replyId).set(replyObj);
    ref.child(`votes/${replyId}/voteCount`).set(0);
    setIsReplying(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl>
        <FormLabel data-testid="label">{`Replying to ${username}: `}</FormLabel>
        <Textarea
          type="text"
          placeholder="Reply"
          required
          value={reply}
          onChange={(e) => {
            setReply(e.target.value);
          }}
        ></Textarea>
        <ButtonGroup marginTop={2}>
          <Button
            type="submit"
            colorScheme="green"
            data-testid="submitReplyBtn"
          >
            Submit
          </Button>
          <Button onClick={() => setIsReplying(false)} colorScheme="red">
            Cancel
          </Button>
        </ButtonGroup>
      </FormControl>
    </form>
  );
}
export default ReplyForm;
