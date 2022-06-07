import { useParams } from "react-router-dom";
import { Divider } from "@chakra-ui/react";
import Comments from "./Comments";
import Post from "./Post";
import BreadCrumb from "../layout/BreadCrumb";
import { ref } from "../../config/firebase";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import Loader from "../layout/Loader";

function Thread() {
  const { moduleCode, category, postId } = useParams();
  const [post, setPost] = useState();
  const postRef = ref.child("posts").child(postId);

  useEffect(() => {
    postRef.on("value", async (snapshot) => {
      const post = await snapshot.val();

      setPost(post);
    });
  }, [postId]);

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
  return post == undefined ? (
    <Loader />
  ) : (
    <div>
      <BreadCrumb
        routeHistory={[
          ...routeHistory,
          {
            route: `/${moduleCode}/${category}/${post.postId}`,
            text:
              post.title.length > 20
                ? `${post.title.slice(0, 20)}...`
                : `${post.title}`,
          },
        ]}
      />
      <Post post={post} postRef={postRef} />
      <Divider orientation="horizontal" />
      <Comments postId={postId} />
      <CommentForm moduleCode={moduleCode} category={category} post={post} />
    </div>
  );
}

export default Thread;
