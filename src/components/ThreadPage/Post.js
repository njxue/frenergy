import { Card, Alert } from "react-bootstrap";
import Votes from "./Votes";
import { ref } from "../../utils/firebase";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";

function Post(props) {
  console.log("post re-render");
  const { threadId } = props;

  const postRef = ref.child("threads").child(threadId).child("post");
  const [post, setPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    
    setError("");
    try {
      postRef.once("value", async (snapshot) => {
        setPost(await snapshot.val());
      });
    } catch {
      setError("Unable to load post. Please try again");
    }
    setIsLoading(false);
  }, [threadId]);

  return (
    <>
      <Loader hidden={!isLoading} />
      {error && <Alert variant="danger">{error}</Alert>}
      {post && (
        <Card>
          <Card.Header
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <div style={{ fontSize: "200%" }}>{post.author.displayName}</div>
              <div>{post.createdAt}</div>
            </div>
            <div>
              <Votes
                threadId={threadId}
                initialCount={post.votes}
                module={post.module}
                category={post.category}
              />
            </div>
          </Card.Header>
          <Card.Body>
            <Card.Title>{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
}

export default Post;
