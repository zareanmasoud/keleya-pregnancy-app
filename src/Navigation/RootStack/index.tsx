import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp } from "@react-navigation/native";
import { Route } from "../Route";
import SplashScreen from "./SplashScreen";
import SuccessScreen from "./SuccessScreen";
import AuthStack from "./AuthStack";
import SetPlanStack from "./SetPlanStack";

export type RootStackParamList = {
  [Route.SplashScreen]: object | undefined;
  [Route.SuccessScreen]: object | undefined;
  [Route.AuthStack]: object | undefined;
  [Route.SetPlanStack]: object | undefined;
};

export type RootStackNavigation = NavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootStack() {
  return (
    <Stack.Navigator
      initialRouteName={Route.SplashScreen}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={Route.SplashScreen} component={SplashScreen} />
      <Stack.Screen name={Route.SuccessScreen} component={SuccessScreen} />
      <Stack.Screen name={Route.AuthStack} component={AuthStack} />
      <Stack.Screen name={Route.SetPlanStack} component={SetPlanStack} />
    </Stack.Navigator>
  );
}

export default RootStack;
