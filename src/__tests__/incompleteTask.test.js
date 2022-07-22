import { BrowserRouter } from "react-router-dom";
import AuthProvider from "../contexts/AuthContext";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import TaskItem from "../components/Groups/TaskItem";
import { Table } from "@chakra-ui/react";
import { formatDate } from "../utils/helper";

jest.spyOn(console, "error").mockImplementation(() => {});
const fakeTask = {
  name: "Test name",
  taskId: "foo",
  projectId: "bar",
  deadline: new Date(),
  assignees: {
    member1: "foo",
    member2: "bar",
  },
};

const fakeUser = {
  username: "Test user",
  photoURL: "Test photo",
};

jest.mock("../contexts/AuthContext", () => {
  return {
    __esModule: true,
    default: (props) => {
      return <div>{props.children}</div>;
    },
    useAuth: () => {
      return {
        currUser: {
          uid: "foo",
        },
      };
    },
  };
});

jest.mock("../utils/helper", () => ({
  ...jest.requireActual("../utils/helper"),
  formatDate: (date) => "Test date",
  useProfile: (uid) => fakeUser,
}));

let component;
beforeEach(() => {
  component = render(
    <Table>
      <TaskItem completed={false} task={fakeTask} />
    </Table>
  );
});

describe("Renders task", () => {
  let taskContents, taskName, deadline, assignees;

  beforeEach(() => {
    taskContents = component.getAllByRole("gridcell");
  });
  it("Renders task name and deadline", () => {
    expect(taskContents.length).toBe(4);

    taskName = taskContents[0];
    expect(taskName.textContent).toBe("Test name");

    deadline = taskContents[2];
    expect(deadline.textContent).toBe("Test date");
  });

  it("Renders the assignees", () => {
    assignees = taskContents[1];
    const avatars = component.getAllByRole("img");
    expect(avatars.length).toBe(2);
  });
});

describe("Accept task button works", () => {
  let taskBtn;
  beforeEach(() => {
    taskBtn = component.queryByTestId("taskBtn");
  });

  it("Renders accept task button, which is it's initial state", () => {
    expect(taskBtn.textContent).toBe("I'll do it!");
  });

  it("Toggles button on click", () => {
    fireEvent.click(taskBtn);
    expect(taskBtn.textContent).toBe("Retract");

    fireEvent.click(taskBtn);
    expect(taskBtn.textContent).toBe("I'll do it!");
  });
});
