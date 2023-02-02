/**
 * Wraps a reducer to allow for hydration.
 * Hydration is the process of restoring the state of the application
 * from a serialized state.
 * @param reducer
 */
export const withHydration = <T extends (
  state: ReturnType<T>,
  action: any
) => any>(reducer: T) => (
  state: ReturnType<T>,
  action: any
) => {
  if (action.type === 'HYDRATE') {
    return {
      ...state,
      ...action.payload
    };
  }
  return reducer(state, action);
}
