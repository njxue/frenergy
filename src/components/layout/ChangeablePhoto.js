import {
  Avatar,
  HStack,
  Text,
  Box,
  Center,
  Fade,
  useDisclosure,
  Icon,
  Input,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import BlockwaveLoad from "../layout/BlockwaveLoad";
import { AiFillCheckCircle } from "react-icons/ai";
import { useAuth } from "../../contexts/AuthContext";

function ChangeablePhoto(props) {
  const { storageRef, databaseRef, initUrl, callback, size, name } = props;
  const { currUser } = useAuth();

  const [url, setUrl] = useState(initUrl);
  const [isLoading, setIsLoading] = useState(false);

  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isLoading) {
      window.onbeforeunload = function () {};
    } else {
      window.onbeforeunload = null;
    }
  }, [isLoading]);

  async function handleChangePhoto(e) {
    console.log("OLD PHOTO: " + currUser.photoURL);
    setIsLoading(true);

    // get uploaded file
    const photo = e.target.files[0];

    // convert photo to URL
    setUrl(URL.createObjectURL(photo));

    // update photo in firebase storage
    await storageRef.put(photo).then(async (snapshot) => {
      // get url returned by firebase
      await storageRef.getDownloadURL().then(async (url) => {
        // update RTDB
        databaseRef.set(url);

        if (callback) {
          await callback(url);
        }
      });
    });

    setIsCompleted(true);

    setTimeout(() => {
      setIsCompleted(false);
      setIsLoading(false);
    }, 1000);
  }
  return (
    <Center position="relative" h={size} w={size}>
      {isLoading &&
        (!isCompleted ? (
          <HStack
            position="absolute"
            zIndex={9999}
            wrap="wrap-reverse"
            align="center"
          >
            <Text fontSize="md">Loading...</Text>
            <BlockwaveLoad />
          </HStack>
        ) : (
          <Icon
            position="absolute"
            zIndex={9999}
            as={AiFillCheckCircle}
            color="green"
            boxSize="30px"
          />
        ))}

      <Avatar
        size="xl"
        src={url}
        onClick={() => {
          document.getElementById("fileInput").click();
        }}
        opacity={isLoading ? 0.2 : 1}
        h={size}
        w={size}
        cursor="pointer"
        name={name}
        borderWidth="1px"
        borderColor="black"
      />
      <form type="submit">
        <Input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          onChange={(e) => handleChangePhoto(e)}
          disabled={isLoading}
        />
      </form>
    </Center>
  );
}

export default ChangeablePhoto;
