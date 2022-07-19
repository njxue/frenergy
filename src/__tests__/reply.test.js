import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Reply from "../components/ThreadPage/Reply";

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

describe("Renders reply", () => {
  let component;

  const fakeReply = {
    body: "Test body",
    createdAt: "Test date",
    author: "Test author",
    postId: "foo",
    commentId: "bar",
    replyId: "baz",
    deleted: false,
  };

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <AuthProvider>
          <Reply reply={fakeReply} />
        </AuthProvider>
      </BrowserRouter>
    );
  });
  it("Renders all components of a reply content", () => {
    const author = component.getByTestId("author");
    const major = component.getByTestId("major");
    const createdAt = component.getByTestId("createdAt");
    const body = component.getByTestId("body");

    expect(author.textContent).toBe("Test username");
    expect(major.textContent).toBe("Test major");
    expect(createdAt.textContent).toBe("Test date");
    expect(body.textContent).toBe("Test body");
  });

  it("Renders edit menu if user is the author", () => {
    const editMenu = component.getByRole("button");
    expect(editMenu).toBeInTheDocument();

    const editOption = component.queryByTestId("editOption");
    const deleteOption = component.queryByTestId("deleteOption");

    expect(editOption.textContent).toBe("Edit");
    expect(deleteOption.textContent).toBe("Delete");
  });
});

describe("Renders deleted reply", () => {
  let component;

  const fakeReply = {
    body: "Test body",
    createdAt: "Test date",
    author: "Test author",
    postId: "foo",
    commentId: "bar",
    replyId: "baz",
    deleted: true,
  };

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <AuthProvider>
          <Reply reply={fakeReply} />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it("Renders deleted reply correctly", () => {
    const body = component.getByTestId("body");
    expect(body.textContent).toBe("This reply has been deleted");
  });

  it("Does not render edit menu", () => {
    const editMenu = component.queryByRole("button");
    expect(editMenu).not.toBeInTheDocument();
  });
});
