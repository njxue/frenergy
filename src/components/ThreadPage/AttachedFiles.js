import { HStack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { storageRef } from "../../config/firebase";
import Loader from "../layout/Loader";

function AttachedFiles(props) {
  const { parentRef } = props;
  const [files, setFiles] = useState([]);

  async function getFiles() {
    console.log("Loading files......");

    const tmp = [];
    await parentRef.listAll().then((fileList) => {
      const allFiles = fileList.items;

      allFiles.forEach(async (f) => {
        const fileName = f.name;

        const fileRef = parentRef.child(fileName);
        await fileRef
          .getDownloadURL()
          .then((url) => {
            tmp.push({ name: fileName, url: url });
          })
          .catch((err) => console.log(err));
      });
    });
    return tmp;
  }
  getFiles().then((res) => {
    setFiles(res);
    console.log(res);
  });

  console.log("FILES: " + files);
  return (
    <>
      <HStack>
        {files.map((f) => (
          <Text>{f.name}</Text>
        ))}
      </HStack>
    </>
  );
}

export default AttachedFiles;
