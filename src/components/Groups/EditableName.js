import {
  Editable,
  EditablePreview,
  EditableInput,
  Heading,
} from "@chakra-ui/react";
import { useState } from "react";
import { ref } from "../../config/firebase";

function EditableName(props) {
  const { groupData } = props;
  const [name, setName] = useState(groupData.name);
  const groupNameRef = ref.child(`groups/${groupData.groupId}/name`);

  function handleNameChange() {
     
    groupNameRef.set(name);
  }

  return (
    <Editable
      value={name}
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
