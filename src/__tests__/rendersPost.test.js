import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/storage";
import "firebase/compat/database";
import React from "react";
import {
  render,
  screen,
  act,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import ThreadItem from "../components/CategoryPage/ThreadItem";
import { BrowserRouter } from "react-router-dom";

it("Renders post", () => {
  let mockPost = {
    moduleCode: "CS1101S",
    category: "General",
    title: "Test title",
    body: "Test body",
    postId: "foo",
    createdAt: "bar",
  };

  let snapshot = { val: () => mockPost };

  jest.spyOn(firebase, "database").mockImplementation(() => ({
    ref: jest.fn().mockReturnThis(),
    on: jest.fn((event, callback) => callback(snapshot)),
  }));

  jest.spyOn(React, "useEffect").mockImplementation(() => {
    return "foo";
  });
 

  let component = render(
    <BrowserRouter>
      <ThreadItem postId="foo" />
    </BrowserRouter>
  );

  //let title = component.getByTestId("title");
});
