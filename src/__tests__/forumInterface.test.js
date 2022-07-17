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


jest.spyOn(console, "error").mockImplementation(() => {});
let component;
beforeEach(() => {
  component = render(
    <BrowserRouter>
      <AuthProvider>
        <ModuleMain />
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Forum interface renders all components", () => {
  it("Renders the vertical tabs", () => {
    const generalCategoryTab = component.getByTestId("GeneralCategory");
    const examsCategoryTab = component.getByTestId("ExamsCategory");
    const resourcesCategoryTab = component.getByTestId("ResourcesCategory");
    const offTopicCategoryTab = component.getByTestId("Off-topicCategory");

    expect(generalCategoryTab).toBeInTheDocument();
    expect(examsCategoryTab).toBeInTheDocument();
    expect(resourcesCategoryTab).toBeInTheDocument();
    expect(offTopicCategoryTab).toBeInTheDocument();
  });

  it("Renders the correct headers", () => {
    const moduleCodeHeader = component.getByTestId("moduleCodeHeader");
    expect(moduleCodeHeader).toBeInTheDocument();

    const forumHeader = component.getByTestId("forumHeader");
    expect(forumHeader.textContent).toBe("Discussion Forum");
  });

  it("Renders the NUSMODs link", () => {
    const nusmodsLink = component.getByRole("link");
  });
});
