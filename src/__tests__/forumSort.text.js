import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import ModuleMain from "../components/ModulePage/ModuleMain";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Sort from "../components/layout/Sort";

jest.spyOn(console, "error").mockImplementation(() => {});

let component;
describe("All sort options are present", () => {
  beforeEach(() => {
    component = render(<Sort />);
  });
  it("Renders all sort options", () => {
    const ascOption = component.getByTestId("asc");
    expect(ascOption.textContent).toBe("Most Recent");

    const dscOption = component.getByTestId("dsc");
    expect(dscOption.textContent).toBe("Oldest");
  });
});
