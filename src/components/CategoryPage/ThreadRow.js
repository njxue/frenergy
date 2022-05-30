import { Tr, Td } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import Loader from "../layout/Loader";

function ThreadRow(props) {
  const { id } = props;
  const navigate = useNavigate();
  const postRef = ref.child("/posts").child(id);

  const [post, setPost] = useState();
  const [username, setUsername] = useState();

  useEffect(() => {
    postRef.on("value", async (snapshot) => {
      setPost(await snapshot.val());
    });
  }, [id]);

  useEffect(() => {
    if (post != undefined) {
      ref
        .child(`users/${post.author}/profile/username`)
        .on("value", (snapshot) => {
          setUsername(snapshot.val());
        });
    }
  }, [post]);

  return post == undefined || username == undefined ? (
    <Loader />
  ) : (
    <Tr onClick={() => navigate(post.postId)}>
      <Td noOfLines={0}>{post.title}</Td>
      <Td>{username}</Td>
      <Td noOfLines={0}>{post.createdAt}</Td>
      <Td>{post.voteCount}</Td>
    </Tr>
  );
}

export default ThreadRow;
