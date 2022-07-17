import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, screen, act } from "@testing-library/react";
import RegisterForm from "../components/Register/RegisterForm";
import "@testing-library/jest-dom/extend-expect";

jest.spyOn(console, "error").mockImplementation(() => {});
it("Register renders", async () => {
  const component = render(
    <BrowserRouter>
      <AuthProvider>
        <RegisterForm />
      </AuthProvider>
    </BrowserRouter>
  );

  // correct heading
  const header = component.getByTestId("header");
  expect(header.textContent).toBe("Register");

  // form renders
  const form = component.getByTestId("form");
  expect(form).toBeInTheDocument();

  // Login button renders
  const loginBtn = component.getByTestId("login-btn");
  expect(loginBtn.textContent).toBe("Login");

  // Register button renders
  const registerBtn = component.getByTestId("register-btn");
  expect(registerBtn.textContent).toBe("Register");
});

