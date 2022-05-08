import { Form, Button, Alert } from "react-bootstrap";
import { useRef, useState } from "react";
import Container from "./layout/Container";
import Padder from "./layout/Padder";
import classes from "../static/Auth.module.css";
import { useAuth } from "../contexts/AuthContext";
import { Link, useNavigate } from "react-router-dom";

function Login(props) {
  const emailRef = useRef();
  const passwordRef = useRef();

  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit() {
    setError("");
    setLoading(false);

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    
    } catch {
      setError("Failed to Login");
    }
    setLoading(false);
  }

  return (
    <Container>
      <div className={classes.auth}>
        <Padder>
          {error && (
            <div>
              <Alert variant="danger">{error}</Alert>
            </div>
          )}
          <Container>
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-3" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Button
                className={classes.button}
                disabled={loading}
                onClick={handleSubmit}
              >
                Login
              </Button>
            </Form>
            <Padder>
              <div className={classes.links}>
                Need an account? <Link to="/register">Register here!</Link>
              </div>
              <div className={classes.links}>
                Forgot password? <Link to="/resetpassword">Reset password here</Link>
              </div>
            </Padder>
          </Container>
        </Padder>
      </div>
    </Container>
  );
}

export default Login;
