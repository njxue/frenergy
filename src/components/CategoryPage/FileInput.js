import {
  FormControl,
  HStack,
  Box,
  Text,
  Input,
  FormErrorMessage,
} from "@chakra-ui/react";
import { AttachmentIcon, SmallCloseIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";

function FileInput(props) {
  const { files, setFiles, limit } = props;
  const [isInvalid, setIsInvalid] = useState(false);

  function handleChange(e) {
    const newFile = e.target.files[0];

    if (files.length >= limit) {
      setIsInvalid(true);
      return;
    } else {
      setIsInvalid(false);
      if (!files.some((f) => f.name == newFile.name)) {
        setFiles([...files, newFile]);
      }
    }
  }

  useEffect(() => {
    if (files.length > limit) {
      setIsInvalid(true);
    } else {
      setIsInvalid(false);
    }
  }, [files]);

  return (
    <FormControl isInvalid={isInvalid}>
      <Input
        type="file"
        display="none"
        onChange={(e) => {
          handleChange(e);
        }}
        isInvalid={isInvalid}
      />

      <HStack>
        <AttachmentIcon
          cursor="pointer"
          onClick={() => {
            document.querySelector('[type="file"]').click();
          }}
        />
        {files[0] ? (
          <HStack wrap="wrap">
            {files.map((f) => {
              return (
                <Box _hover={{ backgroundColor: "#E2E2E2" }} padding={1}>
                  <HStack>
                    <Text fontSize="xs">{f.name}</Text>
                    <SmallCloseIcon
                      cursor="pointer"
                      onClick={() => {
                        const newFiles = files.filter((file) => {
                          return file.name != f.name;
                        });
                        setFiles(newFiles);
                      }}
                    />
                  </HStack>
                </Box>
              );
            })}
          </HStack>
        ) : (
          <Text fontSize="sm" color="gray">
            Attach files (max: 5)
          </Text>
        )}
      </HStack>
      <FormErrorMessage>Maximum number of files reached</FormErrorMessage>
    </FormControl>
  );
}

export default FileInput;
