import { Paths } from "../../redux/paths";
import { Store } from "webext-redux";
import { storageRemove } from "../../persistence/chromeStorage";

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

export const hydrateStore = <T extends {
  dispatch: (action: any) => void;
}>(store: T) => {
  const hydrationState: Record<string, any> = {};

  chrome.storage.local.get(null, (result) => {
    Object.keys(result)
        .forEach((key) => {
          if (Object.values(Paths)
              .includes(key as any)) {

            // Setting the hydration state for the current reducer to an empty object
            hydrationState[key] = {};

            const reducerArea = result[key];

            Object.values(reducerArea)
                .forEach((payload: any & { _ttl?: number }) => {
                  if (payload._ttl && payload._ttl < Date.now()) {
                    // If the payload has a ttl and the ttl has expired, we do not want to hydrate the state with this payload.
                    // We also want to remove the payload from storage.
                    // storageRemove(key)
                    // return;
                  }
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
  });
};
