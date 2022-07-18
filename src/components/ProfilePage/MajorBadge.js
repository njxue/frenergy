import { Badge } from "@chakra-ui/react";
import { BADGE_COLORS } from "../../api/customapi";

function MajorBadge(props) {
  const { major, size } = props;

  return (
    <Badge
      fontSize={size}
      bg={BADGE_COLORS[major]}
      color="white"
      data-testId="major"
    >
      {major}
    </Badge>
  );
}

export default MajorBadge;
