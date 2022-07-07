import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import PreLoginLayout from "../layout/PreLoginLayout";
import RegisterForm from "./RegisterForm";
import Loader from "../layout/Loader";

function Register() {
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
      <RegisterForm />
    </PreLoginLayout>
  );
}

export default Register;
