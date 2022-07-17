import { Avatar } from "@chakra-ui/react";
import { useState } from "react";

function ChangeablePhoto(props) {
  const { storageRef, databaseRef, initUrl, callback, size, name } = props;
  const [url, setUrl] = useState(initUrl);

  async function handleChangePhoto(e) {
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
          callback();
        }
      });
    });
  }
  return (
    <>
      <Avatar
        size="xl"
        src={url}
        onClick={() => {
          document.getElementById("fileInput").click();
        }}
        h={size}
        w={size}
        cursor="pointer"
        name={name}
      />
      <form type="submit">
        <input
          type="file"
          style={{ display: "none" }}
          id="fileInput"
          onChange={(e) => handleChangePhoto(e)}
        />
      </form>
    </>
  );
}

export default ChangeablePhoto;
