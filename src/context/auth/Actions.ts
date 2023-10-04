import { AuthActionTypes } from "./ActionTypes";
import { AuthState, authInitialState } from "./initalState";
import { AuthPayload } from "./Reducer";

interface Action<T, P> {
  readonly type: T;
  readonly payload: P;
}

export const setLoginUsername = (
  username: string
): Action<AuthActionTypes.SetLoginUsername, AuthPayload[AuthActionTypes.SetLoginUsername]> => ({
  type: AuthActionTypes.SetLoginUsername,
  payload: { loginUsername: username },
});

export const setLoginPassword = (
  password: string
): Action<AuthActionTypes.SetLoginPassword, AuthPayload[AuthActionTypes.SetLoginPassword]> => ({
  type: AuthActionTypes.SetLoginPassword,
  payload: { loginPassword: password },
});

export const setSignUpUsername = (
  username: string
): Action<AuthActionTypes.SetSignUpUsername, AuthPayload[AuthActionTypes.SetSignUpUsername]> => ({
  type: AuthActionTypes.SetSignUpUsername,
  payload: { signUpUsername: username },
});

export const setSignUpPassword = (
  password: string
): Action<AuthActionTypes.SetSignUpPassword, AuthPayload[AuthActionTypes.SetSignUpPassword]> => ({
  type: AuthActionTypes.SetSignUpPassword,
  payload: { signUpPassword: password },
});

export const setPrivacyPolicyCheck = (
  checked: boolean
): Action<AuthActionTypes.SetPrivacyPolicyCheck, AuthPayload[AuthActionTypes.SetPrivacyPolicyCheck]> => ({
  type: AuthActionTypes.SetPrivacyPolicyCheck,
  payload: { privacyPolicyCheck: checked },
});

export const setTermsAndConditionsCheck = (
  checked: boolean
): Action<AuthActionTypes.SetTermsAndConditionsCheck, AuthPayload[AuthActionTypes.SetTermsAndConditionsCheck]> => ({
  type: AuthActionTypes.SetTermsAndConditionsCheck,
  payload: { termsAndConditionsCheck: checked },
});

export const setAuth = (payload: AuthState): Action<AuthActionTypes.SetAuth, AuthPayload[AuthActionTypes.SetAuth]> => ({
  type: AuthActionTypes.SetAuth,
  payload,
});

export const resetAuth = (): Action<AuthActionTypes.ResetAuth, AuthPayload[AuthActionTypes.ResetAuth]> => ({
  type: AuthActionTypes.ResetAuth,
  payload: authInitialState,
});
