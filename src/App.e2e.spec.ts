import { device } from "detox";
// eslint-disable-next-line import/no-extraneous-dependencies
import { it, describe, beforeAll, beforeEach } from "@jest/globals";
import { elementById, expectElementByIdToBeVisible } from "../e2e/helpers";
import { testIDs } from "./resources/testIDs";
import { imageSnapshotExpect } from "../e2e/imageSnapshotExpect";
import { setDemoMode } from "../e2e/setDemoMode";
import store, { persistor } from "./store";
import { resetUser } from "./store/user/Actions";

describe("App", () => {
  beforeAll(async () => {
    await device.launchApp();
  });

  // beforeEach(async () => {
  //   await device.reloadReactNative();
  // });

  afterAll(async () => {
    store.dispatch(resetUser());
    await persistor.flush();
  });

  it("should display initial screen", async () => {
    await expectElementByIdToBeVisible(testIDs.initial.id);
  });

  it("should match image snapshot for initial screen", async () => {
    await setDemoMode();
    // @ts-ignore
    await imageSnapshotExpect("Initial Screen").toMatchImageSnapshot();
  });

  it("should display login screen", async () => {
    await elementById(testIDs.initial.loginButton.id).tap();
    await expectElementByIdToBeVisible(testIDs.login.id);
  });

  it("should match image snapshot for login screen", async () => {
    await setDemoMode();
    // @ts-ignore
    await imageSnapshotExpect("Login Screen").toMatchImageSnapshot();
  });

  it("should display sign up screen", async () => {
    await elementById(testIDs.header.backButton.id).tap();
    await elementById(testIDs.initial.ctaButton.id).tap();
    await expectElementByIdToBeVisible(testIDs.signUp.id);
  });

  it("should match image snapshot for sign up screen", async () => {
    await setDemoMode();
    // @ts-ignore
    await imageSnapshotExpect("Sign up Screen").toMatchImageSnapshot();
  });

  it("should display name screen", async () => {
    await elementById(testIDs.signUp.usernameInput.id).typeText("someone@somewhere.com");
    await elementById(testIDs.signUp.passwordInput.id).typeText("ABabcd1234");
    await elementById(testIDs.signUp.privacyPolicyCheck.id).tap();
    await elementById(testIDs.signUp.termsAndConditionsCheck.id).tap();
    await elementById(testIDs.signUp.ctaButton.id).tap();
    await expectElementByIdToBeVisible(testIDs.name.id);
  });

  it("should match image snapshot for name screen", async () => {
    await setDemoMode();
    // @ts-ignore
    await imageSnapshotExpect("Name Screen").toMatchImageSnapshot();
  });

  it("should display date screen", async () => {
    await elementById(testIDs.name.nameInput.id).typeText("kate");
    await elementById(testIDs.name.ctaButton.id).tap();
    await expectElementByIdToBeVisible(testIDs.date.id);
  });

  it("should display workout screen", async () => {
    const datePicker = elementById(testIDs.date.datePicker.id);
    const newDate = new Date();
    const nextMonth = newDate.setMonth(newDate.getMonth() + 1);
    await datePicker.setDatePickerDate(new Date(nextMonth).toISOString(), "ISO8601");
    await elementById(testIDs.date.ctaButton.id).tap();
    await expectElementByIdToBeVisible(testIDs.workout.id);
  });

  it("should match image snapshot for workout screen", async () => {
    await setDemoMode();
    // @ts-ignore
    await imageSnapshotExpect("Workout Screen").toMatchImageSnapshot();
  });

  it("should match image snapshot for success screen", async () => {
    await setDemoMode();
    // @ts-ignore
    await imageSnapshotExpect("Success Screen").toMatchImageSnapshot();
  });
});
