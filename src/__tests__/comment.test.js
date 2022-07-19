import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Comment from "../components/ThreadPage/Comment";

jest.spyOn(console, "error").mockImplementation(() => {});
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

/**
const mockedUpdate = jest.fn().mockImplementation(() => {});
jest.mock("firebase/compat/database", () => {
  return {
    ...jest.requireActual("firebase/compat/database"),
    ref: jest.fn().mockReturnValue({
      child: jest.fn().mockReturnThis(),
      update: jest.fn(() => mockedUpdate()),
    }),
  };
});
 */

describe("Renders comment", () => {
  let component;
  const fakeComment = {
    body: "Test body",
    createdAt: "Test date",
    author: "Test author",
    postId: "foo",
    commentId: "bar",
    deleted: false,
  };
  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <AuthProvider>
          <Comment comment={fakeComment} />
        </AuthProvider>
      </BrowserRouter>
    );
  });
  it("Renders all components of a comment content", () => {
    const author = component.getByTestId("author");
    const major = component.getByTestId("major");
    const createdAt = component.getByTestId("createdAt");
    const body = component.getByTestId("body");
    const replyIcon = component.getByTestId("replyIcon");

    expect(author.textContent).toBe("Test username");
    expect(major.textContent).toBe("Test major");
    expect(createdAt.textContent).toBe("Test date");
    expect(body.textContent).toBe("Test body");
    expect(replyIcon).toBeInTheDocument();
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

describe("Renders deleted comment", () => {
  let component;
  const fakeComment = {
    body: "Test body",
    createdAt: "Test date",
    author: "Test author",
    postId: "foo",
    commentId: "bar",
    deleted: true,
  };

  beforeEach(() => {
    component = render(
      <BrowserRouter>
        <AuthProvider>
          <Comment comment={fakeComment} />
        </AuthProvider>
      </BrowserRouter>
    );
  });

  it("Renders deleted comment correctly", () => {
    const body = component.getByTestId("body");
    expect(body.textContent).toBe("This comment has been deleted");
  });

  it("Does not render edit menu", () => {
    const editMenu = component.queryByRole("button");
    expect(editMenu).not.toBeInTheDocument();
  });
});

/** 
describe("Deleting comments work", () => {
  it("Clicking on delete renders confirmation modal", () => {
    const deleteOption = component.queryByTestId("deleteOption");

    fireEvent.click(deleteOption);
    const confirmBtn = component.queryByTestId("confirmBtn");
    expect(confirmBtn).toBeInTheDocument();
    fireEvent.click(confirmBtn);

    expect(mockedUpdate).toHaveBeenCalled();
  });
});
*/
