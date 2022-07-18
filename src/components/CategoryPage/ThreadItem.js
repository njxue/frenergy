import {
  Text,
  HStack,
  VStack,
  Heading,
  Flex,
  Skeleton,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";
import SkeletonLoader from "../layout/SkeletonLoader";
import parse from "html-react-parser";
import UserAvatar from "../layout/UserAvatar";
import Votes from "../ThreadPage/Votes";
import ThreadDetails from "./ThreadDetails";

function ThreadItem(props) {
  const { postId } = props;
  const navigate = useNavigate();
  const postRef = ref.child(`posts/${postId}`);
  const [post, setPost] = useState();

  useEffect(() => {
    postRef.on("value", (snapshot) => {
      setPost(snapshot.val());
    });
  }, [postId]);

  return (
    <Skeleton isLoaded={post != undefined}>
      {post ? <ThreadDetails post={post} /> : <Box h="120px"></Box>}
    </Skeleton>
  );
}

export default ThreadItem;
