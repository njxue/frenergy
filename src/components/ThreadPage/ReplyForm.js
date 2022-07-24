import {
  FormControl,
  FormLabel,
  Textarea,
  Button,
  ButtonGroup,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
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
  const bodyRef = useRef();
  const [invalidReply, setInvalidReply] = useState(false);
  const { currUser } = useAuth();
  const notifRef = ref.child(`notifications/${author}`);
  const timeNow = useTime();

  function handleSubmit(e) {
    e.preventDefault();
    setInvalidReply(false);

    const reply = bodyRef.current.value.trim();

    if (reply.length == 0) {
      setInvalidReply(true);
      return;
    }

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
    bodyRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit}>
      <FormControl isRequired isInvalid={invalidReply}>
        <FormLabel data-testid="label">{`Replying to ${username}: `}</FormLabel>
        <Textarea
          type="text"
          placeholder="Reply"
          ref={bodyRef}
          whiteSpace="pre-wrap"
        />
        <FormErrorMessage>
          Reply must contain at least 1 non-whitespace character
        </FormErrorMessage>
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
