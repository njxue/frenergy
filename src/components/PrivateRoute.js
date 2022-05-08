import { useAuth } from "../contexts/AuthContext";
import Login from "./Login";

function PrivateRoute(props) {
    const { currUser } = useAuth();
    return <div>
        { currUser ? props.children : <Login /> }
    </div>
}

export default PrivateRoute;