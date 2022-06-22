import MainNavigation from ".";
import { useWindowDimensions } from "../../utils/helper";
import CollapsedMainNavigation from "./CollapsedMainNavigation";

function Navbar() {
  const { width } = useWindowDimensions();

  if (width >= 600) {
    return <MainNavigation />;
  } else {
    return <CollapsedMainNavigation />;
  }
}

export default Navbar;
