const initialState = {
}

export const invokerReducer = (
  state = initialState,
  action: { type: string; payload: any; }
) => {
  // catch any action that begins with 'INVOKER_RESULT'
  if (action.type.startsWith('INVOKER_RESULT')) {
    // return the payload
    return action.payload
  }
}
