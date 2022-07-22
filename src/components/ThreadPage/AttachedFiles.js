import { HStack, Icon, Link, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { AiOutlineFile } from "react-icons/ai";
import Loader from "../layout/Loader";

function AttachedFiles(props) {
  const { parentRef } = props;
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    async function getFiles() {
      const tmp = [];
      const allFiles = await parentRef.listAll();
      const fileList = allFiles.items;
      const req = fileList.map(async (f) => {
        const url = await f.getDownloadURL();
        tmp.push({ name: f.name, url: url });
      });

      await Promise.all(req);
      tmp.sort((f1, f2) => (f1.name < f2.name ? -1 : 1));

      return tmp;
    }
    getFiles()
      .then((res) => {
        setFiles(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, []);

  return isLoading ? (
    <HStack>
      <Text fontSize="xs">Scanning for attachments......</Text>
      <Spinner size="xs" />
    </HStack>
  ) : (
    <HStack spacing={5}>
      {files.map((f) => (
        <HStack>
          <Icon as={AiOutlineFile} />
          <Link fontSize="xs" href={f.url} isExternal>
            {f.name}
          </Link>
        </HStack>
      ))}
    </HStack>
  );
}

export default AttachedFiles;
