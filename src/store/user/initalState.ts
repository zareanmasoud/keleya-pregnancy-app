export interface UserState {
  isLoggedIn: boolean;
  name: string;
  dueDate: string;
  workoutFrequency: number;
}

export const userInitialState: UserState = {
  isLoggedIn: false,
  name: "",
  dueDate: "",
  workoutFrequency: 3,
};
