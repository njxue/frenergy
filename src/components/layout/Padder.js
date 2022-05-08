import classes from "../../static/Padder.module.css";

function Padder(props) {
    return <div className={classes.padder}>
        { props.children }
    </div>
}

export default Padder;