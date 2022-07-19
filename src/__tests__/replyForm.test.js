import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Comment from "../components/ThreadPage/Comment";

let component;

const fakeComment = {
  body: "Test body",
  createdAt: "Test date",
  author: "Test author",
  postId: "foo",
  commentId: "bar",
  deleted: false,
  location: {
    moduleCode: "Test module",
    category: "General",
  },
};

const fakeUser = {
  username: "Test username",
  major: "Test major",
};

jest.mock("../utils/helper", () => {
  return {
    ...jest.requireActual("../utils/helper"),
    useProfile: (uid) => fakeUser,
    useEditRights: (uid) => true,
  };
});

jest.spyOn(console, "error").mockImplementation(() => {});
beforeEach(() => {
  component = render(
    <BrowserRouter>
      <AuthProvider>
        <Comment comment={fakeComment} />
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Renders reply form", () => {
  let replyIcon;
  beforeEach(() => {
    replyIcon = component.getByTestId("replyIcon");
  });

  it("Does not render reply form before click", () => {
    let textArea = component.queryByRole("textbox");
    let submitReplyBtn = component.queryByTestId("submitReplyBtn");
    let label = component.queryByTestId("label");

    expect(textArea).not.toBeInTheDocument();
    expect(submitReplyBtn).not.toBeInTheDocument();
    expect(label).not.toBeInTheDocument();
  });

  it("Renders reply form after click", () => {
    fireEvent.click(replyIcon);

    let textArea = component.queryByRole("textbox");
    let submitReplyBtn = component.queryByTestId("submitReplyBtn");
    let label = component.queryByTestId("label");

    expect(textArea).toBeInTheDocument();
    expect(submitReplyBtn).toBeInTheDocument();
    expect(label.textContent).toBe("Replying to Test username: ");
  });

  it("Reply textarea responds to input", () => {
    fireEvent.click(replyIcon);
    let textArea = component.queryByRole("textbox");
    expect(textArea).toBeInTheDocument();

    fireEvent.change(textArea, {
      target: {
        value: "Test body",
      },
    });

    expect(textArea.textContent).toBe("Test body");
  });
});
