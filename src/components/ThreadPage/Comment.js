import { Card } from "react-bootstrap";

function Comment(props) {
  const { comment } = props;
  return (
    <Card>
      <Card.Header>
        <div>{comment.author.displayName}</div>
        <div>{comment.createdAt}</div>
      </Card.Header>
      <Card.Body>
        <Card.Text>{comment.body}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Comment;
