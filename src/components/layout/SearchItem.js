import { Skeleton, Text, Avatar, HStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";

function SearchItem(props) {
  const { username } = props;
  const [photoURL, setPhotoURL] = useState();
  const [exists, setExists] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setExists(false);
    if (username) {
      ref
        .child("usernames")
        .child(username)
        .on("value", async (snapshot) => {
          if (snapshot.exists()) {
            setExists(true);
            const uid = await snapshot.val();
            ref
              .child(`users/${uid}/profile/photoURL`)
              .on("value", async (snapshot) => {
                setPhotoURL(await snapshot.val());
              });
          }
        });
    }
  }, [username]);

  return (
    exists && (
      <HStack
        paddingTop={2}
        onClick={() => {
          navigate(`/users/${username}`);
          onclose();
        }}
      >
        <Avatar src={photoURL} />
        <Text color="black">{username}</Text>;
      </HStack>
    )
  );
}
export default SearchItem;
