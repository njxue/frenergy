import {
  Table,
  Tbody,
  Thead,
  Tr,
  Th,
  VStack,
  TableContainer,
} from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";
import { usePin } from "../../utils/helper";
import ThreadBox from "./ThreadBox";

function Pinned() {
  const { pins } = usePin(); // array of postIds
  return (
    <TableContainer maxW="100vw" style={{ tableLayout: "fixed" }}>
      <Table>
        <Thead>
          <Th>
            <Tr>Pinned</Tr>
          </Th>
        </Thead>
        <Tbody>
          <Tr>
            <VStack alignItems="start" cursor="pointer">
              {pins.map((postId) => {
                return <ThreadBox postId={postId} />;
              })}
            </VStack>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Pinned;
