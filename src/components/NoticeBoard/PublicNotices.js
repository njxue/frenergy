import { ref } from "../../config/firebase";
import { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import Notice from "./Notice";
import { Flex, VStack, HStack, Box } from "@chakra-ui/react";
import NoticeFilter from "./NoticeFilter";

function PublicNotices() {
  const [noticeIds, setNoticeIds] = useState();
  const [module, setModule] = useState("");

  useEffect(() => {
    if (module) {
      const noticeIdsRef = ref.child(`publicNoticeIds/${module.label}`);
      noticeIdsRef.on("value", async (snapshot) => {
        const tmp = [];
        const data = await snapshot.val();
        for (const k in data) {
          tmp.push(k);
        }
        tmp.reverse();
        setNoticeIds(tmp);
      });
    } else {
      const noticeIdsRef = ref.child(`publicNoticeIds`);
      noticeIdsRef.on("value", async (snapshot) => {
        const tmp = [];
        const data = await snapshot.val();
        for (const m in data) {
          for (const noticeId in data[m]) {
            tmp.push(noticeId);
          }
        }
        tmp.reverse();
        setNoticeIds(tmp);
      });
    }
  }, [module]);

  return noticeIds == undefined ? (
    <Loader />
  ) : (
    <Flex justifyContent="space-between" direction="row">
      <Box>
        <Flex
          direction="row"
          wrap="wrap"
          justifyContent="start"
          gap={7}
          flexBasis="25%"
        >
          {noticeIds.map((noticeId) => {
            return <Notice noticeId={noticeId} key={noticeId} isPublic />;
          })}
        </Flex>
      </Box>

      <NoticeFilter module={module} setModule={setModule} />
    </Flex>
  );
}

export default PublicNotices;
