import { ref } from "../../config/firebase";
import { useState, useEffect } from "react";
import Loader from "../layout/Loader";
import Notice from "./Notice";
import { Flex, VStack, HStack, Box, Center } from "@chakra-ui/react";
import NoticeFilter from "./NoticeFilter";
import EmptyPrompt from "../Dashboard/EmptyPrompt";
import Pagination from "../layout/Pagination";

function PublicNotices() {
  const [noticeIds, setNoticeIds] = useState();
  const [module, setModule] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const noticesPerPage = 10;

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

  const indexOfLast = currentPage * noticesPerPage;
  const indexOfFirst = indexOfLast - noticesPerPage;

  return noticeIds == undefined ? (
    <Loader />
  ) : (
    <HStack justifyContent="space-between" align="top" h="100%">
      <Box overflow="auto" w="100%">
        {noticeIds[0] ? (
          <VStack align="end" w="100%">
            <VStack align="stretch" w="100%">
              <Flex
                direction="row"
                wrap="wrap"
                justifyContent="start"
                gap={7}
                flexBasis="25%"
              >
                {noticeIds.slice(indexOfFirst, indexOfLast).map((noticeId) => {
                  return <Notice noticeId={noticeId} key={noticeId} isPublic />;
                })}
              </Flex>
            </VStack>
            <Pagination
              numPerPage={noticesPerPage}
              totalNum={noticeIds.length}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </VStack>
        ) : (
          <Center>
            <EmptyPrompt group="study lounges" message="Create one now!" />
          </Center>
        )}
      </Box>

      <Box w="200px" bg="#f1f1f1" h="100%">
        <NoticeFilter module={module} setModule={setModule} />
      </Box>
    </HStack>
  );
}

export default PublicNotices;
