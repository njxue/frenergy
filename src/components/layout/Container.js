import classes from "../../static/Container.module.css";

function Container(props) {
  return <div className={classes.container}>{props.children}</div>;
}

export default Container;
