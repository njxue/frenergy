import {
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
  Icon,
  Divider,
} from "@chakra-ui/react";
import { useState } from "react";
import ModuleFilter from "./ModuleFilter";
import { MdFilterList } from "react-icons/md";

function NoticeFilter(props) {
  const { module, setModule } = props;
  const [hasFilter, setHasFilter] = useState(false);

  function handleChange(e) {
    if (e == "1") {
      setModule("");
      setHasFilter(false);
    } else {
      setHasFilter(true);
    }
  }
  return (
    <VStack align="start" w="inherit" h="100%" data-testid="filter" padding={2}>
      <HStack align="center" justifyContent="space-between">
        <Text as="b">Filter</Text>
        <Icon as={MdFilterList} />
      </HStack>
      <Divider w="100%" color="gray" />
      <RadioGroup defaultValue="1" onChange={handleChange} colorScheme="red">
        <Stack>
          <Radio value="1" backgroundColor="white" borderColor="black">
            Show all
          </Radio>
          <Radio value="2" backgroundColor="white" borderColor="black">
            Filter by module
          </Radio>
          {hasFilter && <ModuleFilter module={module} setModule={setModule} />}
        </Stack>
      </RadioGroup>
    </VStack>
  );
}

export default NoticeFilter;
