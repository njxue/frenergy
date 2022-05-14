import { Form, Button, Alert, Card } from "react-bootstrap";
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import Container from "../layout/Container";
import Padder from "../layout/Padder";
import classes from "../../static/Auth.module.css";
import { useAuth } from "../../contexts/AuthContext";

function ResetPassword(props) {
  const emailRef = useRef();

  const { resetPassword } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit() {
    setError("");
    setLoading(false);
    setSuccess(false);

    try {
      setError('');
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setSuccess(true);
    } catch {
      setError("Account does not exist");
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
              <Alert variant="success">Check your inbox for password reset</Alert>
            </div>
          )}
          <Container>
          <h1>Reset Password</h1> 
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" id="email">
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="email" ref={emailRef} required />
              </Form.Group>
              
              <Button
                className={classes.button}
                disabled={loading}
                onClick={handleSubmit}
              >
                Reset Password
              </Button>
            </Form>
            <Padder>
              <div>
                <Link to="/login">Login</Link>
              </div>
            </Padder>
          </Container>
        </Padder>
      </div>
    </Container>
  );
}

export default ResetPassword;
