import { useParams } from "react-router-dom";
import Comments from "./Comments";
import Post from "./Post";
import { ref } from "../../config/firebase";
import CommentForm from "./CommentForm";
import { useState, useEffect } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";

function Thread(props) {
  const { moduleCode, postId } = useParams();

  const category = props;
  const [post, setPost] = useState();
  const postRef = ref.child("posts").child(postId);

  useEffect(() => {
    postRef.on("value", async (snapshot) => {
      const post = await snapshot.val();

      setPost(post);
    });
  }, [postId]);

  return post == undefined ? (
    <SkeletonLoader />
  ) : (
    <div>
      <Post post={post} />

      <Comments postId={postId} />
      <CommentForm moduleCode={moduleCode} category={category} post={post} />
    </div>
  );
}

export default Thread;
