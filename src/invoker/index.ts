import { InvokePayload, Invoker } from "../common/models";
import { Store } from "webext-redux";
import { AnyAction } from "redux";
import { callInvoke } from "../redux/actions/invokerActions";
import { selectInvokerResult } from "../redux/selectors/invokerSelector";

/**
 * Invoker is a wrapper around the webext-redux store that allows us to
 * invoke actions that are defined in the background script.
 * We can use this to do REST calls using the background script as a proxy.
 */
export const getInvoker = (store: Store<any, AnyAction>): Invoker => ({
  invoke: <T>(payload: InvokePayload): Promise<T> => {
    store.dispatch(callInvoke(payload));
    return new Promise((resolve, reject) => {
      const unsubscribe = store.subscribe(() => {
        const state = store.getState();
        const invokerResult = selectInvokerResult(state, payload.url);
        if (invokerResult) {
          unsubscribe();
          resolve(invokerResult);
        }
      });
    });
  },
});
