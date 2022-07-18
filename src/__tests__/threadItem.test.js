import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ThreadDetails from "../components/CategoryPage/ThreadDetails";

let component;
jest.spyOn(console, "error").mockImplementation(() => {});

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockedNavigate,
}));

beforeEach(() => {
  const fakePost = {
    moduleCode: "TEST1101",
    category: "General",
    title: "Test title",
    body: "Test body",
    postId: "foo",
    createdAt: "Test date",
  };

  component = render(
    <BrowserRouter>
      <AuthProvider>
        <ThreadDetails post={fakePost} />
      </AuthProvider>
    </BrowserRouter>
  );
});

describe("Thread item renders correctly", () => {
  it("Renders thread details", () => {
    const title = component.getByTestId("title");
    const body = component.getByTestId("body");
    const createdAt = component.getByTestId("createdAt");

    expect(title.textContent).toBe("Test title");
    expect(body.textContent).toBe("Test body");
    expect(createdAt.textContent).toBe("Test date");
  });

  it("Navigates to correct thread on click", async () => {
    const container = component.getByTestId("container");
    fireEvent.click(container);

    expect(mockedNavigate).toHaveBeenCalledWith("/TEST1101/General/foo");
  });
});
