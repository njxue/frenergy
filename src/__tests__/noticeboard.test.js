import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../components/Dashboard";
import NoticeBoard from "../components/NoticeBoard";

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
        <NoticeBoard />
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Renders noticeboard layout components", () => {
  it("Renders the tabs", () => {
    const tabs = component.getAllByRole("tab");
    expect(tabs.length).toBe(3);
    expect(tabs[0].textContent).toBe("Public");
    expect(tabs[1].textContent).toBe("Invites");
    expect(tabs[2].textContent).toBe("My Lounges");
  });

  it("Renders the header", () => {
    const header = component.getByRole("heading");
    expect(header.textContent).toBe("Study Lounge");
  });

  it("Renders the description", () => {
    const description = component.getByTestId("description");
    expect(description.textContent).toBe(
      "Tired of doing assignments alone? Checkout the public tab to join available study lounges, or check out the invites  tab to check for any invitations!"
    );
  });

  it("Renders the create lounge button", () => {
    const btn = component.getByRole("button");
    expect(btn.textContent).toBe("Create");
  });
});

describe("Opens the modal on clicking on create button", () => {
  it("Opens modal", () => {
    const btn = component.getByRole("button");
    fireEvent.click(btn);
    const modal = component.queryByRole("dialog");
    expect(modal).toBeInTheDocument();
  });
});

describe("Notice form renders the correct form inputs and components", () => {
  let btn, modal;
  beforeEach(() => {
    btn = component.getByRole("button");
    fireEvent.click(btn);
    modal = component.getByRole("dialog");
  });

  it("Renders the close and submit button", () => {
    const buttons = component.getAllByRole("button");
    expect(buttons.length).toBe(2);
    expect(buttons[0].textContent).toBe("");
    expect(buttons[1].textContent).toBe("Create Study Lounge");
  });

  it("Renders all input fields", () => {
    const textInputs = component.getAllByRole("textbox");
    expect(textInputs.length).toBe(3);
    const moduleInput = component.queryByRole("combobox");
    expect(moduleInput).toBeInTheDocument();
    const visibilityToggle = component.queryByRole("checkbox");
    expect(visibilityToggle).toBeInTheDocument();
    const inviteUsers = component.getByTestId("inviteUsers");
    expect(inviteUsers).toBeInTheDocument();
  });
});
