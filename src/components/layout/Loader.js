import { Spinner } from "@chakra-ui/react"
import classes from "../../static/Loader.module.css";

function Loader(props) {
  return (
    <div className={classes.loader} hidden={props.hidden}>
      <Spinner size="xl" />
      <h1>Loading...</h1>
    </div>
  );
}

export default Loader;
