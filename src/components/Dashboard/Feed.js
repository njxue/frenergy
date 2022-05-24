import { Stack } from "react-bootstrap";
import Following from "./Following";
import Pinned from "./Pinned";

function Feed() {
  return (
    <Stack>
      <Pinned />
      <Following />
    </Stack>
  );
}

export default Feed;
