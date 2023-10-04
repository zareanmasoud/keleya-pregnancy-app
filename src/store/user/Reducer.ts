import { UserActionTypes } from "./ActionTypes";
import { userInitialState, UserState } from "./initalState";
import { ActionMap } from "../../types/ActionMap";

export type UserPayload = {
  [UserActionTypes.SetIsLoggedIn]: {
    isLoggedIn: boolean;
  };
  [UserActionTypes.SetName]: {
    name: string;
  };
  [UserActionTypes.SetDueDate]: {
    dueDate: string;
  };
  [UserActionTypes.SetWorkoutFrequency]: {
    workoutFrequency: number;
  };
  [UserActionTypes.SetUser]: UserState;
  [UserActionTypes.ResetUser]: UserState;
};

export type UserActions = ActionMap<UserPayload>[keyof ActionMap<UserPayload>];
export function userReducer(state: UserState = userInitialState, { type, payload }: UserActions): UserState {
  switch (type) {
    case UserActionTypes.SetIsLoggedIn: {
      return {
        ...state,
        isLoggedIn: payload.isLoggedIn,
      };
    }
    case UserActionTypes.SetName: {
      return {
        ...state,
        name: payload.name,
      };
    }
    case UserActionTypes.SetDueDate: {
      return {
        ...state,
        dueDate: payload.dueDate,
      };
    }
    case UserActionTypes.SetWorkoutFrequency: {
      return {
        ...state,
        workoutFrequency: payload.workoutFrequency,
      };
    }
    case UserActionTypes.SetUser: {
      return {
        ...payload,
      };
    }
    case UserActionTypes.ResetUser: {
      return {
        ...userInitialState,
      };
    }
    default:
      return state;
  }
}
