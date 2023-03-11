import { InvokePayload } from "../common/models";
import { Store } from "webext-redux";
import { AnyAction } from "redux";
import { callInvoke } from "../redux/actions/invokerActions";

export const getInvoker = (store: Store<any, AnyAction>) => ({
  invoke: (payload: InvokePayload) => {
    store.dispatch(callInvoke(payload));
    return new Promise((resolve, reject) => {
      const unsubscribe = store.subscribe(() => {
        // we want to see changes to the state in `invoker/${payload.uri}`
        const state = store.getState();
        console.log(state);
        resolve(undefined);
      });
    });
  },
});

/**
 * Invoker is a wrapper around the webext-redux store that allows us to
 * invoke actions that are defined in the background script.
 * We can use this to do REST calls using the background script as a proxy.
 */
export interface Invoker {
  invoke: (payload: InvokePayload) => Promise<any>;
}
