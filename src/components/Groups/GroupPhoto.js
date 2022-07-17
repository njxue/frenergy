import { ref, storageRef } from "../../config/firebase";
import ChangeablePhoto from "../layout/ChangeablePhoto";

function GroupPhoto(props) {
  const { groupData } = props;
  const { photoURL, groupId, name } = groupData;

  const groupPhotoRef = ref.child(`groups/${groupId}/photoURL`);
  const groupPhotoStorage = storageRef.child(`${groupId}/groupPhoto`);

  return (
    <ChangeablePhoto
      storageRef={groupPhotoStorage}
      databaseRef={groupPhotoRef}
      initUrl={photoURL}
      name={name}
    />
  );
}

export default GroupPhoto;
