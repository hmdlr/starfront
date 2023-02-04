import { Actions } from "../actions";

const initialState = {
  code: '',
  publicHalf: ''
};

export const secretReducer = (
    state = initialState,
    action: { type: string; payload: any; }
) => {
  switch (action.type) {
    case Actions.Secret.SET:
      return {
        ...state,
        code: action.payload.code,
        publicHalf: action.payload.code.slice(0, action.payload.code.length / 2)
      };
    default:
      return {
        ...state,
        publicHalf: state.code.slice(0, state.code.length / 2)
      }
  }
};
