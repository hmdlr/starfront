import { Paths } from "../paths";

const initialState = {
  code: '',
  publicHalf: ''
};

export const SecretAction = {

} as const;

export const secretReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SecretAction.SET:
      return {
        ...state,
        code: action.payload.code,
        publicHalf: action.payload.code.slice(0, action.payload.code.length / 2)
      };
    default:
      return state;
  }
};
