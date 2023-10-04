import mockLocalize from "react-native-localize/mock";

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native");
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: jest.fn(),
      dispatch: jest.fn(),
    }),
  };
});

jest.mock("@react-native-async-storage/async-storage", () =>
  require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("react-native-vector-icons/FontAwesome6", () => "FontAwesome6");

jest.mock("react-native-date-picker", () => {});

jest.mock("react-native-localize", () => mockLocalize);
