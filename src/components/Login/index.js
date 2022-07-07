import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PreLoginLayout from "../layout/PreLoginLayout";
import LoginForm from "./LoginForm";
import Loader from "../layout/Loader";

function Login() {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  if (loggedIn == undefined) {
    return <Loader />;
  }

  if (loggedIn) {
    navigate("/");
    return;
  }

  return (
    <PreLoginLayout>
      <LoginForm />
    </PreLoginLayout>
  );
}

export default Login;
