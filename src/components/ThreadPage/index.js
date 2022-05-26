import { useParams } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import Comments from "./Comments";
import Post from "./Post";
import NavBack from "../layout/NavBack";
import { ref } from "../../config/firebase";
import CommentForm from "./CommentForm";

function Thread() {
  const { moduleCode, category, postId } = useParams();
  const postRef = ref
    .child("posts")
    .child(moduleCode + category)
    .child(postId).child("post");

  const routeHistory = [
    {
      route: "/",
      text: "Dashboard",
    },
    {
      route: `/${moduleCode}`,
      text: `${moduleCode}`,
    },
    {
      route: `/${moduleCode}/${category}`,
      text: `${category}`,
    },
  ];
  return (
    <div>
      <NavBack routeHistory={routeHistory} />
      <Post postRef={postRef} postId={postId}/>
      <Divider orientation="horizontal" />
      <Comments postId={postId}/>
      <CommentForm moduleCode={moduleCode} category={category} postId={postId}/>
    </div>
  );
}

export default Thread;
