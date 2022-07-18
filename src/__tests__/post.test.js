import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Post from "../components/ThreadPage/Post";

let component;
const fakeUser = {
  username: "Test username",
  major: "Test major",
};

const fakePost = {
  title: "Test title",
  body: "Test body",
  createdAt: "Test date",
  author: "Test author",
  postId: "foo",
};
jest.spyOn(console, "error").mockImplementation(() => {});

jest.mock("../utils/helper", () => {
  return {
    ...jest.requireActual("../utils/helper"),
    useProfile: (uid) => fakeUser,
    usePin: (postId) => ({
      isPinned: false,
      togglePin: jest.fn(),
    }),
  };
});
const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  component = render(
    <BrowserRouter>
      <AuthProvider>
        <Post post={fakePost} />
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Post details render", () => {
  it("Renders post title and body correctly", () => {
    const title = component.getByTestId("title");
    const body = component.getByTestId("body");

    expect(title.textContent).toBe("Test title");
    expect(body.textContent).toBe("Test body");
  });

  it("Renders author's name, photo and major correctly", () => {
    const author = component.getByTestId("author");
    const major = component.getByTestId("major");
    const photo = component.getByTestId("photo");

    expect(author.textContent).toBe("Test username");
    expect(major.textContent).toBe("Test major");
    expect(photo).toBeInTheDocument();

    fireEvent.click(photo);
    expect(mockedNavigate).toBeCalledWith("/users/Test username");
  });

  it("Renders date correctly", () => {
    const date = component.getByTestId("createdAt");
    expect(date.textContent).toBe("Test date");
  });

  it("Renders the pin icon", () => {
    const pin = component.getByTestId("pin");
    expect(pin).toBeInTheDocument();
  });
});
