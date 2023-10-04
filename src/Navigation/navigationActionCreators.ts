import { StackActions } from "@react-navigation/native";
import { Route } from "./Route";
import { RootStackParamList } from "./RootStack";
import { AuthStackParamList } from "./RootStack/AuthStack";
import { SetPlanStackParamList } from "./RootStack/SetPlanStack";

export function successScreenPushAction(params: RootStackParamList[Route.SuccessScreen] = {}) {
  return StackActions.push(Route.SuccessScreen, params);
}

export function authStackPushAction(params: RootStackParamList[Route.AuthStack] = {}) {
  return StackActions.push(Route.AuthStack, params);
}

export function loginScreenPushAction(params: AuthStackParamList[Route.LoginScreen] = {}) {
  return StackActions.push(Route.LoginScreen, params);
}

export function signUpScreenPushAction(params: AuthStackParamList[Route.SignUpScreen] = {}) {
  return StackActions.push(Route.SignUpScreen, params);
}

export function setPlanStackPushAction(params: RootStackParamList[Route.SetPlanStack] = {}) {
  return StackActions.push(Route.SetPlanStack, params);
}

export function dateScreenPushAction(params: SetPlanStackParamList[Route.DateScreen] = {}) {
  return StackActions.push(Route.DateScreen, params);
}

export function workoutScreenPushAction(params: SetPlanStackParamList[Route.WorkoutScreen] = {}) {
  return StackActions.push(Route.WorkoutScreen, params);
}
