import { execSync } from "child_process";
import { device } from "detox";

async function setDemoMode() {
  if (device.getPlatform() === "ios") {
    await device.setStatusBar({
      time: "12:34",
      dataNetwork: "wifi",
      wifiBars: "3",
      batteryState: "charging",
      batteryLevel: "100",
    });
  } else {
    execSync("adb shell settings put global sysui_demo_allowed 1");
    execSync("adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200");
    execSync(
      "adb shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false"
    );
    execSync("adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false");
    execSync("adb shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100");
  }
}

export { setDemoMode };
