import {
  TableContainer,
  Table,
  Link,
  Tr,
  Td,
  Thead,
  Th,
} from "@chakra-ui/react";
import { useUserInfoContext } from "../../contexts/UserInfoContext";
import { Heading } from "@chakra-ui/react";
import { SmallCloseIcon } from "@chakra-ui/icons";

function ModulesList(props) {
  const { editable } = props;
  const { modules, removeModule } = useUserInfoContext();
  function handleRemove(module) {
    removeModule(module);
  }


  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>
                <Heading as="h1">My Modules</Heading>
              </Th>
            </Tr>
          </Thead>
          {modules.map((m) => (
            <Tr key={m}>
              <Td display="flex" justifyContent="space-between">
                <Link href={m}>{m}</Link>
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
