import { Heading, Box, HStack, Skeleton, Avatar } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ref } from "../../config/firebase";

function LoungeItem(props) {
  const { groupId } = props;
  const groupNameRef = ref.child(`groups/${groupId}/name`);
  const groupPhotoRef = ref.child(`groups/${groupId}/photoURL`);

  const [name, setName] = useState("");
  const [url, setUrl] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    groupNameRef.on("value", (snapshot) => {
      setName(snapshot.val());
    });

    groupPhotoRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        setUrl(snapshot.val());
      } else {
        setUrl("");
      }
    });
  }, [groupId]);

  return (
    <Skeleton isLoaded={name != "" && url != undefined}>
      <Box
        shadow="md"
        padding={3}
        borderWidth="1px"
        cursor="pointer"
        onClick={() => navigate(`/group/${groupId}`)}
        bg="white"
        _hover={{ backgroundColor: "#ECECEC" }}
        maxW="100%"
      >
        <HStack justifyContent="space-between">
          <Heading noOfLines={1} size="sm">
            {name}
          </Heading>
          <Avatar src={url} name={name} />
        </HStack>
      </Box>
    </Skeleton>
  );
}

export default LoungeItem;
