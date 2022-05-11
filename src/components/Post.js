import { Card, Button, ButtonGroup } from "react-bootstrap";

function Post(props) {
  const post = props.post;
  return (
    <div>
      <Card>
        <Card.Header>
          <div>{post.author.displayName}</div>
          <div>{post.createdAt}</div?
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
