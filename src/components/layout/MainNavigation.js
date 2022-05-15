import { Button, Navbar, Nav } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import classes from "../../static/MainNavigation.module.css";

function MainNavigation() {
  const navigate = useNavigate();
  const { currUser, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogout() {
    try {
        setError('');
        setLoading(true);
        await logout().then(() => navigate("/login"));
    } catch {
        setError("Failed to logout");
    }
    setLoading(false);
  }
  return (
    <Navbar>
      <Nav.Link className={classes.link} style={{color: "white"}} onClick={() => { navigate("/profile")}}>Profile</Nav.Link>
      <Nav.Link className={classes.link} style={{color: "white"}} onClick={handleLogout}>Logout</Nav.Link>
    </Navbar>
  );
}

export default MainNavigation;
