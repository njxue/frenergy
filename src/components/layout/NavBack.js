import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav } from "react-bootstrap";
import { useRouteHistory } from "../../contexts/RouteHistory";

function NavBack(props) {
  const { routeHistory } = props;
  const navigate = useNavigate();

  function handleClick(h) {
    navigate(h.route);
  }
  console.log(routeHistory)
  return (
    <Navbar>
      {routeHistory.map((h) => {
        return <Nav.Link onClick={() => handleClick(h)}>{h.text}</Nav.Link>;
      })}
    </Navbar>
  );
}

export default NavBack;
