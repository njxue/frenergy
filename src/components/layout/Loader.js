import { Spinner } from "react-bootstrap";
import classes from "../../static/Loader.module.css";

function Loader(props) {
  return (
    <div className={classes.loader} hidden={props.hidden}>
      <Spinner animation="border" />
      <h1>Loading...</h1>
    </div>
  );
}

export default Loader;
