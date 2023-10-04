import { RootState } from "../index";

export const selectUser = (state: RootState) => state.user;
export const selectUserIsLoggedIn = (state: RootState) => state.user.isLoggedIn;
export const selectUserName = (state: RootState) => state.user.name;
export const selectUserDueDate = (state: RootState) => state.user.dueDate;
export const selectUserWorkoutFrequency = (state: RootState) => state.user.workoutFrequency;
