import { Search2Icon } from "@chakra-ui/icons";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Input,
  HStack,
  Icon,
  Text,
  useDisclosure,
  Divider,
  Box,
} from "@chakra-ui/react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { ref } from "../../config/firebase";
import SearchItem from "./SearchItem";

function SearchUsers(props) {
  const { handleClick } = props;
  const { error, setError } = useState("");
  //console.log(handleClick);

  const inputRef = useRef();
  const navigate = useNavigate();
  const [username, setUsername] = useState();

  const [userData, setUserData] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  useEffect(() => {
    if (username) {
      ref.child(`usernames/${username}`).on("value", (snapshot) => {
        if (snapshot.exists()) {
          const uid = snapshot.val();
          ref.child(`users/${uid}/profile`).on("value", (snapshot) => {
            setUserData(Object.assign({ uid: uid }, snapshot.val()));
          });
        } else {
          setUserData();
        }
      });
    }
  }, [username]);

  return (
    <>
      <Popover
        initialFocusRef={inputRef}
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
      >
        <PopoverTrigger>
          <HStack>
            <Search2Icon cursor="pointer" />
            <Icon as={FaDog} />
          </HStack>
        </PopoverTrigger>
        <PopoverContent padding={3}>
          <Box>
            <Input
              placeholder="Search user"
              color="black"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              ref={inputRef}
            />

            {userData ? (
              <SearchItem
                handleClick={() => {
                  return handleClick(userData);
                }}
                userData={userData}
                onClose={onClose}
              />
            ) : (
              <Text color="black">No such user</Text>
            )}
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SearchUsers;
