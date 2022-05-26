import {
  Table,
  Tbody,
  Td,
  Text,
  Thead,
  Tr,
  Th,
  VStack,
  TableContainer,
  Icon,
} from "@chakra-ui/react";
import { AiFillPushpin } from "react-icons/ai";
import { usePin } from "../../utils/helper";
import ThreadBox from "./ThreadBox";

function Pinned() {
  const { pins } = usePin();
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
              {pins.map((pinnedPost) => {
                return <ThreadBox post={pinnedPost} />;
              })}
            </VStack>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Pinned;
