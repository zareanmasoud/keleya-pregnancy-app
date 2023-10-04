import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationProp, RouteProp } from "@react-navigation/native";
import { FormProvider } from "react-hook-form";
import { Route } from "../../Route";
import createCustomTheme from "../../../utils/createCustomTheme";
import NameScreen from "./NameScreen";
import DateScreen from "./DateScreen";
import WorkoutScreen from "./WorkoutScreen";
import { AuthContextProvider } from "../../../context/auth/Provider";
import { useCustomForm } from "../../../hooks/useCustomForm";

export type SetPlanStackParamList = {
  [Route.NameScreen]: object | undefined;
  [Route.DateScreen]: object | undefined;
  [Route.WorkoutScreen]: object | undefined;
};

export type SetPlanStackNavigation = NavigationProp<SetPlanStackParamList>;

export type SetPlanStackRouteProps<RouteName extends keyof SetPlanStackParamList> = RouteProp<
  SetPlanStackParamList,
  RouteName
>;

const Stack = createNativeStackNavigator<SetPlanStackParamList>();

const theme = createCustomTheme();

function SetPlanStack() {
  const methods = useCustomForm();
  return (
    <AuthContextProvider>
      <FormProvider {...methods}>
        <Stack.Navigator
          initialRouteName={Route.NameScreen}
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen
            name={Route.NameScreen}
            component={NameScreen}
            // options={{
            //   headerLeft: () => (
            //     <FontAwesome6
            //       name="arrow-left"
            //       onPress={() =>
            //         navigation.reset({
            //           index: 0,
            //           routes: [{ name: Route.SplashScreen }, AuthStackNavigation()],
            //         })
            //       }
            //       color={theme.colors.typography}
            //       size={theme.iconSize.m}
            //       style={styles.headerLeft}
            //     />
            //   ),
            // }}
          />
          <Stack.Screen name={Route.DateScreen} component={DateScreen} />
          <Stack.Screen name={Route.WorkoutScreen} component={WorkoutScreen} />
        </Stack.Navigator>
      </FormProvider>
    </AuthContextProvider>
  );
}

export default SetPlanStack;
