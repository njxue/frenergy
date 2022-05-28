import { Tr, Td } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../../utils/helper";

function ThreadRow(props) {
  const { post } = props;
  const navigate = useNavigate();
  const { postId, title, author, createdAt, voteCount } = post;

  const { username } = useProfile(author);
  return (
    <Tr onClick={() => navigate(postId)}>
      <Td noOfLines={0}>{title}</Td>
      <Td>{username}</Td>
      <Td noOfLines={0}>{createdAt}</Td>
      <Td>{voteCount}</Td>
    </Tr>
  );
}

export default ThreadRow;
