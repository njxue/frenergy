import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import SkeletonLoader from "../layout/SkeletonLoader";
import EditNotice from "../NoticeBoard/EditNotice";

function ManageNotice(props) {
  const { groupData } = props;
  const { groupId, visibility } = groupData;
  const noticeRef = ref.child(`${visibility}Notices/${groupId}`);
  const [notice, setNotice] = useState();

  useEffect(() => {
    noticeRef.on("value", (snapshot) => {
      if (snapshot.exists()) {
        setNotice(snapshot.val());
      }
    });
  }, [groupId]);

 
  return notice == undefined ? (
    <SkeletonLoader />
  ) : (
    <EditNotice notice={notice} />
  );
}

export default ManageNotice;
