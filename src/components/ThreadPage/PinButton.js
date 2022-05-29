import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";
import { usePin } from "../../utils/helper";

function PinButton(props) {
  const { postId } = props;
 
  const { isPinned, togglePin } = usePin(postId);
  return (
    <IconButton
      cursor="pointer"
      size="xs"
      as={isPinned ? AiFillPushpin : AiOutlinePushpin}
      bg="F7F7F7"
      onClick={togglePin}
    />
  );
}

export default PinButton;
