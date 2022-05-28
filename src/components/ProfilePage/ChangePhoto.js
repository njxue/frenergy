import { Input } from "@chakra-ui/react";
import { storageRef } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";

function ChangePhoto(props) {
  const { currUser } = useAuth();

  const { setUrl, setIsLoading } = props;
  async function handleChangePhoto(e) {
    setIsLoading(true);
    const photo = e.target.files[0];
    setUrl(URL.createObjectURL(photo));
    await storageRef
      .child(`${currUser.uid}/profile`)
      .put(photo)
      .then(async (snapshot) => {
        await storageRef
          .child(`${currUser.uid}/profile`)
          .getDownloadURL()
          .then((url) => {
            currUser.updateProfile({
              photoURL: url,
            });
          });
        setIsLoading(false);
      });
  }
  return (
    <form onSubmit={handleChangePhoto}>
      <Input type="file" id="imgupload" onChange={handleChangePhoto} hidden />
      <label for="imgupload">Change photo</label>
    </form>
  );
}

export default ChangePhoto;
