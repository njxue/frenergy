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
        <Card.Header style={{display: "flex", justifyContent: "space-between"}}>
          <div>
            <div style={{fontSize: "200%"}}>{post.author.displayName}</div>
            <div>{post.createdAt}</div>
          </div>
          <Votes voteCount={netVoteCount} location={props.location}/>
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
