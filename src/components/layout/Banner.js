import classes from "../../static/Banner.module.css";
import Padder from "./Padder";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";

function Banner() {
  const navigate = useNavigate();
  return (
    <div>
      <div className={classes.banner}>
        <Padder>
          <img
            src={require("../../static/placeholder-img.png")}
            onClick={() => navigate("/")}
          />
        </Padder>
        <div className={classes.title}>
          <div><h1>Placeholder name</h1></div>
        </div>
      </div>
      <div className={classes.orangeBar}></div>
    </div>
  );
}

export default Banner;
