import { useProfile } from "../../utils/helper";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import MajorBadge from "../ProfilePage/MajorBadge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function AuthorDetails(props) {
  const { author, createdAt } = props;
  const { username, photoURL, major } = useProfile(author);

  const navigate = useNavigate();
  const { currUser } = useAuth();

  function handleClick() {
    if (currUser.uid == author) {
      navigate("/profile");
    } else {
      navigate(`/users/${author}`);
    }
  }
  return (
    <>
      <Avatar src={photoURL} size="md" />
      <Box>
        <HStack>
          <Text cursor="pointer" onClick={handleClick}>
            <strong>{username}</strong>
          </Text>
          <MajorBadge size="9px" major={major} />
        </HStack>
        <Text fontSize="s">{createdAt}</Text>
      </Box>
    </>
  );
}

export default AuthorDetails;
