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
    if (name.trim().length != 0) {
      groupNameRef.set(name.trim());
    } else {
      setName(groupData.name);
      setError("Group name must contain at least 1 non-empty character!");
    }
  }

  return (
    <Editable
      value={name.trim()}
      onChange={(e) => setName(e)}
      onSubmit={handleNameChange}
    >
      <Heading>
        <EditablePreview />
        <EditableInput />
      </Heading>
    </Editable>
  );
}

export default EditableName;
