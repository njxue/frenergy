import { ref } from "../../config/firebase";
import { useState, useEffect } from "react";
import SkeletonLoader from "../layout/SkeletonLoader";
import Notice from "./Notice";
import { Flex, VStack, HStack, Box } from "@chakra-ui/react";
import NoticeFilter from "./NoticeFilter";

function PublicNotices() {
  const [noticeIds, setNoticeIds] = useState();
  const [module, setModule] = useState("");

  useEffect(() => {
    if (module) {
      // filter by module
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
      // get all
      const noticeIdsRef = ref.child(`publicNoticeIds`);
      noticeIdsRef.on("value", async (snapshot) => {
        const tmp = [];
        const data = await snapshot.val();
        for (const module in data) {
          for (const noticeId in data[module]) {
            tmp.push(noticeId);
          }
        }
        tmp.reverse();
        setNoticeIds(tmp);
      });
    }
  }, [module]);

  return noticeIds == undefined ? (
    <SkeletonLoader />
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
            return (
              <Notice
                noticeId={noticeId}
                key={noticeId}
                isPublic
                type="apply"
              />
            );
          })}
        </Flex>
      </Box>

      <NoticeFilter module={module} setModule={setModule} />
    </Flex>
  );
}

export default PublicNotices;
