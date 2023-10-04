import { AuthActionTypes } from "./ActionTypes";
import { AuthState, authInitialState } from "./initalState";
import { ActionMap } from "../../types/ActionMap";

export type AuthPayload = {
  [AuthActionTypes.SetLoginUsername]: {
    loginUsername: string;
  };
  [AuthActionTypes.SetLoginPassword]: {
    loginPassword: string;
  };
  [AuthActionTypes.SetSignUpUsername]: {
    signUpUsername: string;
  };
  [AuthActionTypes.SetSignUpPassword]: {
    signUpPassword: string;
  };
  [AuthActionTypes.SetPrivacyPolicyCheck]: {
    privacyPolicyCheck: boolean;
  };
  [AuthActionTypes.SetTermsAndConditionsCheck]: {
    termsAndConditionsCheck: boolean;
  };
  [AuthActionTypes.SetAuth]: AuthState;
  [AuthActionTypes.ResetAuth]: AuthState;
};

export type AuthActions = ActionMap<AuthPayload>[keyof ActionMap<AuthPayload>];

export function authReducer(state: AuthState = authInitialState, { type, payload }: AuthActions) {
  switch (type) {
    case AuthActionTypes.SetLoginUsername: {
      return {
        ...state,
        loginUsername: payload.loginUsername,
      };
    }
    case AuthActionTypes.SetLoginPassword: {
      return {
        ...state,
        loginPassword: payload.loginPassword,
      };
    }
    case AuthActionTypes.SetSignUpUsername: {
      return {
        ...state,
        signUpUsername: payload.signUpUsername,
      };
    }
    case AuthActionTypes.SetSignUpPassword: {
      return {
        ...state,
        signUpPassword: payload.signUpPassword,
      };
    }
    case AuthActionTypes.SetPrivacyPolicyCheck: {
      return {
        ...state,
        privacyPolicyCheck: payload.privacyPolicyCheck,
      };
    }
    case AuthActionTypes.SetTermsAndConditionsCheck: {
      return {
        ...state,
        termsAndConditionsCheck: payload.termsAndConditionsCheck,
      };
    }
    case AuthActionTypes.SetAuth: {
      return {
        ...payload,
      };
    }
    case AuthActionTypes.ResetAuth: {
      return {
        ...authInitialState,
      };
    }
    default: {
      throw new Error(`Unhandled action type: ${type}`);
    }
  }
}
