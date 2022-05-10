import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { Card, Image, Form, Button } from "react-bootstrap";
import Padder from "./layout/Padder";
import classes from "../static/Thread.module.css";
import { useAuth } from "../contexts/AuthContext";

function Thread(props) {
  const db = "https://study-e0762-default-rtdb.firebaseio.com";
  const { threadId } = useParams();
  const path =
    db + "/" + props.mod + "/" + props.cat + "/" + threadId + ".json";
  const commentRef = useRef();

  function getThreadDetails() {
    fetch(path)
      .then((response) => response.json())
      .then((data) => {
        setThread(data);
        console.log(data);
      });
  }

  const { currUser } = useAuth();

  function handleSubmitComment(e) {
    e.preventDefault();
    const newComment = {
      author: currUser,
      content: commentRef.current.value,
    };
    thread.comments.push(newComment);
    console.log(thread);
    try {
      fetch(path, {
        method: "PUT",
        body: JSON.stringify(thread),
      }).then(() => console.log("posted"));
    } catch {
      console.log("error");
    }
  }

  const [thread, setThread] = useState(null);

  useEffect(getThreadDetails, []);

  return (
    <Padder>
      {thread && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <div>
              <img src={require("../static/placeholder-img.png")} />
              <div>{thread.author}</div>
            </div>
            <Card
              style={{ width: "80%", backgroundColor: "rgb(230, 250, 235" }}
            >
              <div>
                <h1>{thread.title}</h1>
                <p>{thread.body}</p>
              </div>
            </Card>
          </div>
          <div>
            {thread.comments.map((comment) => {
              <div>
                <h3>comment.author.displayName</h3>
                <p>comment.content</p>
              </div>;
            })}
          </div>
          <Form className={classes.commentBox} onSubmit={handleSubmitComment}>
            <div>{currUser && currUser.displayName}</div>
            <Form.Group>
              <Form.Control
                as="textarea"
                placeholder="Insert comment"
                ref={commentRef}
              ></Form.Control>
            </Form.Group>
            <Button className={classes.btn} type="submit" variant="primary">
              Submit
            </Button>
          </Form>
        </div>
      )}
    </Padder>
  );
}

export default Thread;
