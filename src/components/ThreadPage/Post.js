import { Card, Alert } from "react-bootstrap";
import Votes from "./Votes";
import { ref } from "../../config/firebase";
import { useEffect, useState } from "react";
import Loader from "../layout/Loader";
import EditPost from "./EditPost";
import { EditIcon } from "@chakra-ui/icons";
import { useAuth } from "../../contexts/AuthContext";
 
function Post(props) {
  const { currUser } = useAuth();
  const { threadId, moduleCode, category } = props;

  const threadsRef = ref.child("threads").child(threadId).child("post");

  const [post, setPost] = useState(null);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    setError("");
    try {
      threadsRef.on("value", async (snapshot) => {
        const post = await snapshot.val();
        setPost(post);
      });
    } catch {
      setError("Unable to load post. Please try again");
    }
    setIsLoading(false);
  }, [threadId]);

  useEffect(() => {
    if (post) {
      if (currUser.uid == post.author.uid) {
        setCanEdit(true);
        console.log(canEdit);
      }
    }
  }, [post]);

  function handleEdit() {
    setEditMode(true);
  }
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
              <EditIcon hidden={!canEdit} onClick={() => handleEdit(true)} />
              <Votes
                threadId={threadId}
                initialCount={post.votes}
                module={post.module}
                category={post.category}
              />
            </div>
          </Card.Header>
          {editMode ? (
            <EditPost
              initTitle={post.title}
              initBody={post.body}
              setEditMode={setEditMode}
              paths={[
                `threads/${threadId}/post`,
                `posts/${moduleCode + category}/${threadId}`,
              ]}
            />
          ) : (
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.body}</Card.Text>
            </Card.Body>
          )}
        </Card>
      )}
    </>
  );
}

export default Post;
