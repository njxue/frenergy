import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Notice from "./Notice";

function InviteItem(props) {
  const { noticeId } = props;
  const visibilityRef = ref.child(`groupsVisibility/${noticeId}`);
  const [isPublic, setIsPublic] = useState();

  useEffect(() => {
    visibilityRef.on("value", (snapshot) => {
      setIsPublic(snapshot.val() == "public");
    });
  }, [noticeId]);

  return (
    isPublic != undefined && (
      <Notice noticeId={noticeId} key={noticeId} isPublic={isPublic} />
    )
  );
}

export default InviteItem;
