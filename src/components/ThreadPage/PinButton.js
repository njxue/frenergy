import { AiFillPushpin, AiOutlinePushpin } from "react-icons/ai";
import { Icon, Tooltip } from "@chakra-ui/react";
import { usePin } from "../../utils/helper";

function PinButton(props) {
  const { postId } = props;

  const { isPinned, togglePin } = usePin(postId);
  return (
    <Tooltip label={isPinned ? "Unpin" : "Pin"} shouldWrapChildren>
      <Icon
        cursor="pointer"
        as={isPinned ? AiFillPushpin : AiOutlinePushpin}
        bg="F7F7F7"
        onClick={togglePin}
      />
    </Tooltip>
  );
}

export default PinButton;
