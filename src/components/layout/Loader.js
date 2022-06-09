import { Spinner, Box } from "@chakra-ui/react";
import classes from "../../static/Loader.module.css";

function Loader(props) {
  return (
    <Box>
      <Spinner size="xl" />
      <h1>Loading...</h1>
    </Box>
  );
}

export default Loader;
