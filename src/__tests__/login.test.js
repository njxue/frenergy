import Login from "../components/Login";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";

it("renders properly", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
    <AuthProvider>
      <Login></Login></AuthProvider>
    </BrowserRouter>,
    div
  );
});
