import { Form, Button, Alert, Card } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "./layout/Container";
import Padder from "./layout/Padder";
import classes from "../static/Auth.module.css";
import { useAuth } from "../contexts/AuthContext";
import { ref } from "../utils/firebase";


function Register(props) {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordcfRef = useRef();
  const usernameRef = useRef();

  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(false);
    setSuccess(false);

    if (passwordRef.current.value !== passwordcfRef.current.value) {
      setError("Passwords do not match!");
      setLoading(false);
      return;
    }

    if (passwordRef.current.value.length < 6) {
      setError("Password must have at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      setError('');
      setLoading(true);
      await register(emailRef.current.value, passwordRef.current.value, usernameRef.current.value);
      setSuccess(true);
    } catch {
      setError("Failed to Register");
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
          {success && (
            <div>
              <Alert variant="success">Successfully registered an account. Click <Link to="/login">here</Link> to login</Alert>
            </div>
          )}
          <Container>
          <h1>Register</h1> 
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              <Form.Group className="mb-3" id="username">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" ref={usernameRef} required />
              </Form.Group>
              <Form.Group className="mb-3" id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" ref={passwordRef} required />
              </Form.Group>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control type="passsword" ref={passwordcfRef} required />
              </Form.Group>
              <Button
                className={classes.button}
                disabled={loading}
                onClick={handleSubmit}
              >
                Register
              </Button>
            </Form>
            <Padder>
              <div className={classes.links}>
                Already have an account? <Link to="/login">Login here!</Link>
              </div>
            </Padder>
          </Container>
        </Padder>
      </div>
    </Container>
  );
}

export default Register;
