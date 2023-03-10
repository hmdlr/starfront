import { Actions } from "../actions";

interface AuthState {
  jwt: string | undefined,
  username: string | undefined,
}

const initialState: AuthState = {
  jwt: undefined,
  username: undefined,
}

export const authReducer = (
  state = initialState,
  action: { type: string; payload: any; }
) => {
  switch (action.type) {
    case Actions.Auth.SET_JWT:
      return {
        ...state,
        jwt: action.payload.jwt,
        username: action.payload.username,
      };
    default:
      return state;
  }
}
