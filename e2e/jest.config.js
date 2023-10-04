/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  rootDir: "..",
  testMatch: ["**/?(*.)e2e.?(*.)+(spec|test).[tj]s?(x)"],
  testTimeout: 120000,
  maxWorkers: 1,
  globalSetup: "detox/runners/jest/globalSetup",
  globalTeardown: "detox/runners/jest/globalTeardown",
  reporters: ["detox/runners/jest/reporter"],
  testEnvironment: "detox/runners/jest/testEnvironment",
  verbose: true,
};
