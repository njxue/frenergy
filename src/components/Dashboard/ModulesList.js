import {
  TableContainer,
  Table,
  Link,
  Tr,
  Td,
  Thead,
  Th,
  VStack,
} from "@chakra-ui/react";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { Heading, Button, Text, Flex } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

function ModulesList(props) {
  const { editable } = props;
  const { modules, removeModule } = useUserInfoContext();
  const navigate = useNavigate();

  function handleRemove(module) {
    removeModule(module);
  }

  return (
    <div>
      <TableContainer style={{ "table-layout": "fixed" }}>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Heading size="md">My Modules</Heading>
              </Th>
            </Tr>
          </Thead>
          {modules.map((m) => (
            <Tr key={m.moduleCode}>
              <Td display="flex" padding={2}>
                <Button
                  w="100%"
                  variant="ghost"
                  onClick={() => navigate("/" + m.moduleCode)}
                  colorScheme="black"
                >
                  <Flex alignItems="start" w="100%" flexDirection="column">
                    <Text>{m.moduleCode}</Text>
                    <Text fontSize="xs">{m.title}</Text>
                  </Flex>
                </Button>
                {editable && <SmallCloseIcon onClick={() => handleRemove(m)} />}
              </Td>
            </Tr>
          ))}
        </Table>
      </TableContainer>
    </div>
  );
}

export default ModulesList;
