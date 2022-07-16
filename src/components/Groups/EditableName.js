import {
  Editable,
  EditablePreview,
  EditableInput,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { ref } from "../../config/firebase";
import { useError } from "../../utils/helper";

function EditableName(props) {
  const { groupData } = props;
  const [name, setName] = useState(groupData.name);
  const groupNameRef = ref.child(`groups/${groupData.groupId}/name`);
  const { setError } = useError();

  function handleNameChange() {
    const length = name.trim().length;
    if (length == 0) {
      setError("Group name must contain at least 1 non-empty character!");
      setName(groupData.name);
    } else if (length > 30) {
      setError("Group name can consist of up to only 30 characters");
      setName(groupData.name);
    } else {
      groupNameRef.set(name.trim());
    }
  }

  return (
    <Editable
      value={name}
      onChange={(e) => setName(e)}
      onSubmit={handleNameChange}
      overflow="auto"
      w="70%"
    >
      <Heading>
        <EditablePreview noOfLines={2} />
        <EditableInput border="solid" />
      </Heading>
    </Editable>
  );
}

export default EditableName;
