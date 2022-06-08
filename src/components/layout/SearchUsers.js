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

function SearchUsers() {
  const usernameRef = useRef();
  const navigate = useNavigate();
  const [input, setInput] = useState("");

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Popover initialFocusRef={usernameRef}>
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
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={usernameRef}
            />

            <SearchItem username={input} onClose={onClose} />
          </Box>
        </PopoverContent>
      </Popover>
    </>
  );
}

export default SearchUsers;
