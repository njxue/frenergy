import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../components/Dashboard";
import NoticeFilter from "../components/NoticeBoard/NoticeFilter";

let component;

beforeEach(() => {
  component = render(<NoticeFilter module="foo" setModule={() => {}} />);
});

describe("Renders filter radios", () => {
  let showAllRadio, filterByModuleRadio;
  beforeEach(() => {
    const radios = component.queryAllByRole("radio");
    showAllRadio = radios[0];
    filterByModuleRadio = radios[1];
  });
  it("Renders the two filter radios", () => {
    expect(showAllRadio).toBeInTheDocument();
    expect(filterByModuleRadio).toBeInTheDocument();
    expect(showAllRadio).toBeChecked();
    expect(filterByModuleRadio).not.toBeChecked();
  });

  it("Does not show the module dropdown if show all radio is active", () => {
    fireEvent.click(showAllRadio);
    const moduleDropdown = component.queryByRole("combobox");
    expect(moduleDropdown).not.toBeInTheDocument();
  });

  it("Shows the module dropdown if module filter radio is active", () => {
    fireEvent.click(filterByModuleRadio);
    const moduleDropdown = component.queryByRole("combobox");
    expect(moduleDropdown).toBeInTheDocument();
  });
});
