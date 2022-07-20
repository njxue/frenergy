import { BrowserRouter } from "react-router-dom";
import AuthProvider, { useAuth } from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Dashboard from "../components/Dashboard";
import ModulesList from "../components/Dashboard/ModulesList";
import PinButton from "../components/ThreadPage/PinButton";
import { usePin } from "../utils/helper";

let component;
var mockIsPinned = false;

jest.mock("../utils/helper", () => {
  return {
    ...jest.requireActual("../utils/helper"),
    usePin: (id) => {
      return {
        isPinned: mockIsPinned,
        togglePin: () => {
          mockIsPinned = !mockIsPinned;
        },
      };
    },
  };
});

beforeEach(() => {
  component = render(<PinButton postId="foo" />);
});

describe("Changes pin state on click", () => {
  let pinBtn;
  beforeEach(() => {
    pinBtn = component.getByTestId("pin");
  });

  it("Set pinned on click", () => {
    fireEvent.click(pinBtn);
    expect(mockIsPinned).toBe(true);
  });

  it("Set unpinned on click", () => {
    mockIsPinned = true;
    fireEvent.click(pinBtn);
    expect(mockIsPinned).toBe(false);
  });
});
