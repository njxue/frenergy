import classes from "../../static/Banner.module.css";
import Padder from "./Padder";
import { useNavigate } from "react-router-dom";
import MainNavigation from "./MainNavigation";
import { useAuth } from "../../contexts/AuthContext";
import { Heading } from "@chakra-ui/react";

function Banner() {
  const navigate = useNavigate();
  const { currUser } = useAuth();
  return (
    <div>
      <div className={classes.banner}>
        <div className={classes.logo}>
          <Padder>
            <img
              src={require("../../static/placeholder-img.png")}
              onClick={() => navigate("/")}
            />
          </Padder>
          <div className={classes.title}>
            <div>
              <Heading>Frenergy</Heading> 
            </div>
          </div>
        </div>
        {currUser && <MainNavigation />}
      </div>
      <div className={classes.orangeBar}></div>
    </div>
  );
}

export default Banner;
