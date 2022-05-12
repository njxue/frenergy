import { Card } from "react-bootstrap";
import Votes from "./Votes";

function Post(props) {
  const post = props.post;
  const upvotes = post.upvotes;
  const downvotes = post.downvotes;
  const netVoteCount = upvotes - downvotes;

  return (
    <div>
      <Card>
        <Card.Header>
          <div>{post.author.displayName}</div>
          <div>{post.createdAt}</div>
        </Card.Header>
        <Card.Body>
          <Card.Title>{post.title}</Card.Title>
          <Card.Text>{post.body}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default Post;
