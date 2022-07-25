import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import CategoryMain from "../components/CategoryPage/CategoryMain";
import LoginForm from "../components/Login/LoginForm";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
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
import PostForm from "../components/CategoryPage/PostForm";
import { Button } from "@chakra-ui/react";

jest.spyOn(console, "error").mockImplementation(() => {});

describe("Post creation works", () => {
  it("Clicking on create post button opens the modal", async () => {
    let component = render(
      <BrowserRouter>
        <AuthProvider>
          <PostForm />
          <CategoryMain category="General" />
        </AuthProvider>
      </BrowserRouter>
    );
    const newPostBtn = component.getByTestId("newPostBtn");
    await waitFor(() => fireEvent.click(newPostBtn));
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
