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
import Filter from "../components/CategoryPage/Filter";

jest.spyOn(console, "error").mockImplementation(() => {});

let component;
describe("All filter options are present", () => {
  beforeEach(() => {
    component = render(<Filter />);
  });
  it("Renders all filter options", () => {
    const todayOption = component.getByTestId("today");
    expect(todayOption.textContent).toBe("Today");

    const weekOption = component.getByTestId("week");
    expect(weekOption.textContent).toBe("This Week");

    const monthOption = component.getByTestId("month");
    expect(monthOption.textContent).toBe("This Month");

    const allOption = component.getByTestId("all");
    expect(allOption.textContent).toBe("All");
  });
});
