import { configureToMatchImageSnapshot } from "jest-image-snapshot";
import fs from "fs";
import path from "path";
import kebabCase from "lodash.kebabcase";
import { device } from "detox";
import { expect } from "@jest/globals";

const toMatchImage = configureToMatchImageSnapshot({
  comparisonMethod: "ssim",
  failureThreshold: 0.002,
  failureThresholdType: "percent",
});

expect.extend({ toMatchImage });

expect.extend({
  async toMatchImageSnapshot(screenName) {
    const platform = await device.getPlatform();
    const deviceName = await device.name.split(" ").slice(1).join("");
    const deviceType = deviceName.replace(/[() ,]/g, "");

    const SNAPSHOTS_DIR = `__image_snapshots__/${platform}/${deviceType}`;

    const { testPath, currentTestName } = this;

    const customSnapshotsDir = path.join(path.dirname(testPath), SNAPSHOTS_DIR);
    const customSnapshotIdentifier = kebabCase(`${path.basename(testPath)}-${currentTestName}-${screenName}`);

    const tempPath = await device.takeScreenshot(screenName);
    const image = fs.readFileSync(tempPath);
    expect(image).toMatchImage({ customSnapshotIdentifier, customSnapshotsDir });

    return { pass: true };
  },
});

export const imageSnapshotExpect = expect;
