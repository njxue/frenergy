import { Box, Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ref } from "../../config/firebase";
import Notice from "./Notice";
import Loader from "../layout/Loader";

function NoticeList() {
  const noticesRef = ref.child("notices");

  const [notices, setNotices] = useState();

  useEffect(() => {
    noticesRef.on("value", async (snapshot) => {
      const tmp = [];
      const data = await snapshot.val();
      for (const k in data) {
        tmp.push(Object.assign({ noticeId: k }, data[k]));
      }
      tmp.reverse();

      setNotices(tmp);
    });
  }, []);

  return notices == undefined ? (
    <Loader />
  ) : (
    <Flex
      direction="row"
      wrap="wrap"
      justifyContent="start"
      gap={7}
      flexBasis="25%"
    >
      {notices.map((notice) => {
        return <Notice data={notice} key={notice.noticeId}/>;
      })}
    </Flex>
  );
}

export default NoticeList;
