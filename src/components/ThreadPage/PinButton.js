import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";
import { usePin } from "../../utils/helper";

function PinButton(props) {
  const { threadId } = props;
  const { isPinned, togglePin } = usePin(threadId);
  return (
    <IconButton
      size="xs"
      as={isPinned ? AiFillPushpin : AiOutlinePushpin}
      bg="F7F7F7"
      onClick={togglePin}
    />
  );
}

export default PinButton;
