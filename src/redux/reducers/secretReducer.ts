const initialState = {
  code: '',
  publicHalf: ''
};

export enum SecretAction {
  SET = 'SET_SECRET',
  GENERATE = 'GENERATE_SECRET'
}

export const secretReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SecretAction.SET:
      return {
        ...state,
        code: action.payload.code,
        publicHalf: action.payload.code.slice(0, action.payload.code.length / 2)
      };
    case SecretAction.GENERATE:
      // notify the background script
      return {
        ...state,
        code: 'generating',
      }
    default:
      return state;
  }
};
