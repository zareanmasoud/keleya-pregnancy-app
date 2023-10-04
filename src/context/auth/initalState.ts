export interface AuthState {
  loginUsername: string;
  loginPassword: string;
  signUpUsername: string;
  signUpPassword: string;
  privacyPolicyCheck: boolean;
  termsAndConditionsCheck: boolean;
}

const authInitialState: AuthState = {
  loginUsername: "",
  loginPassword: "",
  signUpUsername: "",
  signUpPassword: "",
  privacyPolicyCheck: false,
  termsAndConditionsCheck: false,
};

export { authInitialState };
