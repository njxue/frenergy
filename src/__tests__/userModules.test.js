import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../components/Dashboard";
import ModulesList from "../components/Dashboard/ModulesList";

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

const fakeModules = [
  { moduleCode: "FOO CODE", title: "FOO TITLE" },
  { moduleCode: "BAR CODE", title: "BAR TITLE" },
  { moduleCode: "BAZ CODE", title: "BAZ TITLE" },
];

jest.mock("../utils/helper", () => {
  return {
    ...jest.requireActual("../utils/helper"),
    useUserModules: (uid) => {
      return { modules: fakeModules };
    },
  };
});

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  component = render(
    <BrowserRouter>
      <AuthProvider>
        <ModulesList />
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Renders users' modules", () => {
  it("Renders the header", () => {
    const header = component.getByTestId("header");
    expect(header.textContent).toBe("MY MODULES");
  });

  it("Renders the individual modules", () => {
    const moduleCodes = component.getAllByTestId("moduleCode");
    const moduleTitles = component.getAllByTestId("moduleTitle");
    expect(moduleCodes.length).toBe(3);
    expect(moduleTitles.length).toBe(3);

    expect(moduleCodes[0].textContent).toBe("FOO CODE");
    expect(moduleTitles[0].textContent).toBe("FOO TITLE");

    expect(moduleCodes[1].textContent).toBe("BAR CODE");
    expect(moduleTitles[1].textContent).toBe("BAR TITLE");

    expect(moduleCodes[2].textContent).toBe("BAZ CODE");
    expect(moduleTitles[2].textContent).toBe("BAZ TITLE");
  });
});

describe("Test navigation", () => {
  it("Navigates to correct forum on click", () => {
    const moduleItems = component.getAllByTestId("moduleItem");
    fireEvent.click(moduleItems[0]);
    expect(mockedNavigate).toHaveBeenCalledWith("/FOO CODE");
    fireEvent.click(moduleItems[1]);
    expect(mockedNavigate).toHaveBeenCalledWith("/BAR CODE");
    fireEvent.click(moduleItems[2]);
    expect(mockedNavigate).toHaveBeenCalledWith("/BAZ CODE");
  });
});
