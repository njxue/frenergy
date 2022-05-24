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
} from "@chakra-ui/react";
import { usePin } from "../../utils/helper";
import ThreadBox from "./ThreadBox";

function Pinned() {
  const { pins } = usePin();
  return (
    <TableContainer maxW="100vw" style={{tableLayout: "fixed"}}>
      <Table>
        <Thead>
          <Th>
            <Tr>Pinned</Tr>
          </Th>
        </Thead>
        <Tbody>
          <Tr>
            <Td padding="0" margin="0">
              <VStack alignItems="start">
                {pins.map((pinnedThread) => {
                  return <ThreadBox pinnedThread={pinnedThread} />;
                })}
              </VStack>
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default Pinned;
