import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import RNRestart from "react-native-restart";
import RootStack from "./RootStack";
import LanguageUtils from "../resources/locales/LanguageUtils";

function Navigation() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    void (async () => {
      try {
        const deviceLanguage = await LanguageUtils.setAppLanguageFromDeviceLocale(true);
        const storedLanguage = await LanguageUtils.getAppLanguageFromDeviceStorage();
        if (storedLanguage !== undefined && storedLanguage !== deviceLanguage) {
          await LanguageUtils.setAppLanguageFromDeviceLocale();
          RNRestart.Restart();
        }
        await LanguageUtils.setAppLanguageFromDeviceStorage();
        setIsReady(true);
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  if (isReady)
    return (
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
    );
  return null;
}

export default Navigation;
