import { Input, Text } from "@chakra-ui/react";
import { ref, storageRef } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

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
            await currUser.updateProfile({
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
        <Text cursor="pointer">Change photo</Text>
      </label>
    </form>
  );
}

export default ChangePhoto;
