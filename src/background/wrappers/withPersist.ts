import { storageStore } from "../../persistence/chromeStorage";

/**
 * A wrapper for dispatching actions that will also persist the payload to chrome storage.
 * We can also set a ttl (time to live) for the payload.
 * @param actionResult
 * @param ttl
 */
export const withPersist = <T extends {
  type: string;
  payload: Record<string, any>;
}>(actionResult: T, ttl?: number) => async (dispatch: any, getState: any) => {
  try {
    const [path, action] = actionResult.type.split("/");
    await storageStore(
        path,
        {
          [action]: {
            ...actionResult.payload,
            _ttl: ttl ? Date.now() + ttl : undefined
          }
        }
    );
  } catch (e) {
    console.error(e);
  }
  dispatch(actionResult);
};
