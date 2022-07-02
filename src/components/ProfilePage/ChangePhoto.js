import { Input, Text, Icon } from "@chakra-ui/react";
import { ref, storageRef } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import { MdAddAPhoto } from "react-icons/md";
import { updateProfile } from "firebase/auth";

function ChangePhoto(props) {
  const { currUser } = useAuth();
  const userRef = ref.child(`users/${currUser.uid}/profile`);
  const { setUrl, setIsLoading } = props;
  async function handleChangePhoto(e) {
    setIsLoading(true);
    const photo = e.target.files[0];
    setUrl(URL.createObjectURL(photo));
    await storageRef
      .child(`${currUser.uid}/profile`)
      .put(photo)
      .then(async (snapshot) => {
        console.log(snapshot);
        await storageRef
          .child(`${currUser.uid}/profile`)
          .getDownloadURL()
          .then(async (url) => {
            await updateProfile(currUser, {
              photoURL: url,
            });
            userRef.update(
              {
                photoURL: url,
              },
              () => setIsLoading(false)
            );
          });
      });
  }
  return (
    <form onSubmit={handleChangePhoto}>
      <Input type="file" id="imgupload" onChange={handleChangePhoto} hidden />
      <label for="imgupload">
        <Icon
          w={10}
          h={10}
          as={MdAddAPhoto}
          cursor="pointer"
          color="white"
          bg="#051e3e"
          padding={2}
          borderRadius="15px"
        />
      </label>
    </form>
  );
}

export default ChangePhoto;
