import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../components/Dashboard";

let component;

jest.mock("../contexts/AuthContext", () => {
  return {
    __esModule: true,
    default: (props) => {
      return <div>{props.children}</div>;
    },
    useAuth: () => {
      return {
        currUser: {
          uid: "foo",
        },
      };
    },
  };
});

beforeEach(() => {
  component = render(
    <BrowserRouter>
      <AuthProvider>
        <Dashboard />
      </AuthProvider>
    </BrowserRouter>
  );
});

jest.spyOn(console, "error").mockImplementation(() => {});

describe("Renders all three tabs", () => {
  it("Renders all three tabs", () => {
    const tabs = component.getAllByRole("tab");

    expect(tabs.length).toBe(3);
    expect(tabs[0].textContent).toBe("Dashboard");
    expect(tabs[1].textContent).toBe("Study Lounge");
    expect(tabs[2].textContent).toBe("Modules Info");
  });
});
