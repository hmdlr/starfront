const initialState = {
}

export const invokerReducer = (
  state = initialState,
  action: { type: string; payload: any; }
) => {
  if (action.type.startsWith('INVOKER_RESULT')) {
    return {
      ...state,
      [action.type.split('/').slice(1).join('/')]: action.payload
    }
  }
  return state;
}
