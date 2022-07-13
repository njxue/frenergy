import Login from "../components/Login";
import LoginForm from "../components/Login/LoginForm";
import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
} from "@testing-library/react";
import renderer from "react-test-renderer";
import "@testing-library/jest-dom/extend-expect";
import { mount } from "enzyme";

let component;
beforeEach(
  () =>
    (component = render(
      <BrowserRouter>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </BrowserRouter>
    ))
);

 

it("Login renders", async () => {
  // correct heading
  const header = component.getByTestId("header");
  expect(header.textContent).toBe("Login");

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

it("Prevent login if email is empty", () => {
  const emailInput = component.getByTestId("email-input");
  const passwordInput = component.getByTestId("password-input");
  const loginBtn = component.getByTestId("login-btn");

  fireEvent.change(emailInput, {
    target: {
      value: "",
    },
  });

  fireEvent.change(passwordInput, {
    target: {
      value: "password",
    },
  });

  fireEvent.click(loginBtn);
  const emailError = component.queryByTestId("email-error");
  expect(emailError).not.toBeNull();
});

it("Prevent login if password is empty", () => {
  const emailInput = component.getByTestId("email-input");
  const passwordInput = component.getByTestId("password-input");
  const loginBtn = component.getByTestId("login-btn");

  fireEvent.change(emailInput, {
    target: {
      value: "email@email.com",
    },
  });

  fireEvent.change(passwordInput, {
    target: {
      value: "",
    },
  });

  fireEvent.click(loginBtn);
  const passwordError = component.queryByTestId("password-error");
  expect(passwordError).not.toBeNull();
});

it("No error message if email and password is provided", () => {
  const emailInput = component.getByTestId("email-input");
  const passwordInput = component.getByTestId("password-input");
  const loginBtn = component.getByTestId("login-btn");

  fireEvent.change(emailInput, {
    target: {
      value: "email@email.com",
    },
  });

  fireEvent.change(passwordInput, {
    target: {
      value: "password",
    },
  });

  fireEvent.click(loginBtn);
  const emailError = component.queryByTestId("email-error");
  const passwordError = component.queryByTestId("password-error");
  expect(emailError).toBeNull();
  expect(passwordError).toBeNull();
});

it("Sets loggedIn state to true when logged in", async () => {
  const TestAuth = () => {
    const { loggedIn, login } = useAuth();

    return (
      <>
        <div data-testid="value">
          {loggedIn == undefined ? "undefined" : loggedIn.toString()}
        </div>
        <button
          onClick={() => login("awbital22@gmail.com", "test@1")}
          data-testid="button"
        >
          Login
        </button>
      </>
    );
  };

  const TestComponent = render(
    <BrowserRouter>
      <AuthProvider>
        <TestAuth />
      </AuthProvider>
    </BrowserRouter>
  );

  const button = TestComponent.getByTestId("button");

  fireEvent.click(button);
  await waitFor(() =>
    expect(TestComponent.getByTestId("value").textContent).toBe("true")
  );

  
});
