import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import CategoryMain from "../components/CategoryPage";
import LoginForm from "../components/Login/LoginForm";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ModuleMain from "../components/ModulePage/ModuleMain";
import CreateNewModal from "../components/CategoryPage/CreateNewModal";


let component;
beforeEach(async () => {
  component = render(
    <BrowserRouter>
      <AuthProvider>
        <CreateNewModal />
        <CategoryMain category="General" />
      </AuthProvider>
    </BrowserRouter>
  );
});

afterEach(() => cleanup());

describe("Post creation works", () => {
  let newPostBtn;
  beforeEach(async () => {
    newPostBtn = component.getByTestId("newPostBtn");
    await waitFor(() => fireEvent.click(newPostBtn));
  });
  afterEach(() => cleanup());
  it("Clicking on create post button opens the modal", () => {
    const modal = component.queryByTestId("modal");
    const titleInput = component.queryByTestId("titleInput");
    const bodyInput = component.queryByTestId("bodyInput");
    const submitBtn = component.queryByTestId("submitBtn");

    expect(modal).toBeInTheDocument();
    expect(titleInput).toBeInTheDocument();
    expect(bodyInput).toBeInTheDocument();
    expect(submitBtn).toBeInTheDocument();
  });

});
  