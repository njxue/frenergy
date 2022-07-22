import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import AddProject from "../components/Groups/AddProject";

let component;
beforeEach(() => {
  component = render(<AddProject />);
});

describe("Renders the add project button", () => {
  it("Renders the add project button", () => {
    const btn = component.getByRole("button");
    expect(btn.textContent).toBe("Add Project");
  });

  it("Renders the form on button click", () => {
    const btn = component.getByRole("button");
    fireEvent.click(btn);

    const popOverForm = component.queryByTestId("popover");
    expect(popOverForm).toBeInTheDocument();

    const addBtn = component.queryByTestId("addBtn");
    const inputField = component.queryByTestId("input");
    const header = component.queryByTestId("header");

    expect(header).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    expect(addBtn.textContent).toBe("Add");
  });

});
