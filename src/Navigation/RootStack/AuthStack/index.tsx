import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { Route } from "../../Route";
import LoginScreen from "./LoginScreen";
import InitialScreen from "./InitialScreen";
import SignUpScreen from "./SignUpScreen";
import { AuthContextProvider } from "../../../context/auth/Provider";

export type AuthStackParamList = {
  [Route.InitialScreen]: object | undefined;
  [Route.LoginScreen]: object | undefined;
  [Route.SignUpScreen]: object | undefined;
};

export type AuthStackNavigation = NavigationProp<AuthStackParamList>;

export type AuthStackRouteProps<RouteName extends keyof AuthStackParamList> = RouteProp<AuthStackParamList, RouteName>;

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStack() {
  return (
    <AuthContextProvider>
      <Stack.Navigator
        initialRouteName={Route.InitialScreen}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name={Route.InitialScreen} component={InitialScreen} />
        <Stack.Screen name={Route.LoginScreen} component={LoginScreen} />
        <Stack.Screen name={Route.SignUpScreen} component={SignUpScreen} />
      </Stack.Navigator>
    </AuthContextProvider>
  );
}

export default AuthStack;
