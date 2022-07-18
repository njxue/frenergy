import { useProfile } from "../../utils/helper";
import { Avatar, Box, HStack, Text } from "@chakra-ui/react";
import MajorBadge from "../ProfilePage/MajorBadge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import UserAvatar from "../layout/UserAvatar";

function AuthorDetails(props) {
  const { author, createdAt } = props;
  const { username, major } = useProfile(author);

  const navigate = useNavigate();
  const { currUser } = useAuth();

  function handleClick() {
    if (currUser.uid == author) {
      navigate("/profile");
    } else {
      navigate(`/users/${username}`);
    }
  }
  return (
    <>
      <UserAvatar size="md" uid={author} />
      <Box>
        <HStack>
          <Text cursor="pointer" onClick={handleClick} data-testId="author">
            <strong>{username}</strong>
          </Text>
          <MajorBadge size="9px" major={major} />
        </HStack>
        <Text fontSize="s" data-testid="createdAt">
          {createdAt}
        </Text>
      </Box>
    </>
  );
}

export default AuthorDetails;
