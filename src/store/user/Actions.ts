import { UserActionTypes } from "./ActionTypes";
import { userInitialState, UserState } from "./initalState";
import { UserPayload } from "./Reducer";

interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export const setIsLoggedIn = (
  isLoggedIn: boolean
): Action<UserActionTypes.SetIsLoggedIn, UserPayload[UserActionTypes.SetIsLoggedIn]> => ({
  type: UserActionTypes.SetIsLoggedIn,
  payload: {
    isLoggedIn,
  },
});

export const setName = (name: string): Action<UserActionTypes.SetName, UserPayload[UserActionTypes.SetName]> => ({
  type: UserActionTypes.SetName,
  payload: {
    name,
  },
});

export const setDueDate = (
  dueDate: string
): Action<UserActionTypes.SetDueDate, UserPayload[UserActionTypes.SetDueDate]> => ({
  type: UserActionTypes.SetDueDate,
  payload: {
    dueDate,
  },
});

export const setWorkoutFrequency = (
  workoutFrequency: number
): Action<UserActionTypes.SetWorkoutFrequency, UserPayload[UserActionTypes.SetWorkoutFrequency]> => ({
  type: UserActionTypes.SetWorkoutFrequency,
  payload: {
    workoutFrequency,
  },
});

export const setUser = (payload: UserState): Action<UserActionTypes.SetUser, UserPayload[UserActionTypes.SetUser]> => ({
  type: UserActionTypes.SetUser,
  payload,
});

export const resetUser = (): Action<UserActionTypes.ResetUser, UserPayload[UserActionTypes.ResetUser]> => ({
  type: UserActionTypes.ResetUser,
  payload: {
    ...userInitialState,
  },
});
