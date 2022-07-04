import Login from "../components/Login";
import LoginForm from "../components/Login/LoginForm";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, screen } from "@testing-library/react";

it("Login fails if email or password input is empty", () => {
  render(
    <BrowserRouter>
      <AuthProvider>
        <LoginForm />
      </AuthProvider>
    </BrowserRouter>
  );
});
