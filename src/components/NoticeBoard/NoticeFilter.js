import {
  Heading,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  StackDivider,
  Text,
  VStack,
  Icon,
} from "@chakra-ui/react";
import { useState } from "react";
import ModuleFilter from "./ModuleFilter";
import { AiFillFilter } from "react-icons/ai";

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
    <VStack divider={<StackDivider />} align="start" w="200px">
      <HStack align="center" justifyContent="space-between">
        <Text as="b">Filter</Text>
        <Icon as={AiFillFilter} />
      </HStack>
      <RadioGroup defaultValue="1" onChange={handleChange}>
        <Stack>
          <Radio value="1">Show all</Radio>
          <Radio value="2">Filter by module</Radio>
          {hasFilter && <ModuleFilter module={module} setModule={setModule} />}
        </Stack>
      </RadioGroup>
    </VStack>
  );
}

export default NoticeFilter;
