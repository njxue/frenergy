import { Card } from "react-bootstrap";
import Votes from "./Votes";

function Post(props) {
  const post = props.post;
  return (
    <div>
      <Card>
        <Card.Header
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <div>
            <div style={{fontSize: "200%"}}>{post.author.displayName}</div>
            <div>{post.createdAt}</div>
          </div>
          <div>
            <Votes post={props.post}/>
          </div>
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
