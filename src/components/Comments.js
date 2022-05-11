import { Card } from "react-bootstrap";

function Comments(props) {
  const comments = props.comments;
  if (!comments) {
      return <div></div>
  }
  return (
    <div>
      {comments.map((comment) => {
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
      })}
    </div>
  );
}

export default Comments;
