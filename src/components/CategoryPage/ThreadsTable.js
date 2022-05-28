import {TableContainer, Table, Thead, Tbody, Th, Tr, Td} from "@chakra-ui/react";
import ThreadRow from "./ThreadRow";

function ThreadsTable(props) {
  const { posts } = props;
  return (
    <TableContainer maxWidth="100%">
      <Table
        variant="striped"
        colorScheme="gray"
        style={{ "table-layout": "fixed" }}
      >
        <Thead>
          <Tr>
            <Th w="50%">Title</Th>
            <Th w="25%">Author</Th>
            <Th w="15%">Created on</Th>
            <Th w="5%">Votes</Th>
          </Tr>
        </Thead>
        <Tbody>
          {posts.map((p) => {
            const post = p.post;
            return <ThreadRow post={post} />;
          })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default ThreadsTable;
