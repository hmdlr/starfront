import { Paths } from "../../redux/paths";
import { storageCleanupTTL, storageRetrieve } from "../../persistence/chromeStorage";

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
  if (action.type === `${reducer.name}/HYDRATE`) {
    return reducer(
        {
          ...state,
          ...action.payload
        },
        action
    );
  }
  return reducer(state, action);
};

export const hydrateStore = async <T extends {
  dispatch: (action: any) => void;
}>(store: T) => {
  const hydrationState: Record<string, any> = {};

  await storageCleanupTTL();
  const storage = await storageRetrieve<Record<string, any>>(null);

  Object.keys(storage)
      .forEach((key) => {
        if (Object.values(Paths)
            .includes(key as any)) {

          // Setting the hydration state for the current reducer to an empty object
          hydrationState[key] = {};

          const reducerArea = storage[key];

          Object.values(reducerArea)
              .forEach((payload: any & { _ttl?: number }) => {
                hydrationState[key] = {
                  ...hydrationState[key],
                  ...{
                    ...payload,
                    _ttl: undefined
                  }
                };
              });
        }
      });

  Object.keys(hydrationState)
      .forEach((key) => {
        store.dispatch({
          type: `${key}/HYDRATE`,
          payload: hydrationState[key]
        });
      });
};
