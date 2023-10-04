/**
 * @format
 */

import "react-native";
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { it, expect } from "@jest/globals";
import renderer from "react-test-renderer";
import App from "./App";

const sleep = (ms: number) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(true), ms);
  });

it("renders correctly", async () => {
  const component = renderer.create(<App />);
  const tree = component.toJSON();
  expect(tree).toMatchSnapshot();
  await sleep(10);
});
