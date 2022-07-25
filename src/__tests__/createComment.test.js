import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import CommentForm from "../components/ThreadPage/CommentForm";

const fakePost = {
  title: "Test title",
  body: "Test body",
  createdAt: "Test date",
  author: "Test author",
  postId: "foo",
};
jest.spyOn(console, "error").mockImplementation(() => {});

let component;
beforeEach(() => {
  component = render(
    <BrowserRouter>
      <AuthProvider>
        <CommentForm post={fakePost} />
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Comment form renders", () => {
  let label, textArea, submitBtn;
  beforeEach(() => {
    label = component.getByTestId("label");
    textArea = component.getByRole("textbox");
    submitBtn = component.getByRole("button");
  });

  it("Renders comment form", () => {
    expect(label.textContent).toBe("Add comment*");
    expect(textArea).toBeInTheDocument();
    expect(submitBtn.textContent).toBe("Submit");
  });

  it("Typing in textarea works", async () => {
    fireEvent.change(textArea, {
      target: {
        value: "Test comment",
      },
    });

    waitFor(() => expect(textArea.textContent).toBe("Test comment"));
  });
});
